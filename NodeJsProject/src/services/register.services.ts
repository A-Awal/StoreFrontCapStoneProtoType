import bcrypt from "bcrypt";
import { User, UserType } from "../entities/user";
import { sendMail } from "../utils/mailer";
import { BusinessRegistrationRequestBody } from "../types/business.types";
import { CustomerRegistrationRequestBody } from "../types/customer.types";
import { Token } from "../entities/token";


export class RegistrationService {
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    return await bcrypt.hash(password, salt);
  }
  private async sendActivationEmail(user: User, token: string): Promise<void> {
    const heading = `Hi ${user.first_name},\n\n Activate your Storefront account with the link below `;
    const subject = `Activate Your Storefront Account`;
    const message = `${process.env.BASE_URL}/api/${user.role}/verify/${user.id}/${token}`;
    await sendMail(user.email, subject, message, heading);
  }

  public async createbusiness(
    merchant: BusinessRegistrationRequestBody,
  ): Promise<User> {
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
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }

  public async createCustomer(
    customer: CustomerRegistrationRequestBody
  ): Promise<User> {
    try {
      const hashedPassword = await this.hashPassword(customer.password);

      console.log(customer.email)
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
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  public async createToken(user: User):Promise<void> {
    const token = await user.generateAuthToken();

    try {
      const userToken = Token.create({
        user_id: user.id,
        token,
      });
      await userToken.save();

      await this.sendActivationEmail(user, token);

    } catch (error) {
      throw Error(error);
    }
  }
}
