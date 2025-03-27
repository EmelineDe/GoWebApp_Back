/**
 * @fileoverview Entité représentant une réponse utilisateur dans le système
 * @module entities/UserAnswer
 */

import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Answer } from "./Answer";

/**
 * Classe représentant une réponse utilisateur dans le système
 * @class UserAnswer
 * @description Lie un utilisateur à une réponse spécifique, permettant de
 * suivre les réponses données par chaque utilisateur
 */
@Entity()
export class UserAnswer {
  /**
   * Identifiant unique de la réponse utilisateur
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Utilisateur associé à cette réponse
   * @type {User}
   */
  @ManyToOne(() => User, (user) => user.answers)
  user!: User;

  /**
   * Réponse donnée par l'utilisateur
   * @type {Answer}
   */
  @ManyToOne(() => Answer)
  answer!: Answer;
}
