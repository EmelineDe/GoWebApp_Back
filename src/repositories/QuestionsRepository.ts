import { AppDataSource } from "../config/data-source";
import { Question } from "../entities/Question";

export class QuestionRepository {
  static async findFirstQuestion(category: string): Promise<Question | null> {
    return AppDataSource.getRepository(Question).findOne({
      where: { level: 1, category },
      relations: ["answers"],
    });
  }

  static async findByIdWithAnswers(id: number): Promise<Question | null> {
    return AppDataSource.getRepository(Question).findOne({
      where: { id },
      relations: ["answers"],
    });
  }

  static async findAllByCategory(category: string): Promise<Question[]> {
    return AppDataSource.getRepository(Question).find({
      where: { category },
      relations: ["answers"],
      order: { level: "ASC", id: "ASC" },
    });
  }
}
