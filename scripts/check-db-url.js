/**
 * Run from project root: node scripts/check-db-url.js
 * Verifies DATABASE_URL is loaded and shows host (no password).
 */
import "dotenv/config";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("❌ DATABASE_URL is not set or .env not loaded. Run from project root.");
  process.exit(1);
}
try {
  const u = new URL(url);
  const user = u.username;
  const host = u.hostname;
  const hasPassword = u.password && u.password.length > 0;
  console.log("✅ DATABASE_URL is set");
  console.log("   Host:", host);
  console.log("   User:", user);
  console.log("   Password length:", hasPassword ? u.password.length : 0);
  if (!hasPassword) console.log("   ⚠️  Password is empty – check your .env");
} catch (e) {
  console.error("❌ Invalid DATABASE_URL:", e.message);
  process.exit(1);
}
