import express from 'express';
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth.js';
import { config } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { notFound } from './middlewares/notFount.middleware.js';
import { authenticate } from './middlewares/auth.middleware.js';
const app = express();
const allowedOrigins = config.appUrl
    ? config.appUrl.split(",").map((o) => o.trim()).filter(Boolean)
    : ["http://localhost:3000"];
app.use(cors({
    origin: (origin, cb) => {
        if (!origin || allowedOrigins.includes(origin))
            cb(null, true);
        else if (origin?.endsWith(".vercel.app") || origin?.endsWith(".onrender.com"))
            cb(null, true);
        else
            cb(null, false);
    },
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/api/auth/me', authenticate(), (req, res) => {
    res.status(200).json({ user: req.user });
});
app.all('/api/auth/*splat', toNodeHandler(auth));
// API routes 
app.use('/api', routes);
// Health check
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: '🚀 Alhamdulillah... Food Hub API is work fine.',
    });
});
app.use(errorHandler);
app.use(notFound);
export default app;
//# sourceMappingURL=app.js.map