const { requireAuth, respond, handleOptions } = require("./utils/auth");
const { db } = require("./utils/db");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return handleOptions();

  const { user, error } = requireAuth(event);
  if (error) return error;

  try {
    if (event.httpMethod === "GET") {
      const rows = await db.sql`SELECT items FROM carts WHERE user_id = ${user.userId}`;
      return respond(200, { items: rows.length ? rows[0].items : [] });
    }

    if (event.httpMethod === "POST") {
      const { items } = JSON.parse(event.body || "{}");
      if (!Array.isArray(items)) return respond(400, { error: "items must be an array" });

      await db.sql`
        INSERT INTO carts (user_id, items, updated_at) VALUES (${user.userId}, ${JSON.stringify(items)}, NOW())
        ON CONFLICT (user_id) DO UPDATE SET items = EXCLUDED.items, updated_at = NOW()
      `;
      return respond(200, { success: true, items });
    }

    return respond(405, { error: "Method not allowed" });
  } catch (err) {
    console.error("Cart API error:", err);
    return respond(500, { error: "Could not process cart request" });
  }
};
