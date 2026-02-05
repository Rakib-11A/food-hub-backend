import { config } from './config/env.js';
import app from './app.js';
import { prisma } from './lib/prisma.js';

const startServer = async () => {
  try {
    // Initialize database
    await prisma.$connect();
    console.log("Prisma connected successfully.");
    const port = config.port;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    prisma.$disconnect();
    process.exit(1);
  }
};

startServer();