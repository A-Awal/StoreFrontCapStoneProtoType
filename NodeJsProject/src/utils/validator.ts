import { z } from "zod";

export const userSchema = z.object({
  id: z.string().nonempty("User id can not be empty"),
  first_name: z
    .string()
    .nonempty("First name can not be empty")
    .regex(/^[a-zA-Z\s]+$/, "Special characters are not allowed")
    .trim(),
  last_name: z
    .string()
    .nonempty("Last name can not be empty")
    .regex(/^[a-zA-Z]+$/, "Special characters are not allowed")
    .trim(),
  business_name: z
    .string()
    .nonempty("Business name can not be empty")
    .regex(/^[a-zA-Z\s]+$/, "Special characters are not allowed")
    .trim(),
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z0-9\W]+$/,
      "Password must have atleast an uppercase letter, a lowercase letter, a special character and a digit"
    )
    .trim(),
  confirm_password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z0-9\W]+$/,
      "Password must have atleast an uppercase letter, a lowercase letter, a special character and a digit"
    )
    .trim(),
  token: z.string().nonempty("Token can not be empty"),
});
