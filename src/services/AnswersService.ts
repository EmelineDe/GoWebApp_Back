/**
 * @fileoverview Service pour la gestion des réponses
 * @module services/AnswersService
 */

import { Answer } from "../entities/Answer";
import { AnswersRepository } from "../repositories/AnswersRepository";

/**
 * Service pour la gestion des réponses
 * @class AnswersService
 */
export class AnswersService {
  /**
   * Récupère une réponse avec sa question suivante associée
   * @static
   * @async
   * @param {number} id - L'identifiant de la réponse
   * @returns {Promise<Answer | null>} La réponse avec sa question suivante ou null si non trouvée
   */
  static async getAnswerWithNextQuestion(id: number): Promise<Answer | null> {
    return AnswersRepository.findByIdWithNextQuestion(id);
  }

  /**
   * Récupère toutes les réponses associées à une question
   * @static
   * @async
   * @param {number} questionId - L'identifiant de la question
   * @returns {Promise<Answer[]>} Liste des réponses de la question
   */
  static async getAnswersByQuestionId(questionId: number): Promise<Answer[]> {
    return AnswersRepository.findByQuestionId(questionId);
  }
}
