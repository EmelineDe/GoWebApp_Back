import { Answer } from "../entities/Answer";
import { AnswersRepository } from "../repositories/AnswersRepository";

export class AnswersService {
  static async getAnswerWithNextQuestion(id: number): Promise<Answer | null> {
    return AnswersRepository.findByIdWithNextQuestion(id);
  }

  static async getAnswersByQuestionId(questionId: number): Promise<Answer[]> {
    return AnswersRepository.findByQuestionId(questionId);
  }
}
