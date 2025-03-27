/**
 * @fileoverview Routes pour la gestion des utilisateurs
 * @module routes/UserRoute
 */

import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

/**
 * Route pour créer un nouvel utilisateur
 * @route POST /user
 * @param {Request} req - Requête Express
 * @param {Response} res - Réponse Express
 */
router.post("/user", async (req: Request, res: Response) => {
  await UserController.create(req, res);
});

/**
 * Route pour récupérer les réponses d'un utilisateur
 * @route GET /user/:id
 * @param {Request} req - Requête Express
 * @param {Response} res - Réponse Express
 */
router.get("/user/:id", async (req: Request, res: Response) => {
  await UserController.getUserWithAnswers(req, res);
});

export default router;
