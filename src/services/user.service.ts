import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    if (!dto.name || dto.name.length < 2) {
      throw new ApiError(
        "Name is required and should be at least 2 characters",
        400,
      );
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required and should be valid", 400);
    }
    if (!dto.password || dto.password.length < 6) {
      throw new ApiError(
        "Password is required and should be at least 6 characters",
        400,
      );
    }
    return await userRepository.create(dto);
  }

  public async getById(userId: number): Promise<IUser | null> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async updateById(userId: number, dto: Partial<IUser>): Promise<IUser> {
    if (!dto.name || dto.name.length < 2) {
      throw new ApiError(
        "Name is required and should be at least 2 characters",
        400,
      );
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required and should be valid", 400);
    }
    if (!dto.password || dto.password.length < 6) {
      throw new ApiError(
        "Password is required and should be at least 6 characters",
        400,
      );
    }
    const user = await userRepository.updateById(userId, dto);
    return user;
  }

  public async deleteById(userId: number): Promise<void> {
    return await userRepository.deleteById(userId);
  }
}

export const userService = new UserService();
