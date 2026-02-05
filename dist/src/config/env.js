import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), '.env') });
export const config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV,
    databaseUrl: process.env.DATABASE_URL,
    appUrl: process.env.APP_URL,
    appUser: process.env.APP_USER,
    appPass: process.env.APP_PASS,
    betterAuthUrl: process.env.BETTER_AUTH_URL,
    betterAuthSecret: process.env.BETTER_AUTH_SECRET,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
};
//# sourceMappingURL=env.js.map