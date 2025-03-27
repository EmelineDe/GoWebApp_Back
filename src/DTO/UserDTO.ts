/**
 * @fileoverview DTO (Data Transfer Object) pour les données utilisateur
 * @module DTO/UserDTO
 */

/**
 * Interface représentant les données d'un utilisateur
 * @interface UserDTO
 */
export interface UserDTO {
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  paymentMethod: "online" | "in-person";
}
