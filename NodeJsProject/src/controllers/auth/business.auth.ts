import { User } from "../../entities/user";
import { RegistrationService } from "../../services/register.services";
import {Resolver, Arg, Mutation, Query, Args, Ctx, UseMiddleware} from 'type-graphql';
import { RegisterInput } from "../graphqlTypes/registerinput";
import { customerSignupDetails } from "../graphqlTypes/customerSignupInput";
import { LoginArgument } from "../graphqlTypes/loginInput";
import { HttpContext } from "../graphqlTypes/context";
import { PasswordResetService } from "../../services/password_reset.services";
import { PasswordResetInput } from "../graphqlTypes/passwordResetInput";
import { isAuth } from "../../middlewares/authenticate";

@Resolver()
export class BusinessRegistrationReolver{
  @Query()
  Hello():string
  {
    return "Hello GrapghQl";
  }
  @Mutation( () => String)
  async registerBusiness(
    @Arg("RegisterInput") 
    {business_name, email, password, confirm_password}: RegisterInput
  ): Promise<string>
  {  
    let user = await User.findOne({ where: { email: email } });

    if (user) return "your are already here bro!!!";

    const isValidPassword = password == confirm_password;

    const businessRegistration = new RegistrationService();

    const business = await businessRegistration.createbusiness({
      business_name,
      email,
      password,
    });

    const token =  await businessRegistration.createToken(business);

    await businessRegistration.sendActivationEmail(business, token);

    return `Activate your account with the link sent to ${business.email}`;
  }

  @Mutation( () => String)
  async customerSignup(
    @Arg("signupDetails") {first_name, last_name, email, password, confirm_password}:customerSignupDetails,
    @Ctx() {res}: HttpContext
  ): Promise<string>
  {
    try {
    
      const user = await User.findOne({ where: { email: email } });
  
      if (user) {
        return  "Email already exists, Log in" ;
      }
  
      const isValidPassword = password === confirm_password;
  
      if (!isValidPassword) {
        
        "Password and confirm password do not match" ;
      }
      const customerRegistration = new RegistrationService();

      const customer = await customerRegistration.createCustomer({
        first_name,
        last_name,
        email: email,
        password,
       
      });
    

      const token =  await customerRegistration.createToken(customer);

      await customerRegistration.sendActivationEmail(customer, token);

      return `Activate your account with the link sent to ${customer.email}`;
    
    } catch (error) {
      return "Error creating customer";
    }

  }

  @Mutation(() => String)
  async login(
    @Args() {email, password}:LoginArgument,
    @Ctx() {res}:HttpContext
    ): Promise<string>
  {
    try {
      const user: User | null = await User.findOne({
        where: { email: email },
      });
  
      if (!user) {
        return "Invalid email or password" ;
      }
  
      if (!user.activated) {
        return "Activate your account";
      }
      
      const isValidPassword: boolean = await user.comparePassword(password);
  
      if (!isValidPassword) {
        return "Invalid email or password" ;
      }

      const Login = new RegistrationService();

      const token =  await Login.createToken(user);

      res.headers.set("auth-token", token);
  
      return "Logged in successfully";
    } catch (err) {
      return "Log in failed";
    }

  }

  @Query( () => String)
  async requestPasswordReset(@Arg('Email') email: string):Promise<string>
  {
    try {
      const passwordResetService = new PasswordResetService();
      await passwordResetService.sendResetEmail(email);
  
      return  `Password reset link successfully sent to ${email}`;
    } catch (error) {
      return error.message;
    }
  }

  @Mutation(() => String)
  async resetPassword(
    @Arg('data') {password, confirm_password}:PasswordResetInput,
    @Ctx() {req}:HttpContext
    ):Promise<string>
  {
    const isValidPassword = password === confirm_password;
    if (!isValidPassword) {
      return  `Password and confirm password do not match`;
    }
    const tokenClaims = req.headers["auth-token"].split(" ")[1];
    const id = tokenClaims.id; 
    try {
      const passwordResetService = new PasswordResetService();
      await passwordResetService.resetPassword( password, Number(id));
  
      return `Password reset successful`;

    } catch (error) {
      return "Password reset failed";
    }
  }

  
  @Query(() => String)
  @UseMiddleware(isAuth)
  async verifyAccount( )
  {
  try {
    
    return "Your account has been successfully activated";
  } catch (error) {
    return "An error occurred while trying to activate your account. Please try again later";
  }
  }


}

// import { NextFunction, Response, Request } from "express";
// import { User, UserType } from "../../entities/user";
// import { validateBusinessReg } from "../../utils/validations/business";
// import { UserRequestBody } from "../../types/user.types"; 
// import { RegistrationService } from "../../services/register.services";
// import {Resolver, Arg, Mutation} from 'type-graphql';
// import { RegisterInput } from "../graphqlTypes/registerinput";

//  (
//   req: Request<{}, {}, UserRequestBody>,
//   res: Response<{ message: string }>,
//   next: NextFunction
// ): Promise<Response<any, Record<string, any>>> => {
//   const { business_name, email, password, confirm_password } = req.body;

//   const { error, value } = validateBusinessReg({
//     business_name,
//     email,
//     password,
//     confirm_password,
//   });

//   if (error) {
//     return res.status(404).send(error.details[0].message);
//   }

//   try {
//     let user = await User.findOne({ where: { email: value.email } });

//     if (user) {
//       return res.status(401).send({ message: "Email already exist, Log in" });
//     }

//     const isValidPassword = password == confirm_password;

//     if (!isValidPassword) {
//       return res
//         .status(401)
//         .send({ message: "Password and confirm password do not match" });
//     }
//     const businessRegistration = new RegistrationService();
//     const business = await businessRegistration.createbusiness({
//       business_name,
//       email : value.email,
//       password,
   
//     });

//     businessRegistration.createToken(business);

//     return res.status(200).send({
//       message: `Activate your account with the link sent to ${business.email}`,
//     });
//   } catch (error) {
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// };