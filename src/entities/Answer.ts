import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Question } from "./Question";

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @ManyToOne(() => Question, (question) => question.answers)
  question!: Question;

  @ManyToOne(() => Question, { nullable: true })
  nextQuestion?: Question;
}
