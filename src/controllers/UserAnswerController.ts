import { Request, Response } from "express";
import { UserAnswerService } from "../services/UserAnswerService";
import { userAnswersPayloadSchema } from "../validators/userAnswerValidator";
import { UserAnswerDTO } from "../DTO/UserAnswerDTO";

export class UserAnswerController {
  static async saveUserAnswers(req: Request, res: Response) {
    const parsed = userAnswersPayloadSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ errors: parsed.error.flatten().fieldErrors });
    }

    try {
      const { userId, answers } = parsed.data;

      const data: UserAnswerDTO[] = answers.map((a) => ({
        userId,
        answerId: a.answerId,
      }));

      const saved = await UserAnswerService.saveUserAnswers(data);
      return res.status(201).json(saved);
    } catch (error) {
      return res.status(500).json({ error: "Erreur serveur.", details: error });
    }
  }
}
