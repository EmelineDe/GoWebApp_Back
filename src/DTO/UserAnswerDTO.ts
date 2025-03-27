/**
 * @fileoverview DTO (Data Transfer Object) pour les réponses utilisateur
 * @module DTO/UserAnswerDTO
 */

/**
 * Interface représentant les données d'une réponse utilisateur
 * @interface UserAnswerDTO
 */
export interface UserAnswerDTO {
  userId: number;
  answerId: number;
}
