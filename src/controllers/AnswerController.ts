import { Request, Response } from "express";
import { AnswersService } from "../services/AnswersService";

export class AnswerController {
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

      return res.json(answer.nextQuestion);
    } catch (error) {
      return res.status(500).json({ error: "Erreur serveur.", details: error });
    }
  }
}
