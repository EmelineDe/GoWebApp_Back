import { AppDataSource } from "../config/data-source";
import { Answer } from "../entities/Answer";

export class AnswersRepository {
  static async findByIdWithNextQuestion(id: number): Promise<Answer | null> {
    return AppDataSource.getRepository(Answer).findOne({
      where: { id },
      relations: ["nextQuestion"],
    });
  }

  static async findByQuestionId(questionId: number): Promise<Answer[]> {
    return AppDataSource.getRepository(Answer).find({
      where: { question: { id: questionId } },
      relations: ["nextQuestion"],
      order: { id: "ASC" },
    });
  }
}
