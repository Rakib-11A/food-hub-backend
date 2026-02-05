import { config } from './config/env';
import app from './app';
import { prisma } from './lib/prisma';

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