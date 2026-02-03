import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import { config } from './config/env';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { notFound } from './middlewares/notFount.middleware';
import { authenticate } from './middlewares/auth.middleware';

const app: Application = express();

// Middlewares: allow one or more origins (comma-separated APP_URL for production + Vercel previews)
const allowedOrigins = config.appUrl
  ? config.appUrl.split(",").map((o) => o.trim()).filter(Boolean)
  : ["http://localhost:3000"];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.some((o) => origin?.endsWith(".vercel.app")))
      cb(null, true);
    else cb(null, false);
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/auth/me', authenticate(), (req: Request, res: Response) => {
  res.status(200).json({ user: req.user})
});
app.all('/api/auth/*splat', toNodeHandler(auth));

// API routes 
app.use('/api',routes);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '🚀 Alhamdulillah... Food Hub API is work fine.',
  });
});

app.use(errorHandler);
app.use(notFound);

export default app;
