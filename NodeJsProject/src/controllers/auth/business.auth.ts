import { User } from "../../entities/user";
import { RegistrationService } from "../../services/register.services";
import {Resolver, Arg, Mutation, Query} from 'type-graphql';
import { RegisterInput } from "../graphqlTypes/registerinput";

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
  ): Promise<string>{  
    let user = await User.findOne({ where: { email: email } });

    const isValidPassword = password == confirm_password;

    const businessRegistration = new RegistrationService();
    const business = await businessRegistration.createbusiness({
      business_name,
      email : email,
      password,
    });

    businessRegistration.createToken(business);

    return `Activate your account with the link sent to ${business.email}`;
    

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