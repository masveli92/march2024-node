import joi from "joi";

import { regexConstant } from "../constans/regex.constant";

export class UserValidator {
  private static name = joi.string().min(2).max(20).trim();
  private static age = joi.number().min(18).max(120);
  private static phone = joi.string().trim().regex(regexConstant.PHONE);
  private static email = joi
    .string()
    .lowercase()
    .trim()
    .regex(regexConstant.EMAIL)
    .required();
  private static password = joi
    .string()
    .trim()
    .regex(regexConstant.PASSWORD)
    .required();

  public static create = joi.object({
    name: this.name.required(),
    age: this.age.required(),
    email: this.email.required(),
    password: this.password.required(),
    phone: this.phone,
  });
  public static update = joi.object({
    name: this.name,
    age: this.age,
    phone: this.phone,
  });
}
