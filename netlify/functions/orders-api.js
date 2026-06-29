const { requireAuth, respond, handleOptions } = require("./utils/auth");
const { db } = require("./utils/db");

function mapOrder(row) {
  return {
    id: row.id,
    userId: row.user_id,
    userEmail: row.user_email,
    userName: row.user_name,
    customer: row.customer,
    items: row.items,
    subtotal: parseFloat(row.subtotal),
    shipping: parseFloat(row.shipping),
    total: parseFloat(row.total),
    paymentMethod: row.payment_method,
    paymentStatus: row.payment_status,
    status: row.status,
    createdAt: row.created_at,
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return handleOptions();
  if (event.httpMethod !== "GET") return respond(405, { error: "Method not allowed" });

  const { user, error } = requireAuth(event);
  if (error) return error;

  try {
    const rows = await db.sql`SELECT * FROM orders WHERE user_id = ${user.userId} ORDER BY created_at DESC`;
    return respond(200, { orders: rows.map(mapOrder) });
  } catch (err) {
    console.error("Orders API error:", err);
    return respond(500, { error: "Could not load your orders" });
  }
};
