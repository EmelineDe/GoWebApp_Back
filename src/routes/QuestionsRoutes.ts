/**
 * @fileoverview Routes pour la gestion des questions
 * @module routes/QuestionsRoutes
 */

import { Router, Request, Response } from "express";
import { QuestionController } from "../controllers/QuestionController";

const router = Router();

/**
 * Route pour obtenir la première question d'une catégorie
 * @route GET /questions/first/:category
 * @param {Request} req - Requête Express
 * @param {Response} res - Réponse Express
 */
router.get(
  "/questions/first/:category",
  async (req: Request, res: Response) => {
    await QuestionController.getFirstQuestion(req, res);
  }
);

/**
 * Route pour obtenir une question par son ID
 * @route GET /questions/:id
 * @param {Request} req - Requête Express
 * @param {Response} res - Réponse Express
 */
router.get("/questions/:id", async (req: Request, res: Response) => {
  await QuestionController.getQuestionById(req, res);
});

export default router;
