import app from './app';
import { config } from './config/env';
import { prisma } from './lib/prisma';

const startServer = async () => {
  try {
    // Initialize database
    await prisma.$connect();

    // Start server
    if(config.nodeEnv !== 'production') {
      app.listen(config.port, () => {
        console.log(`🚀 Server running on port ${config.port}`);
        console.log(`🔗 API URL: http://localhost:${config.port}`);
      });
    }

  } catch (error) {
    console.error('Failed to start server:', error);
    prisma.$disconnect();
    process.exit(1);
  }
};

startServer();