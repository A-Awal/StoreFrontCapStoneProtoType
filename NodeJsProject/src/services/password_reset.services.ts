import { User } from "../entities/user";
import { Token } from "../entities/token";
import { sendMail } from "../utils/mailer";
import { TokenExpiredError } from "jsonwebtoken";

export class PasswordResetService {
  async sendResetEmail(email: string) {
    try {
      const user: User = await User.findOne({ where: { email } });
      if (!user) {
        return {
          status: 401,
          message: "User does not exist, please register",
        };
      }
      const token = await user.generateAuthToken();
      const activationCode: string = require("crypto")
        .randomBytes(32)
        .toString("hex");

      const resetToken = Token.create({
        user_id: user.id,
        activation_code: activationCode,
        token,
      });
      await resetToken.save();

      const heading = `<p style="font-size: 18px; text-align: left">Hi ${
        user.first_name || user.business_name
      },</p><p style="font-size: 18px; text-align: center">You recently requested to reset your password. Please click the link below to reset your password.</p>`;
      const subject = `Reset Your Storefront Account Password`;
      const message = `${process.env.BASE_URL}/${process.env.RESET_PATH}/${resetToken.activation_code}`;
      sendMail(user.email, subject, message, heading);

      return {
        status: 201,
        message: `Password reset link successfully sent to ${user.email}`,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message:
          "An error occurred while mailing you a reset link. Please try again later.",
      };
    }
  }

  async resetPassword(newPassword: string, token: string) {
    try {
      const resetToken: Token | null = await Token.findOne({
        where: {
          activation_code: token,
        },
      });
      if (!resetToken) {
        return {
          status: 400,
          message:
            "Invalid or expired token. Please request a new password reset link.",
        };
      }
      const user = await User.findOne({
        where: {
          id: resetToken.user_id,
        },
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
      console.log(isPreviousPassword);
      if (isPreviousPassword) {
        return {
          status: 400,
          message:
            "Sorry, you cannot use your previous password. Please choose a new password that has not been used before.",
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
  }
}
