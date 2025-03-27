/**
 * @fileoverview Repository pour la gestion des questions dans la base de données
 * @module repositories/QuestionsRepository
 */

import { AppDataSource } from "../config/data-source";
import { Question } from "../entities/Question";

/**
 * Repository pour la gestion des questions dans la base de données
 * @class QuestionRepository
 */
export class QuestionRepository {
  /**
   * Trouve la première question d'une catégorie spécifique (niveau 1)
   * @static
   * @async
   * @param {string} category - La catégorie de la question
   * @returns {Promise<Question | null>} La première question trouvée ou null si aucune question n'existe
   */
  static async findFirstQuestion(category: string): Promise<Question | null> {
    return AppDataSource.getRepository(Question).findOne({
      where: { level: 1, category },
      relations: ["answers"],
    });
  }

  /**
   * Trouve une question par son identifiant avec ses réponses associées
   * @static
   * @async
   * @param {number} id - L'identifiant de la question
   * @returns {Promise<Question | null>} La question trouvée avec ses réponses ou null si non trouvée
   */
  static async findByIdWithAnswers(id: number): Promise<Question | null> {
    return AppDataSource.getRepository(Question).findOne({
      where: { id },
      relations: ["answers"],
    });
  }

  /**
   * Trouve toutes les questions d'une catégorie spécifique, triées par niveau et ID
   * @static
   * @async
   * @param {string} category - La catégorie des questions
   * @returns {Promise<Question[]>} Liste des questions de la catégorie, triées par niveau et ID
   */
  static async findAllByCategory(category: string): Promise<Question[]> {
    return AppDataSource.getRepository(Question).find({
      where: { category },
      relations: ["answers"],
      order: { level: "ASC", id: "ASC" },
    });
  }
}
