/* ============================================
   Mithila Crafts - Shared backend utilities
   Used by every Netlify Function: password
   hashing, JWT issuing/verification, and
   consistent JSON + CORS responses.
   ============================================ */

const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// JWT_SECRET MUST be set as a Netlify environment variable in production.
// A fallback is provided only so the app doesn't hard-crash in local dev;
// never rely on the fallback in a real deployment.
const JWT_SECRET = process.env.JWT_SECRET || "dev-only-insecure-secret-change-me";
const TOKEN_EXPIRY = "30d";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

/** Standard JSON response helper with CORS headers attached. */
function respond(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    body: JSON.stringify(body),
  };
}

/** Handles CORS preflight requests. */
function handleOptions() {
  return { statusCode: 204, headers: CORS_HEADERS, body: "" };
}

/* ---------- Password hashing (no external native deps needed) ---------- */
// Uses Node's built-in scrypt instead of bcryptjs to avoid native-binding
// issues in the Netlify Functions build environment. Format stored:
//   scrypt$<saltHex>$<hashHex>
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

function comparePassword(password, stored) {
  try {
    const [scheme, salt, hash] = String(stored).split("$");
    if (scheme !== "scrypt" || !salt || !hash) return false;
    const candidate = crypto.scryptSync(String(password), salt, 64).toString("hex");
    const a = Buffer.from(candidate, "hex");
    const b = Buffer.from(hash, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/* ---------- JWT ---------- */
function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/** Pulls the bearer token off an event's Authorization header and verifies it. */
function getAuthUser(event) {
  const header = event.headers.authorization || event.headers.Authorization;
  if (!header || !header.startsWith("Bearer ")) return null;
  const token = header.slice("Bearer ".length).trim();
  return verifyToken(token);
}

/** Throws-as-response helper: returns a 401 response object, or null if authorized. */
function requireAuth(event) {
  const user = getAuthUser(event);
  if (!user) return { error: respond(401, { error: "Authentication required" }) };
  return { user };
}

/** Same as requireAuth but also enforces role === 'admin'. */
function requireAdmin(event) {
  const { user, error } = requireAuth(event);
  if (error) return { error };
  if (user.role !== "admin") {
    return { error: respond(403, { error: "Admin access required" }) };
  }
  return { user };
}

function emailKey(email) {
  return String(email).toLowerCase().trim().replace(/[^a-z0-9]/g, "_");
}

function generateId(prefix) {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
  getAuthUser,
  requireAuth,
  requireAdmin,
  respond,
  handleOptions,
  emailKey,
  generateId,
  CORS_HEADERS,
};
