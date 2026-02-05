import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
export const authenticate = (...roles) => {
    return async (req, res, next) => {
        // get user session
        try {
            const session = await auth.api.getSession({
                headers: fromNodeHeaders(req.headers),
            });
            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authofized!"
                });
            }
            if (!session.user.emailVerified) {
                return res.status(403).json({
                    success: false,
                    message: "Email verification required!"
                });
            }
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role,
                emailVerified: session.user.emailVerified
            };
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbiden! You don't have permission to access this resource"
                });
            }
            next();
        }
        catch (error) {
            console.log("X Error: ", error);
        }
    };
};
//# sourceMappingURL=auth.middleware.js.map