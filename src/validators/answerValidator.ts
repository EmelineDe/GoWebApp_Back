import { z } from "zod";

export const answerSchema = z.object({
  id: z.number().positive().int(),
  text: z.string().min(1, "Le texte de la réponse ne peut pas être vide"),
  questionId: z.number().positive().int(),
  nextQuestionId: z.number().positive().int().optional(),
});
