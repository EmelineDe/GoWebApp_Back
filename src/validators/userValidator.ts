/**
 * @fileoverview Schéma de validation pour les données utilisateur
 * @module validators/userValidator
 */

import { z } from "zod";
import { userAnswerItemSchema } from "./userAnswerValidator";

/**
 * Schéma de validation pour les données utilisateur
 * @type {z.ZodObject}
 * @description Valide les données d'un utilisateur avec les règles suivantes :
 * - firstName : chaîne non vide
 * - lastName : chaîne non vide
 * - address : chaîne non vide
 * - zipCode : chaîne non vide
 * - phoneNumber : chaîne d'au moins 10 caractères
 * - email : format email valide
 * - paymentMethod : 'online' ou 'in-person'
 * - answers : tableau optionnel de réponses utilisateur
 */
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
