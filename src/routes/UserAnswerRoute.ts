/**
 * @fileoverview Routes pour la gestion des réponses utilisateur
 * @module routes/UserAnswerRoute
 */

import { Router, Request, Response } from "express";
import { UserAnswerController } from "../controllers/UserAnswerController";

const router = Router();

/**
 * Route pour sauvegarder les réponses d'un utilisateur
 * @route POST /api/user-answers
 * @description Enregistre les réponses d'un utilisateur pour le questionnaire
 * @param {Request} req - Requête Express
 * @param {Object} req.body - Corps de la requête
 * @param {Array<{userId: number, answerId: number}>} req.body.answers - Liste des réponses de l'utilisateur
 * @param {Response} res - Réponse Express
 * @returns {Promise<void>}
 * @throws {400} Si les données sont invalides
 * @throws {500} En cas d'erreur serveur
 */
router.post("/user-answers", async (req: Request, res: Response) => {
  await UserAnswerController.saveUserAnswers(req, res);
});

export default router;
