const { getAuthUser, respond, handleOptions, generateId } = require("./utils/auth");
const { db } = require("./utils/db");

const UPI_ID = process.env.UPI_ID || "mithilacrafts@upi";
const UPI_PAYEE_NAME = process.env.UPI_PAYEE_NAME || "Mithila Crafts";
const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || "919876543210";
const FREE_SHIPPING_THRESHOLD = 2000;
const SHIPPING_FEE = 150;

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return handleOptions();
  if (event.httpMethod !== "POST") return respond(405, { error: "Method not allowed" });

  try {
    const body = JSON.parse(event.body || "{}");
    const { items, paymentMethod, customer } = body;

    if (!Array.isArray(items) || items.length === 0) return respond(400, { error: "Your cart is empty" });
    if (!["cod", "upi"].includes(paymentMethod)) return respond(400, { error: "Please choose a valid payment method" });
    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return respond(400, { error: "Name, phone, and delivery address are required" });
    }

    // Recalculate totals server-side - never trust the client's total.
    const catalog = await db.sql`SELECT id, name, price, category, stock FROM products WHERE active = true`;

    let subtotal = 0;
    const verifiedItems = [];
    for (const item of items) {
      const product = catalog.find((p) => p.id === item.id);
      const price = product ? parseFloat(product.price) : item.price;
      const name = product ? product.name : item.name;
      const qty = Math.max(1, Math.min(10, parseInt(item.qty, 10) || 1));
      subtotal += price * qty;
      verifiedItems.push({ id: item.id, name, price, qty, category: item.category || (product && product.category) || "" });
    }

    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    const total = subtotal + shipping;

    const authUser = getAuthUser(event);
    const orderId = generateId("ORD").toUpperCase();
    const customerData = {
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      pincode: customer.pincode || "",
      email: customer.email || (authUser ? authUser.email : ""),
    };

    await db.sql`
      INSERT INTO orders (id, user_id, user_email, user_name, customer, items, subtotal, shipping, total, payment_method, payment_status, status, created_at)
      VALUES (
        ${orderId},
        ${authUser ? authUser.userId : null},
        ${authUser ? authUser.email : customer.email || ""},
        ${customer.name},
        ${JSON.stringify(customerData)},
        ${JSON.stringify(verifiedItems)},
        ${subtotal}, ${shipping}, ${total},
        ${paymentMethod},
        ${paymentMethod === "cod" ? "pay_on_delivery" : "awaiting_verification"},
        ${"pending"},
        NOW()
      )
    `;

    // Best-effort stock decrement - doesn't fail the order if it errors.
    try {
      for (const item of verifiedItems) {
        await db.sql`
          UPDATE products SET stock = GREATEST(0, stock - ${item.qty})
          WHERE id = ${item.id} AND stock > 0
        `;
      }
    } catch (stockErr) {
      console.error("Stock decrement skipped:", stockErr);
    }

    const orderForResponse = {
      id: orderId,
      userId: authUser ? authUser.userId : null,
      userEmail: authUser ? authUser.email : customer.email || "",
      userName: customer.name,
      customer: customerData,
      items: verifiedItems,
      subtotal,
      shipping,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pay_on_delivery" : "awaiting_verification",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const waMessage = encodeURIComponent(
      `Hi Mithila Crafts! I've placed order ${orderId} for ₹${total.toLocaleString("en-IN")}.` +
      (paymentMethod === "upi" ? " I have made the UPI payment - sharing my payment screenshot here." : " Please confirm and let me know the delivery timeline.")
    );

    const payment =
      paymentMethod === "upi"
        ? {
            upiId: UPI_ID,
            payeeName: UPI_PAYEE_NAME,
            amount: total,
            upiDeepLink: `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_PAYEE_NAME)}&am=${total}&cu=INR&tn=${encodeURIComponent(orderId)}`,
            qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(`upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_PAYEE_NAME)}&am=${total}&cu=INR&tn=${orderId}`)}`,
            whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`,
            instructions: "Scan the QR code or pay to the UPI ID above using any UPI app (GPay, PhonePe, Paytm), then tap the WhatsApp button and send your payment screenshot so we can confirm your order.",
          }
        : {
            whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`,
            instructions: "Pay in cash when your order is delivered. We'll contact you on the phone number you provided to confirm delivery details.",
          };

    return respond(201, { success: true, order: orderForResponse, payment });
  } catch (err) {
    console.error("Submit order error:", err);
    return respond(500, { error: "Could not place your order. Please try again." });
  }
};
