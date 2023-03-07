import bcrypt from "bcrypt";
import { User, UserType } from "../entities/user";
import { sendMail } from "../utils/mailer";
import { UserRequestBody } from "../types/user.types";

export class RegistrationService {
  private async hashPassword(password: string): Promise<string> {
    // const salt = await bcrypt.genSalt(Number(process.env.SALT));
    return await bcrypt.hash(password, 12);
  }
  public async sendActivationEmail(user: User, token: string): Promise<void> {

   const heading = `<p style="font-size: 18px; text-align: left">Hi ${
     user.first_name || user.business_name
   },</p> <p style="font-size: 18px; text-align: center">Activate your Storefront Account with the link below...</p>.`;
    const subject = `Activate Your Storefront Account`;
    const message = `localhost${4000}/api/${user.role}/verify/${user.id}/${token}`;
    await sendMail(user.email, subject, message, heading);
  }

  public async createbusiness(
    merchant: Partial<UserRequestBody>,
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
    customer: Partial<UserRequestBody>
  ): Promise<User> {
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
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  public async createToken(user: User):Promise<string> {
    
    try {
      const token = await user.generateAuthToken();
      return token;
    } catch (error) {
      throw Error(error);
    }
  }
}
