/**
 * @fileoverview Contrôleur pour la gestion des questions
 * @module controllers/QuestionController
 */

import { Request, Response } from "express";
import { QuestionsService } from "../services/QuestionsService";

/**
 * Contrôleur pour la gestion des questions
 * @class QuestionController
 */
export class QuestionController {
  /**
   * Récupère la première question d'une catégorie spécifique
   * @static
   * @async
   * @param {Request} req - Requête Express contenant la catégorie dans les paramètres
   * @param {Response} res - Réponse Express
   * @returns {Promise<Response>} La question trouvée ou un message d'erreur
   * @throws {Error} Erreur serveur
   */
  static async getFirstQuestion(req: Request, res: Response) {
    try {
      const { category } = req.params;

      const question = await QuestionsService.getFirstQuestionByCategory(
        category
      );

      if (!question) {
        return res.status(404).json({ message: "Question non trouvée" });
      }

      return res.status(200).json(question);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  /**
   * Récupère une question par son identifiant
   * @static
   * @async
   * @param {Request} req - Requête Express contenant l'ID dans les paramètres
   * @param {Response} res - Réponse Express
   * @returns {Promise<Response>} La question trouvée ou un message d'erreur
   * @throws {Error} Erreur serveur
   */
  static async getQuestionById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const question = await QuestionsService.getQuestionById(parseInt(id));

      if (!question) {
        return res.status(404).json({ message: "Question non trouvée" });
      }

      return res.status(200).json(question);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }
}
