import { z } from "zod";
import { answerSchema } from "./answerValidator";

export const questionSchema = z.object({
  id: z.number(),
  text: z.string(),
  category: z.string(),
  level: z.number(),
  answers: z.array(answerSchema),
});
