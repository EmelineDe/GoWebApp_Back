import { Question } from "../entities/Question";
import { QuestionRepository } from "../repositories/QuestionsRepository";

export class QuestionService {
  static async getFirstQuestionByCategory(
    category: string
  ): Promise<Question | null> {
    return QuestionRepository.findFirstQuestion(category);
  }

  static async getQuestionById(id: number): Promise<Question | null> {
    return QuestionRepository.findByIdWithAnswers(id);
  }

  static async getAllQuestionsByCategory(
    category: string
  ): Promise<Question[]> {
    return QuestionRepository.findAllByCategory(category);
  }
}
