import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Answer } from "../entities/Answer";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  text!: string;

  @Column()
  category!: string;

  @Column()
  level!: number;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers!: Answer[];
}
