import { Router, Request, Response } from "express";
import { AnswerController } from "../controllers/AnswerController";

const router = Router();

router.get("/answers/:id/next", async (req: Request, res: Response) => {
  await AnswerController.getNextQuestionFromAnswer(req, res);
});

export default router;
