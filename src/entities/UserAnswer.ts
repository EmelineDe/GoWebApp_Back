import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Answer } from "./Answer";

@Entity()
export class UserAnswer {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.answers)
  user!: User;

  @ManyToOne(() => Answer)
  answer!: Answer;
}
