/**
 * @fileoverview Repository pour la gestion des réponses dans la base de données
 * @module repositories/AnswersRepository
 */

import { AppDataSource } from "../config/data-source";
import { Answer } from "../entities/Answer";

/**
 * Repository pour la gestion des réponses
 * @class AnswersRepository
 * @description Gère les opérations de base de données liées aux réponses,
 * notamment la récupération des réponses avec leurs questions suivantes
 */
export class AnswersRepository {
  /**
   * Récupère une réponse par son ID avec sa question suivante
   * @param {number} id - L'identifiant de la réponse
   * @returns {Promise<Answer | null>} La réponse avec sa question suivante ou null si non trouvée
   */
  static async findByIdWithNextQuestion(id: number): Promise<Answer | null> {
    return AppDataSource.getRepository(Answer).findOne({
      where: { id },
      relations: ["nextQuestion"],
    });
  }

  /**
   * Récupère toutes les réponses associées à une question
   * @param {number} questionId - L'identifiant de la question
   * @returns {Promise<Answer[]>} Un tableau des réponses triées par ID
   */
  static async findByQuestionId(questionId: number): Promise<Answer[]> {
    return AppDataSource.getRepository(Answer).find({
      where: { question: { id: questionId } },
      relations: ["nextQuestion"],
      order: { id: "ASC" },
    });
  }
}
