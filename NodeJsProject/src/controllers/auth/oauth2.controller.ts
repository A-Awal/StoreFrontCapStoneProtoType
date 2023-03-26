import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { User } from "../../entities/user";
import { generateAuthToken } from "../../utils/jwt";

const BASE_REDIRECT_URL = process.env.BASE_URL;

const oauthRedirect = async (
    req: Request,
    res: Response,
    next: NextFunction,
    strategyName: string
) => {
    try {
        passport.authenticate(
            strategyName,
            { session: false },
            async (err: any, user: User, info: { message: any }) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    const message = encodeURIComponent(info.message);
                    return res
                        .status(403)
                        .redirect(
                            `${BASE_REDIRECT_URL}/login?message=${message}`
                        );
                }

                const token = await generateAuthToken({
                    id: user.id,
                });

                return res.redirect(
                    `${BASE_REDIRECT_URL}/dashboard?token=Bearer ${token}`
                );
            }
        )(req, res, next);
    } catch (err) {
        next(err);
    }
};

export const facebookRedirect = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await oauthRedirect(req, res, next, "facebook");
};

export const googleRedirect = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await oauthRedirect(req, res, next, "google");
};
