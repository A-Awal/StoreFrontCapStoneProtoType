import Joi from "joi";

// login validator
const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    "string.email": "Invalid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
 
});

//Customer registration validator
const customerRegValidator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

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


//Business registration validator
const businessRegValidator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });
const businessRegSchema = Joi.object({
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

  business_name: Joi.string().required().messages({
    "string.min": "Lastname can not be empty",
    "any.required": "Lastname is required",
  }),
});

export const validateBusinessReg = businessRegValidator(businessRegSchema);
export const validateCustomerReg = customerRegValidator(customerRegSchema);
export const validateLogin = validator(loginSchema);
