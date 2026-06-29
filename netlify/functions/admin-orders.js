const { requireAdmin, respond, handleOptions } = require("./utils/auth");
const { db } = require("./utils/db");

const VALID_STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
const VALID_PAYMENT_STATUSES = ["awaiting_verification", "paid", "pay_on_delivery", "refunded", "unpaid"];

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
    updatedAt: row.updated_at,
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return handleOptions();

  const { error } = requireAdmin(event);
  if (error) return error;

  try {
    if (event.httpMethod === "GET") {
      const rows = await db.sql`SELECT * FROM orders ORDER BY created_at DESC`;
      return respond(200, { orders: rows.map(mapOrder) });
    }

    if (event.httpMethod === "PUT") {
      const { orderId, status, paymentStatus } = JSON.parse(event.body || "{}");
      if (!orderId) return respond(400, { error: "orderId is required" });

      const existing = await db.sql`SELECT id, status, payment_status FROM orders WHERE id = ${orderId}`;
      if (!existing.length) return respond(404, { error: "Order not found" });

      if (status && !VALID_STATUSES.includes(status)) return respond(400, { error: "Invalid status" });
      if (paymentStatus && !VALID_PAYMENT_STATUSES.includes(paymentStatus)) return respond(400, { error: "Invalid payment status" });

      const newStatus = status || existing[0].status;
      const newPaymentStatus = paymentStatus || existing[0].payment_status;

      const [row] = await db.sql`
        UPDATE orders SET status = ${newStatus}, payment_status = ${newPaymentStatus}, updated_at = NOW()
        WHERE id = ${orderId} RETURNING *
      `;
      return respond(200, { success: true, order: mapOrder(row) });
    }

    return respond(405, { error: "Method not allowed" });
  } catch (err) {
    console.error("Admin orders error:", err);
    return respond(500, { error: "Could not process order request" });
  }
};
