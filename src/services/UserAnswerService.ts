/**
 * @fileoverview Service pour la gestion des réponses utilisateur
 * @module services/UserAnswerService
 */

import { UserAnswer } from "../entities/UserAnswer";
import { UserAnswerRepository } from "../repositories/UserAnswerRepository";
import { UserAnswerDTO } from "../DTO/UserAnswerDTO";
import { User } from "../entities/User";
import { Answer } from "../entities/Answer";

/**
 * Service pour la gestion des réponses utilisateur
 * @class UserAnswerService
 */
export class UserAnswerService {
  /**
   * Sauvegarde plusieurs réponses utilisateur
   * @static
   * @async
   * @param {UserAnswerDTO[]} data - Liste des réponses à sauvegarder
   * @returns {Promise<UserAnswer[]>} Liste des réponses sauvegardées
   */
  static async saveUserAnswers(data: UserAnswerDTO[]): Promise<UserAnswer[]> {
    const userAnswers = data.map((dto) => ({
      user: { id: dto.userId } as User,
      answer: { id: dto.answerId } as Answer,
    }));
    return UserAnswerRepository.createMany(userAnswers);
  }
}
