import { Request, Response } from "express";
import { QuestionService } from "../services/QuestionsService";

export class QuestionController {
  // Méthode pour obtenir la première question d'une catégorie
  static async getFirstQuestion(req: Request, res: Response) {
    try {
      const { category } = req.params;

      const question = await QuestionService.getFirstQuestionByCategory(
        category
      );

      if (!question) {
        return res.status(404).json({ message: "Question non trouvée" });
      }

      return res.json(question);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }

  // Méthode pour obtenir une question par son ID
  static async getQuestionById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const question = await QuestionService.getQuestionById(parseInt(id));

      if (!question) {
        return res.status(404).json({ message: "Question non trouvée" });
      }

      return res.json(question);
    } catch (error) {
      return res.status(500).json({ message: "Erreur serveur" });
    }
  }
}
