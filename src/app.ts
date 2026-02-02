import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import { config } from './config/env';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { notFound } from './middlewares/notFount.middleware';

const app: Application = express();

// Middlewares
app.use(cors({
  origin: config.appUrl || "http://localhost:3000",
  credentials: true
}));

app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes 
app.use(routes);

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
