/**
 * @fileoverview Repository pour la gestion des réponses utilisateur dans la base de données
 * @module repositories/UserAnswerRepository
 */

import { AppDataSource } from "../config/data-source";
import { UserAnswer } from "../entities/UserAnswer";

/**
 * Repository pour la gestion des réponses utilisateur dans la base de données
 * @class UserAnswerRepository
 */
export class UserAnswerRepository {
  /**
   * Crée plusieurs réponses utilisateur en une seule opération
   * @static
   * @async
   * @param {Partial<UserAnswer>[]} data - Liste des réponses à créer
   * @returns {Promise<UserAnswer[]>} Liste des réponses créées
   */
  static async createMany(data: Partial<UserAnswer>[]): Promise<UserAnswer[]> {
    const repo = AppDataSource.getRepository(UserAnswer);
    const answers = repo.create(data);
    return repo.save(answers);
  }
}
