import Joi from "joi";

export const validator = (schema) => (payload) =>
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

const resetPasswordSchemma = Joi.object({
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
  confirm_password: Joi.string().min(8).required().messages({
    "string.min": "Confirm password must be at least 8 characters long",
    "any.required": "Confirm password is required",
  }),

})

const emailSchema = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    "string.email": "Invalid email address",
    "any.required": "Email is required",
  }),
});

export const validateReset = validator(resetPasswordSchemma)
export const validateEmail = validator(emailSchema);
export const validateLogin = validator(loginSchema);
