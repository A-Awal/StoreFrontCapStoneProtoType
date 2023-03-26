import { NextFunction, Response, Request } from "express";
import { User } from "../../entities/user";
import { userSchema } from "../../utils/validator";
import { RegistrationService } from "../../services/register.services";
import { BusinessRequestBody } from "../../types/user.types";

export const businessRegistration = async (
    req: Request<{}, {}, BusinessRequestBody>,
    res: Response<{ message: string }>,
    next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
    const { business_name, email, password, confirm_password } = req.body;

    const businessSchema = userSchema.omit({
        first_name: true,
        last_name: true,
        id: true,
        token: true
    });

    const validUser = await businessSchema.safeParseAsync({
        business_name,
        email,
        password,
        confirm_password,
    });

    if (validUser.success === false) {
        return res.status(404).send(validUser.error);
    }

    try {
        const {
            data: { business_name, email, password, confirm_password },
        } = validUser;
        let user: User | null = await User.findOne({
            where: { email, },
        });

        if (user) {
            return res.status(409).send({
                message:
                    "Registration failed, email already exists. Please log in or use another email",
            });
        }

        const isValidPassword = password == confirm_password;

        if (!isValidPassword) {
            return res.status(401).send({
                message: "Password and confirm password do not match",
            });
        }
        const businessRegistration = new RegistrationService();
        const business = await businessRegistration.createBusiness({
            business_name,
            email,
            password,
            confirm_password,
        });

        businessRegistration.createToken(business);

        return res.status(201).send({
            message: `Activate your account with the link sent to ${business.email}`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Sorry, something went wrong. Please try again later",
        });
    }
};
