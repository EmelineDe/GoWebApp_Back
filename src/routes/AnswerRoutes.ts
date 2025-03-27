/**
 * @fileoverview Routes pour la gestion des réponses
 * @module routes/AnswerRoutes
 */

import { Router, Request, Response } from "express";
import { AnswerController } from "../controllers/AnswerController";

const router = Router();

/**
 * Route pour obtenir la question suivante associée à une réponse
 * @route GET /answers/:id/next
 * @param {Request} req - Requête Express
 * @param {Response} res - Réponse Express
 */
router.get("/answers/:id/next", async (req: Request, res: Response) => {
  await AnswerController.getNextQuestionFromAnswer(req, res);
});

export default router;
