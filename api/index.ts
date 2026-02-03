/**
 * Vercel Serverless Function entry.
 * Build runs: npx prisma generate && npm run build → output is dist/src/app.js
 */
import type { IncomingMessage, ServerResponse } from "node:http";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  const { default: app } = await import("../dist/src/app.js");
  return app(req, res);
}
