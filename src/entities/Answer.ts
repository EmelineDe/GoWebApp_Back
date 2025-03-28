/**
 * @fileoverview Entité représentant une réponse dans le système
 * @module entities/Answer
 */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Question } from "./Question";

/**
 * Classe représentant une réponse dans le système
 * @class Answer
 * @description Une réponse est associée à une question et peut pointer vers
 * la question suivante dans le flux de questions
 */
@Entity()
export class Answer {
  /**
   * Identifiant unique de la réponse
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  id!: number;

  /**
   * Texte de la réponse
   * @type {string}
   */
  @Column()
  text!: string;

  /**
   * Texte affiché de la réponse
   * @type {string}
   */
  @Column()
  displayText!: string;

  /**
   * Question associée à cette réponse
   * @type {Question}
   */
  @ManyToOne(() => Question, (question) => question.answers)
  question!: Question;

  /**
   * Question suivante dans le flux (optionnelle)
   * @type {Question | undefined}
   */
  @ManyToOne(() => Question, { nullable: true })
  nextQuestion?: Question;
}
