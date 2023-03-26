import { User } from "../entities/user";
import { Token } from "../entities/token";
import { sendMail } from "../utils/mailer";
import { Response } from "../types/user.types";
import { TokenExpiredError, decode, JwtPayload } from "jsonwebtoken";

export class PasswordResetService {
    private isResetTokenExpired = async (token: string): Promise<boolean> => {
        try {
            const decoded = decode(token) as JwtPayload;
            const now = Date.now() / 1000;
            return decoded.exp > now;
        } catch (error) {
            console.error("Error decoding token", error);
            return false;
        }
    };

    private sendResetEmail = async (
        user: User,
        resetToken: Token
    ): Promise<void> => {
        try {
            const heading = `<p style="font-size: 18px; text-align: left">Hi ${
                user.first_name || user.business_name
            },</p><p style="font-size: 18px; text-align: center">You recently requested to reset your password. Please click the link below to reset your password.</p>`;
            const subject = `Reset Your Storefront Account Password`;
            const message = `${process.env.BASE_URL}/${process.env.RESET_PATH}/${resetToken.activation_code}`;

            await sendMail(user.email, subject, message, heading);
        } catch (error) {
            throw new Error(`Error sending email: ${error.message}`);
        }
    };

    public resetMail = async (email: string): Promise<Response> => {
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return {
                    status: 404,
                    message: "User does not exist, please signup",
                };
            }

            if (!user.activated) {
                return {
                    status: 401,
                    message:
                        "Please activate your account before you can reset your password.",
                };
            }

            const userToken = await Token.findOne({
                where: { user_id: user.id },
            });

            if (
                userToken &&
                (await this.isResetTokenExpired(userToken.token))
            ) {
                return {
                    status: 403,
                    message:
                        "Please check your email. You have a pending password reset process.",
                };
            }

            if (userToken) {
                await Token.remove(userToken);
            }

            const token = await user.generateAuthToken();
            const activationCode = require("crypto")
                .randomBytes(32)
                .toString("hex");

            const resetToken = Token.create({
                user_id: user.id,
                activation_code: activationCode,
                token,
            });

            await resetToken.save();

            await this.sendResetEmail(user, resetToken);

            return {
                status: 202,
                message: `Password reset link successfully sent to ${user.email}`,
            };
        } catch (error) {
            console.error("Error sending password reset email", error);
            return {
                status: 500,
                message:
                    "An error occurred while mailing you a reset link. Please try again later.",
            };
        }
    };

    public resetPassword = async (
        newPassword: string,
        token: string
    ): Promise<Response> => {
        try {
            const resetToken = await Token.findOne({
                where: { activation_code: token },
            });

            if (!resetToken) {
                return {
                    status: 404,
                    message:
                        "Invalid or expired token. Please request a new password reset link.",
                };
            }

            const user = await User.findOne({
                where: { id: resetToken.user_id },
            });

            try {
                await user.verifyAuthToken(resetToken.token);
            } catch (err) {
                if (err instanceof TokenExpiredError) {
                    await Token.remove(resetToken);
                    return {
                        status: 400,
                        message: `Expired token, try again`,
                    };
                }
            }
            const isPreviousPassword = await user.comparePassword(newPassword);
            if (isPreviousPassword) {
                return {
                    status: 400,
                    message:
                        "Sorry, you cannot use your previous password. Please choose a new password. that has not been used before.",
                };
            }
            user.password = await user.hashPassword(newPassword);
            await user.save();

            await Token.remove(resetToken);

            return {
                status: 200,
                message: `Your password has been successfully reset. You can now log in with your new password.`,
            };
        } catch (error) {
            console.error(error);
            return {
                status: 500,
                message:
                    "An error occurred while resetting your password. Please try again later.",
            };
        }
    };
}
