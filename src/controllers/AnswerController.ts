/**
 * @fileoverview Contrôleur pour la gestion des réponses
 * @module controllers/AnswerController
 */

import { Request, Response } from "express";
import { AnswersService } from "../services/AnswersService";

/**
 * Contrôleur pour la gestion des réponses
 * @class AnswerController
 */
export class AnswerController {
  /**
   * Récupère la question suivante associée à une réponse
   * @static
   * @async
   * @param {Request} req - Requête Express contenant l'ID de la réponse dans les paramètres
   * @param {Response} res - Réponse Express
   * @returns {Promise<Response>} La question suivante ou un message d'erreur
   * @throws {Error} Erreur serveur
   */
  static async getNextQuestionFromAnswer(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide." });
    }

    try {
      const answer = await AnswersService.getAnswerWithNextQuestion(id);

      if (!answer?.nextQuestion) {
        return res.status(404).json({ message: "Pas de question suivante." });
      }

      return res.status(200).json(answer.nextQuestion);
    } catch (error) {
      return res.status(500).json({ error: "Erreur serveur.", details: error });
    }
  }
}
