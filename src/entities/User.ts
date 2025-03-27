/**
 * @fileoverview Entité représentant un utilisateur dans le système
 * @module entities/User
 */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserAnswer } from "../entities/UserAnswer";

/**
 * Classe représentant un utilisateur dans le système
 * @class User
 * @description Un utilisateur est caractérisé par ses informations personnelles
 * et peut avoir plusieurs réponses associées
 */
@Entity()
export class User {
  /**
   * Identifiant unique de l'utilisateur
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Prénom de l'utilisateur
   * @type {string}
   */
  @Column()
  firstName!: string;

  /**
   * Nom de l'utilisateur
   * @type {string}
   */
  @Column()
  lastName!: string;

  /**
   * Adresse de l'utilisateur
   * @type {string}
   */
  @Column()
  address!: string;

  /**
   * Code postal de l'utilisateur
   * @type {string}
   */
  @Column()
  zipCode!: string;

  /**
   * Numéro de téléphone de l'utilisateur
   * @type {string}
   */
  @Column()
  phoneNumber!: string;

  /**
   * Adresse email de l'utilisateur
   * @type {string}
   */
  @Column()
  email!: string;

  /**
   * Méthode de paiement de l'utilisateur
   * @type {string}
   */
  @Column()
  paymentMethod!: string;

  /**
   * Liste des réponses de l'utilisateur
   * @type {UserAnswer[]}
   */
  @OneToMany(() => UserAnswer, (answer) => answer.user)
  answers!: UserAnswer[];
}
