const { requireAuth, hashPassword, respond, handleOptions } = require("./utils/auth");
const { db } = require("./utils/db");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return handleOptions();

  const { user: authUser, error } = requireAuth(event);
  if (error) return error;

  try {
    const rows = await db.sql`SELECT * FROM users WHERE email = ${authUser.email}`;
    if (!rows.length) return respond(404, { error: "User not found" });
    const record = rows[0];

    if (event.httpMethod === "GET") {
      const { password, ...safeUser } = record;
      return respond(200, { user: safeUser });
    }

    if (event.httpMethod === "PUT") {
      const updates = JSON.parse(event.body || "{}");

      const name = typeof updates.name === "string" && updates.name.trim() ? updates.name.trim() : record.name;
      const phone = typeof updates.phone === "string" ? updates.phone : record.phone;
      const address = typeof updates.address === "string" ? updates.address : record.address;
      let pw = record.password;

      if (typeof updates.password === "string" && updates.password) {
        if (updates.password.length < 6) return respond(400, { error: "Password must be at least 6 characters" });
        pw = hashPassword(updates.password);
      }

      const [updated] = await db.sql`
        UPDATE users SET name = ${name}, phone = ${phone}, address = ${address}, password = ${pw}, updated_at = NOW()
        WHERE email = ${authUser.email} RETURNING *
      `;
      const { password, ...safeUser } = updated;
      return respond(200, { success: true, user: safeUser });
    }

    return respond(405, { error: "Method not allowed" });
  } catch (err) {
    console.error("Profile error:", err);
    return respond(500, { error: "Could not process profile request" });
  }
};
