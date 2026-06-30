const { hashPassword, createToken, respond, handleOptions, generateId } = require("./utils/auth");
const { db } = require("./utils/db");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return handleOptions();
  if (event.httpMethod !== "POST") return respond(405, { error: "Method not allowed" });

  try {
    const { name, email, password, phone } = JSON.parse(event.body || "{}");

    if (!name || !email || !password) return respond(400, { error: "Name, email, and password are required" });
    if (password.length < 6) return respond(400, { error: "Password must be at least 6 characters" });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return respond(400, { error: "Please enter a valid email address" });

    const normalEmail = email.toLowerCase().trim();

    const existing = await db.sql`SELECT id FROM users WHERE email = ${normalEmail}`;
    if (existing.length) return respond(409, { error: "An account with this email already exists" });

    const [countRow] = await db.sql`SELECT COUNT(*) AS cnt FROM users`;
    const role = "customer";

    const userId = generateId("user");

    await db.sql`
      INSERT INTO users (id, name, email, phone, password, role, address, created_at)
      VALUES (${userId}, ${name}, ${normalEmail}, ${phone || ""}, ${hashPassword(password)}, ${role}, ${""},  NOW())
    `;

    const token = createToken({ userId, email: normalEmail, role, name });
    return respond(201, {
      success: true,
      token,
      user: { id: userId, name, email: normalEmail, phone: phone || "", role, address: "" },
    });
  } catch (err) {
    console.error("Register error:", err);
    return respond(500, { error: "Registration failed. Please try again." });
  }
};
