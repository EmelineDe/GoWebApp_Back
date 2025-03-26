import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

// Enregistrement d'un utilisateur
router.post("/user", async (req: Request, res: Response) => {
  await UserController.create(req, res);
});

// Récupération des réponses d'un utilisateur
router.get("/user/:id", async (req: Request, res: Response) => {
  await UserController.getUserWithAnswers(req, res);
});

export default router;
