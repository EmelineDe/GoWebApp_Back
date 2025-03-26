import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { UserDTO } from "../DTO/UserDTO";

export class UserService {
  static async createUser(data: UserDTO): Promise<User> {
    return UserRepository.create(data);
  }

  static async getUserWithAnswers(userId: number): Promise<User | null> {
    return UserRepository.findById(userId);
  }
}
