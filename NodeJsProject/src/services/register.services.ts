import bcrypt from "bcrypt";
import { TokenExpiredError } from "jsonwebtoken";
import { User, UserType } from "../entities/user";
import { sendMail } from "../utils/mailer";
import { Token } from "../entities/token";
import { CustomerRequestBody, BusinessRequestBody } from "../types/user.types";

export class RegistrationService {
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    return await bcrypt.hash(password, salt);
  }

  private async sendActivationEmail(
    user: User,
    userToken: Token
  ): Promise<void> {
    try {
      const heading = `<p style="font-size: 18px; text-align: left">Hi ${
        user.first_name || user.business_name
      },</p> <p style="font-size: 18px; text-align: center">Activate your Storefront Account with the link below...</p>.`;
      const subject = `Activate Your Storefront Account`;
      const message = `${process.env.BASE_URL}/${process.env.ACTIVATION_PATH}/${userToken.activation_code}`;
      await sendMail(user.email, subject, message, heading);
    } catch (error) {
      throw new Error(`Error sending email: ${error.message}`);
    }
  }

  public async createBusiness(merchant: BusinessRequestBody): Promise<User> {
    try {
      const hashedPassword = await this.hashPassword(merchant.password);

      const user = User.create({
        business_name: merchant.business_name,
        email: merchant.email,
        password: hashedPassword,
        role: UserType.business,
      });

      await user.save();

      return user;
    } catch (error) {
      throw new Error(`Merchant registration failed: ${error.message}`);
    }
  }

  public async createCustomer(customer: CustomerRequestBody): Promise<User> {
    try {
      const hashedPassword = await this.hashPassword(customer.password);

      const user = User.create({
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        password: hashedPassword,
        role: UserType.customer,
      });

      await user.save();

      return user;
    } catch (error) {
      throw new Error(`Customer registration failed: ${error.message}`);
    }
  }

  public async createToken(user: User): Promise<void> {
    const token = await user.generateAuthToken();
    const activationCode: string = require("crypto")
      .randomBytes(32)
      .toString("hex");

    try {
      const userToken = Token.create({
        activation_code: activationCode,
        user_id: user.id,
        token,
      });
      await userToken.save();

      await this.sendActivationEmail(user, userToken);
    } catch (error) {
      throw new Error(`Error creating token: ${error.message}`);
    }
  }
  public async verifyAccount(token: string): Promise<any> {
    try {
      const userToken: Token | null = await Token.findOne({
        where: { activation_code: token },
      });
      if (!userToken) {
        return {
          status: 400,
          message: "Invalid token, please try again",
        };
      }
      const user: User = await User.findOne({
        where: { id: userToken.user_id },
      });
      try {
        await user.verifyAuthToken(userToken.token);
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          await Token.remove(userToken);
          this.createToken(user);
          return {
            status: 400,
            message: `Expired token, activate your account with the new link sent to ${user.email}`,
          };
        }
      }

      await User.update({ id: user.id }, { activated: true });
      await Token.remove(userToken);
      return {
        status: 201,
        message: `Your account has been successfully activated`,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message:
          "An error occurred while activating your account. Please try again later.",
      };
    }
  }
}
