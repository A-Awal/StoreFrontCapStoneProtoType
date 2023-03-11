import Joi from "joi";
import { validator } from "./login_schema";




const customerRegSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    "string.email": "Invalid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
  confirm_password: Joi.string().min(8).required().messages({
    "string.min": "Confirm password must be at least 8 characters long",
    "any.required": "Confirm password is required",
  }),

  first_name: Joi.string().required().messages({
    "string.email": "Firstname can not be empty",
    "any.required": "Firstname is required",
  }),
  last_name: Joi.string().required().messages({
    "string.min": "Lastname can not be empty",
    "any.required": "Lastname is required",
  }),
});

export const validateCustomerReg = validator(customerRegSchema);
