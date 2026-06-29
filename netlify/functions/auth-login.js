const { comparePassword, createToken, respond, handleOptions } = require("./utils/auth");
const { db } = require("./utils/db");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return handleOptions();
  if (event.httpMethod !== "POST") return respond(405, { error: "Method not allowed" });

  try {
    const { email, password } = JSON.parse(event.body);

    if (!email || !password) {
      return respond(400, { error: "Email and password are required" });
    }

    const rows = await db.sql`SELECT * FROM users WHERE email = ${email.toLowerCase().trim()}`;
    if (!rows.length) return respond(401, { error: "Invalid email or password" });

    const user = rows[0];
    if (!comparePassword(password, user.password)) {
      return respond(401, { error: "Invalid email or password" });
    }

    const token = createToken({ userId: user.id, email: user.email, role: user.role, name: user.name });

    return respond(200, {
      success: true,
      token,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, address: user.address },
    });
  } catch (err) {
    console.error("Login error:", err);
    return respond(500, { error: "Login failed. Please try again." });
  }
};
