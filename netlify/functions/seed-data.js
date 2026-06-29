const { requireAdmin, respond, handleOptions } = require("./utils/auth");
const { db } = require("./utils/db");
const { PRODUCTS: STARTER_PRODUCTS } = require("../../js/products.js");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return handleOptions();
  if (event.httpMethod !== "POST") return respond(405, { error: "Method not allowed" });

  const { error } = requireAdmin(event);
  if (error) return error;

  try {
    const { action } = JSON.parse(event.body || "{}");
    if (action !== "seed-products") return respond(400, { error: "Unknown seed action" });

    const [beforeRow] = await db.sql`SELECT COUNT(*) AS cnt FROM products`;
    const beforeCount = parseInt(beforeRow.cnt, 10);

    for (const p of STARTER_PRODUCTS) {
      await db.sql`
        INSERT INTO products (id, name, category, price, original_price, stock, badge, description, image, details, active, created_at)
        VALUES (
          ${p.id}, ${p.name}, ${p.category}, ${p.price}, ${p.originalPrice || null}, ${25},
          ${p.badge || null}, ${p.description || ""}, ${p.image || "default"},
          ${JSON.stringify(p.details || {})}, ${true}, NOW()
        ) ON CONFLICT (id) DO NOTHING
      `;
    }

    const [totalRow] = await db.sql`SELECT COUNT(*) AS cnt FROM products`;
    const added = parseInt(totalRow.cnt, 10) - beforeCount;
    return respond(200, { success: true, added, total: parseInt(totalRow.cnt, 10) });
  } catch (err) {
    console.error("Seed error:", err);
    return respond(500, { error: "Seeding failed" });
  }
};
