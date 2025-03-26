import { z } from "zod";
import { userAnswerItemSchema } from "./userAnswerValidator";

export const userSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  address: z.string().min(1, "L'adresse est requise"),
  zipCode: z.string().min(1, "Le code postal est requis"),
  phoneNumber: z
    .string()
    .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres"),
  email: z.string().email("L'email n'est pas valide"),
  paymentMethod: z.enum(["online", "in-person"], {
    errorMap: () => ({
      message: "Le mode de paiement doit être 'online' ou 'in-person'",
    }),
  }),
  answers: z.array(userAnswerItemSchema).optional(),
});
