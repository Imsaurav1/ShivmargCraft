const { respond, handleOptions } = require("./utils/auth");
const { db } = require("./utils/db");
const { PRODUCTS: STARTER_PRODUCTS } = require("../../js/products.js");

function mapProduct(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: parseFloat(row.price),
    originalPrice: row.original_price ? parseFloat(row.original_price) : null,
    stock: row.stock,
    badge: row.badge,
    description: row.description,
    image: row.image,
    details: row.details,
    active: row.active,
  };
}

async function seedProducts() {
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
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return handleOptions();
  if (event.httpMethod !== "GET") return respond(405, { error: "Method not allowed" });

  try {
    const [countRow] = await db.sql`SELECT COUNT(*) AS cnt FROM products`;
    if (parseInt(countRow.cnt, 10) === 0) await seedProducts();

    const rows = await db.sql`SELECT * FROM products WHERE active = true ORDER BY id`;
    return respond(200, { products: rows.map(mapProduct) });
  } catch (err) {
    console.error("Products API error:", err);
    return respond(200, { products: STARTER_PRODUCTS, fallback: true });
  }
};
