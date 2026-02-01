import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL as string,
  appUrl: process.env.APP_URL as string,
  appUser: process.env.APP_USER as string,
  appPass: process.env.APP_PASS as string,
  betterAuthUrl: process.env.BETTER_AUTH_URL as string,
  betterAuthSecret: process.env.BETTER_AUTH_SECRET as string,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  googleClientId: process.env.GOOGLE_CLIENT_ID as string,
};