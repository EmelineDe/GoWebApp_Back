/**
 * @fileoverview Repository pour la gestion des utilisateurs dans la base de données
 * @module repositories/UserRepository
 */

import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

/**
 * Repository pour la gestion des utilisateurs dans la base de données
 * @class UserRepository
 */
export class UserRepository {
  /**
   * Crée un nouvel utilisateur
   * @static
   * @async
   * @param {Partial<User>} userData - Données de l'utilisateur à créer
   * @returns {Promise<User>} L'utilisateur créé
   */
  static async create(userData: Partial<User>): Promise<User> {
    const repo = AppDataSource.getRepository(User);
    const user = repo.create(userData);
    return repo.save(user);
  }

  /**
   * Trouve un utilisateur par son identifiant avec toutes ses réponses
   * @static
   * @async
   * @param {number} id - L'identifiant de l'utilisateur
   * @returns {Promise<User | null>} L'utilisateur avec ses réponses ou null si non trouvé
   */
  static async findById(id: number): Promise<User | null> {
    return AppDataSource.getRepository(User).findOne({
      where: { id },
      relations: ["answers", "answers.answer"],
    });
  }
}
