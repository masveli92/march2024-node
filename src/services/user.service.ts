import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async getById(userId: string): Promise<IUser | null> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
    const user = await userRepository.updateById(userId, dto);
    return user;
  }

  public async deleteById(userId: string): Promise<void> {
    return await userRepository.deleteById(userId);
  }
}

export const userService = new UserService();
