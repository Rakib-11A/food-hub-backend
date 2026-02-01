import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import { config } from './config/env';
const app: Application = express();

// Middlewares
app.use(cors({
  origin: config.appUrl || "http://localhost:3000",
  credentials: true
}));
// Better Auth must be mounted before express.json() — see better-auth Express docs
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Health check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '🚀 Alhamdulillah... Food Hub API is work fine.',
  });
});


export default app;