/**
 * Vercel Serverless Function entry.
 * Build: npx prisma generate && npm run build → dist/src/app.js
 */
import path from "node:path";
import { pathToFileURL } from "node:url";
import type { IncomingMessage, ServerResponse } from "node:http";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  try {
    // Resolve app from project root (process.cwd() on Vercel is the project root)
    const appPath = path.join(process.cwd(), "dist", "src", "app.js");
    const { default: app } = await import(pathToFileURL(appPath).href);
    app(req, res);
  } catch (err) {
    console.error("[api] handler error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: "Internal Server Error",
        message:
          process.env.NODE_ENV === "development"
            ? err instanceof Error
              ? err.message
              : String(err)
            : undefined,
      })
    );
  }
}
