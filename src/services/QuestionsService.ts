/**
 * @fileoverview Service pour la gestion des questions
 * @module services/QuestionsService
 */

import { Question } from "../entities/Question";
import { QuestionRepository } from "../repositories/QuestionsRepository";

/**
 * Service pour la gestion des questions
 * @class QuestionsService
 */
export class QuestionsService {
  /**
   * Récupère la première question d'une catégorie spécifique
   * @static
   * @async
   * @param {string} category - La catégorie de la question
   * @returns {Promise<Question | null>} La première question trouvée ou null si aucune question n'existe
   */
  static async getFirstQuestionByCategory(
    category: string
  ): Promise<Question | null> {
    return QuestionRepository.findFirstQuestion(category);
  }

  /**
   * Récupère une question par son identifiant avec ses réponses associées
   * @static
   * @async
   * @param {number} id - L'identifiant de la question
   * @returns {Promise<Question | null>} La question trouvée avec ses réponses ou null si non trouvée
   */
  static async getQuestionById(id: number): Promise<Question | null> {
    return QuestionRepository.findByIdWithAnswers(id);
  }

  /**
   * Récupère toutes les questions d'une catégorie spécifique
   * @static
   * @async
   * @param {string} category - La catégorie des questions
   * @returns {Promise<Question[]>} Liste des questions de la catégorie
   */
  static async getAllQuestionsByCategory(
    category: string
  ): Promise<Question[]> {
    return QuestionRepository.findAllByCategory(category);
  }
}
