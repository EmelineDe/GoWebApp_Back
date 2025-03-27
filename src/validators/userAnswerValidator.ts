/**
 * @fileoverview Schémas de validation pour les réponses utilisateur
 * @module validators/userAnswerValidator
 */

import { z } from "zod";

/**
 * Schéma de validation pour une réponse individuelle
 * @type {z.ZodObject}
 * @description Valide une réponse avec les règles suivantes :
 * - answerId : nombre positif
 */
export const userAnswerItemSchema = z.object({
  answerId: z.number().positive(),
});

/**
 * Schéma de validation pour le payload complet des réponses utilisateur
 * @type {z.ZodObject}
 * @description Valide l'ensemble des réponses avec les règles suivantes :
 * - userId : nombre positif
 * - answers : tableau d'au moins une réponse
 */
export const userAnswersPayloadSchema = z.object({
  userId: z.number().positive(),
  answers: z
    .array(userAnswerItemSchema)
    .min(1, "Au moins une réponse est requise"),
});
