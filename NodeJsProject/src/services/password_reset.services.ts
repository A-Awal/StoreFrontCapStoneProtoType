
import { User } from "../entities/user";
import { Token } from "../entities/token";
import { sendMail } from "../utils/mailer";
import jwt from 'jsonwebtoken';

export class PasswordResetService {
  async sendResetEmail(email: string) {
    try {
      const user: User = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("User not found");
      }
      const token = await user.generateAuthToken();

      const heading = `Hi ${user.first_name},\n\n You recently requested to reset your password. Please click the link below to reset your password`;
      const subject = `Reset Your Password`
      const message = `anything/api/${user.role}/reset_password/${user.id}/${token}`;
      sendMail(user.email, subject, message, heading);
    } catch (error) {
      console.log(error);
    }

    // TODO: Send the password reset email to the user with a link that includes the reset token
  }

  async resetPassword( newPassword: string, id: number,) {
    const user = await User.findOne({where: {id}});
    user.password = await user.hashPassword(newPassword);
    await user.save();

  }
}
