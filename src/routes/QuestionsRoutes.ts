import { Router, Request, Response } from "express";
import { QuestionController } from "../controllers/QuestionController";

const router = Router();

router.get(
  "/questions/first/:category",
  async (req: Request, res: Response) => {
    await QuestionController.getFirstQuestion(req, res);
  }
);

router.get("/questions/:id", async (req: Request, res: Response) => {
  await QuestionController.getQuestionById(req, res);
});

export default router;
