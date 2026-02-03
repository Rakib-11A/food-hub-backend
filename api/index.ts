/**
 * Vercel Serverless Function entry.
 * All requests are rewritten to this handler; it forwards to the Express app.
 * Build must run first: npx prisma generate && npm run build (so dist/ exists).
 */
import type { IncomingMessage, ServerResponse } from "node:http";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  // dist/app.js is produced by "npm run build" during Vercel deploy
  // @ts-expect-error - runtime path, not present before build
  const { default: app } = await import("../dist/app.js");
  return app(req, res);
}
