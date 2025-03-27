/**
 * @fileoverview Entité représentant une question dans le système
 * @module entities/Question
 */

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Answer } from "../entities/Answer";

/**
 * Classe représentant une question dans le système
 * @class Question
 * @description Une question est caractérisée par son texte, sa catégorie, son niveau de difficulté
 * et peut avoir plusieurs réponses associées
 */
@Entity()
export class Question {
  /**
   * Identifiant unique de la question
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Texte de la question
   * @type {string}
   */
  @Column()
  text!: string;

  /**
   * Catégorie de la question (ex: "Histoire", "Géographie", etc.)
   * @type {string}
   */
  @Column()
  category!: string;

  /**
   * Niveau de difficulté de la question (1-5)
   * @type {number}
   */
  @Column()
  level!: number;

  /**
   * Liste des réponses associées à la question
   * @type {Answer[]}
   */
  @OneToMany(() => Answer, (answer) => answer.question)
  answers!: Answer[];
}
