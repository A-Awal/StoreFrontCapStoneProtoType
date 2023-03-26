import { sign } from "jsonwebtoken";

export const generateAuthToken = async (
    tokenBody: Record<string, unknown>,
    rememberMe?: boolean
) : Promise<string> => {
    try {
        const expiresIn = rememberMe
            ? process.env.SESSION_REMEMBER_ME
            : process.env.SESSION_EXPIRES_IN;

        return sign(tokenBody, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: expiresIn,
        });
    } catch (error) {
        console.error(error);
        throw new Error("Failed to generate auth token");
    }
};
