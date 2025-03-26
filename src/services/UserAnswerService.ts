import { UserAnswer } from "../entities/UserAnswer";
import { UserAnswerRepository } from "../repositories/UserAnswerRepository";
import { UserAnswerDTO } from "../DTO/UserAnswerDTO";
import { User } from "../entities/User";
import { Answer } from "../entities/Answer";

export class UserAnswerService {
  static async saveUserAnswers(data: UserAnswerDTO[]): Promise<UserAnswer[]> {
    const userAnswers = data.map((dto) => ({
      user: { id: dto.userId } as User,
      answer: { id: dto.answerId } as Answer,
    }));
    return UserAnswerRepository.createMany(userAnswers);
  }
}
