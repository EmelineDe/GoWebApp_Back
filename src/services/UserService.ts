/**
 * @fileoverview Service pour la gestion des utilisateurs
 * @module services/UserService
 */

import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { UserDTO } from "../DTO/UserDTO";

/**
 * Service pour la gestion des utilisateurs
 * @class UserService
 */
export class UserService {
  /**
   * Crée un nouvel utilisateur
   * @static
   * @async
   * @param {UserDTO} data - Données de l'utilisateur à créer
   * @returns {Promise<User>} L'utilisateur créé
   */
  static async createUser(data: UserDTO): Promise<User> {
    return UserRepository.create(data);
  }

  /**
   * Récupère un utilisateur avec toutes ses réponses
   * @static
   * @async
   * @param {number} userId - L'identifiant de l'utilisateur
   * @returns {Promise<User | null>} L'utilisateur avec ses réponses ou null si non trouvé
   */
  static async getUserWithAnswers(userId: number): Promise<User | null> {
    return UserRepository.findById(userId);
  }
}
