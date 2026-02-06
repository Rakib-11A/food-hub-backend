import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { config } from "../config/env.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: config.appUser,
    pass: config.appPass,
  },
});

const trustedOrigins: string[] = config.appUrl
  ? config.appUrl.split(",").map((o) => o.trim()).filter(Boolean)
  : ["http://localhost:3000"];
// Allow all Vercel deployments (production + preview)
if (!trustedOrigins.some((o) => o.includes("vercel.app"))) {
  trustedOrigins.push("https://*.vercel.app");
}
if (!trustedOrigins.includes("http://localhost:3000")) {
  trustedOrigins.push("http://localhost:3000");
}

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins,
    advanced: {
        // Required for cross-origin: frontend (Vercel) and backend (Render) on different domains.
        // Browser only sends cookies on cross-site requests when SameSite=None and Secure.
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: true,
                defaultValue: "CUSTOMER",
                input: true,
            },
            status: {
                type: "string",
                required: true,
                defaultValue: "ACTIVE",
                input: true,
            },
        },
    },
    emailAndPassword: { 
        enabled: true, 
        autoSignIn: true,
        requireEmailVerification: false,
    },
    emailVerification: {
        sendOnSignUp: false,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({user, url, token}, request) => {
            console.log("Sending verification email to:", user.email);
            const verificationUrl = `${config.appUrl}/verify-email?token=${token}`;

            const htmlTemplate = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verify Your Email</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9f9f9; color: #333;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="padding: 40px 0;">
                            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                                <tr>
                                    <td align="center" style="padding: 40px 40px 20px 40px;">
                                        <h1 style="margin: 0; color: #ff4757; font-size: 28px; letter-spacing: -1px;">Food Hub</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 40px 30px 40px; text-align: center;">
                                        <h2 style="margin: 0 0 20px 0; color: #2f3542; font-size: 22px;">Verify your email address</h2>
                                        <p style="margin: 0 0 30px 0; color: #57606f; line-height: 1.6; font-size: 16px;">
                                            Thanks for signing up for Food Hub! We're excited to have you. Please click the button below to verify your email and start exploring.
                                        </p>
                                        
                                        <a href="${verificationUrl}" style="background-color: #ff4757; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
                                            Verify Email Address
                                        </a>
                                        
                                        <p style="margin: 30px 0 0 0; color: #a4b0be; font-size: 14px; line-height: 1.6;">
                                            If the button above doesn't work, copy and paste this link into your browser: <br>
                                            <a href="${verificationUrl}" style="color: #54a0ff; word-break: break-all;">${verificationUrl}</a>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 30px 40px; background-color: #f1f2f6; text-align: center; color: #747d8c; font-size: 12px;">
                                        <p style="margin: 0 0 10px 0;">&copy; 2026 Food Hub. All rights reserved.</p>
                                        <p style="margin: 0;">You received this email because you signed up for a Food Hub account.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            `;
            (async () => {
                try {
                    const info = await transporter.sendMail({
                        from: '"Food Hub 🍔" <rakibhasancsepust@gmail.com>',
                        to: user.email,
                        subject: "Verify your Food Hub account ✔",
                        text: `Please verify your email by visiting: ${verificationUrl}`,
                        html: htmlTemplate,
                    });
                    console.log("Verification email sent:", info.messageId);
                } catch (error) {
                    console.error("Failed to send email:", error);
                    // On Render/hosted envs SMTP is often blocked. Log the link so it can be shared manually.
                    console.log(
                        `[VERIFICATION] Email send failed. Manual link for ${user.email}: ${verificationUrl}`
                    );
                }
            })();
        },
    },
    baseURL: config.betterAuthUrl,
    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: config.googleClientId as string,
            clientSecret: config.googleClientSecret as string,
        }
    }
});