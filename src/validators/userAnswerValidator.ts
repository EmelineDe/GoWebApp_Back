import { z } from "zod";

export const userAnswerSchema = z.object({
  id: z.number().positive().int(),
  userId: z.number().positive().int(),
  answerId: z.number().positive().int(),
});
