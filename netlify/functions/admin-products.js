const { requireAdmin, respond, handleOptions } = require("./utils/auth");
const { db } = require("./utils/db");

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
      const rows = await db.sql`SELECT * FROM products ORDER BY id`;
      return respond(200, { products: rows.map(mapProduct) });
    }

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      if (!body.name || !body.category || !body.price) {
        return respond(400, { error: "name, category, and price are required" });
      }
      const [maxRow] = await db.sql`SELECT COALESCE(MAX(id), 0) AS max_id FROM products`;
      const nextId = maxRow.max_id + 1;

      const [row] = await db.sql`
        INSERT INTO products (id, name, category, price, original_price, stock, badge, description, image, details, active, created_at)
        VALUES (
          ${nextId}, ${body.name}, ${body.category}, ${Number(body.price)},
          ${body.originalPrice ? Number(body.originalPrice) : null},
          ${Number.isFinite(Number(body.stock)) ? Number(body.stock) : 0},
          ${body.badge || null}, ${body.description || ""}, ${body.image || "default"},
          ${JSON.stringify(body.details || {})}, true, NOW()
        ) RETURNING *
      `;
      return respond(201, { success: true, product: mapProduct(row) });
    }

    if (event.httpMethod === "PUT") {
      const body = JSON.parse(event.body || "{}");
      if (!body.id) return respond(400, { error: "id is required" });

      const existing = await db.sql`SELECT * FROM products WHERE id = ${Number(body.id)}`;
      if (!existing.length) return respond(404, { error: "Product not found" });
      const p = existing[0];

      const name = body.name !== undefined ? body.name : p.name;
      const category = body.category !== undefined ? body.category : p.category;
      const price = body.price !== undefined ? Number(body.price) : parseFloat(p.price);
      const originalPrice = body.originalPrice !== undefined ? (body.originalPrice ? Number(body.originalPrice) : null) : p.original_price;
      const stock = body.stock !== undefined ? Number(body.stock) : p.stock;
      const badge = body.badge !== undefined ? (body.badge || null) : p.badge;
      const description = body.description !== undefined ? body.description : p.description;
      const image = body.image !== undefined ? body.image : p.image;
      const details = body.details !== undefined ? JSON.stringify(body.details) : JSON.stringify(p.details);
      const active = body.active !== undefined ? body.active : p.active;

      const [row] = await db.sql`
        UPDATE products SET
          name = ${name}, category = ${category}, price = ${price}, original_price = ${originalPrice},
          stock = ${stock}, badge = ${badge}, description = ${description}, image = ${image},
          details = ${details}, active = ${active}, updated_at = NOW()
        WHERE id = ${Number(body.id)} RETURNING *
      `;
      return respond(200, { success: true, product: mapProduct(row) });
    }

    if (event.httpMethod === "DELETE") {
      const body = JSON.parse(event.body || "{}");
      if (!body.id) return respond(400, { error: "id is required" });

      const existing = await db.sql`SELECT id FROM products WHERE id = ${Number(body.id)}`;
      if (!existing.length) return respond(404, { error: "Product not found" });

      await db.sql`UPDATE products SET active = false, updated_at = NOW() WHERE id = ${Number(body.id)}`;
      return respond(200, { success: true });
    }

    return respond(405, { error: "Method not allowed" });
  } catch (err) {
    console.error("Admin products error:", err);
    return respond(500, { error: "Could not process product request" });
  }
};
