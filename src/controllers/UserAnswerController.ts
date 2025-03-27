/**
 * @fileoverview Contrôleur pour la gestion des réponses utilisateur
 * @module controllers/UserAnswerController
 */

import { Request, Response } from "express";
import { UserAnswerService } from "../services/UserAnswerService";
import { userAnswersPayloadSchema } from "../validators/userAnswerValidator";
import { UserAnswerDTO } from "../DTO/UserAnswerDTO";

/**
 * Contrôleur pour la gestion des réponses utilisateur
 * @class UserAnswerController
 */
export class UserAnswerController {
  /**
   * Sauvegarde les réponses d'un utilisateur
   * @static
   * @async
   * @param {Request} req - Requête Express contenant les réponses à sauvegarder
   * @param {Response} res - Réponse Express
   * @returns {Promise<Response>} Les réponses sauvegardées ou un message d'erreur
   * @throws {Error} Erreur de validation ou serveur
   */
  static async saveUserAnswers(req: Request, res: Response) {
    const parsed = userAnswersPayloadSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ errors: parsed.error.flatten().fieldErrors });
    }

    try {
      const { userId, answers } = parsed.data;

      const data: UserAnswerDTO[] = answers.map((a) => ({
        userId,
        answerId: a.answerId,
      }));

      const saved = await UserAnswerService.saveUserAnswers(data);
      return res.status(201).json(saved);
    } catch (error) {
      return res.status(500).json({ error: "Erreur serveur.", details: error });
    }
  }
}
