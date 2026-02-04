import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = process.env.DATABASE_URL ?? "";
const useNeonWebSocket = process.env.NEON_USE_WEBSOCKET === "true";

// Use Neon when DATABASE_URL points to Neon
const isNeon = connectionString.includes("neon.tech");

let adapter;
if (isNeon) {
  const neonAdapter = await import("@prisma/adapter-neon");
  // Default: HTTP driver (works when WebSocket is blocked). Set NEON_USE_WEBSOCKET=true to use WebSocket.
  if (useNeonWebSocket) {
    const { neonConfig } = await import("@neondatabase/serverless");
    const ws = (await import("ws")).default;
    neonConfig.webSocketConstructor = ws;
    adapter = new neonAdapter.PrismaNeon({ connectionString });
  } else {
    adapter = new neonAdapter.PrismaNeonHttp(connectionString, { fullResults: true });
  }
} else {
  const { PrismaPg } = await import("@prisma/adapter-pg");
  adapter = new PrismaPg({ connectionString });
}

const prisma = new PrismaClient({ adapter });

export { prisma };
