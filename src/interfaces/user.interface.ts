import { RoleEnum } from "../enums/role.enum";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  age: string;
  phone?: string;
  role: RoleEnum;
  isVerified: boolean;
  isDeleted: boolean;
  createAt?: Date;
  updateAt?: Date;
}
