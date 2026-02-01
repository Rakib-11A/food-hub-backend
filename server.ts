import app from './app';
import { config } from './src/config/env';
import { prisma } from './src/lib/prisma'

const startServer = async () => {
  try {
    // Initialize database
    await prisma.$connect();

    // Start server
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`🔗 API URL: http://localhost:${config.port}/api/`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    prisma.$disconnect();
    process.exit(1);
  }
};

startServer();