import { NextFunction, Request, Response } from "express";
import { UserRole } from "../interfaces/role.interface.js";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";

declare global {
    namespace Express {
        interface Request{
            user?: {
                id: string;
                email: string;
                name: string;
                role: string;
                emailVerified: boolean;
            }
        }
    }
}

export const authenticate = (...roles: UserRole[]) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        // get user session
        try{
            const session = await auth.api.getSession({
                headers: fromNodeHeaders(req.headers),
            });
            
            if(!session) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized!"
                });
            }

            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role,
                emailVerified: session.user.emailVerified
            }

            if(roles.length && !roles.includes(req.user.role as UserRole)){
                return res.status(403).json({
                    success: false,
                    message: "Forbiden! You don't have permission to access this resource"
                });
            }
            next();

        }catch(error){
            console.log("X Error: ", error);
        }
    }
}
