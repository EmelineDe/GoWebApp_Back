import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export class UserRepository {
  static async create(userData: Partial<User>): Promise<User> {
    const repo = AppDataSource.getRepository(User);
    const user = repo.create(userData);
    return repo.save(user);
  }

  static async findById(id: number): Promise<User | null> {
    return AppDataSource.getRepository(User).findOne({
      where: { id },
      relations: ["answers", "answers.answer"],
    });
  }
}
