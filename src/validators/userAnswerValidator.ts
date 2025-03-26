import { z } from "zod";

export const userAnswerItemSchema = z.object({
  answerId: z.number().positive(),
});

export const userAnswersPayloadSchema = z.object({
  userId: z.number().positive(),
  answers: z
    .array(userAnswerItemSchema)
    .min(1, "Au moins une réponse est requise"),
});
