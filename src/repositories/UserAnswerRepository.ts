import { AppDataSource } from "../data-source";
import { UserAnswer } from "../entities/UserAnswer";

export class UserAnswerRepository {
  static async createMany(data: Partial<UserAnswer>[]): Promise<UserAnswer[]> {
    const repo = AppDataSource.getRepository(UserAnswer);
    const answers = repo.create(data);
    return repo.save(answers);
  }
}
