import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserAnswer } from "../entities/UserAnswer";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  address!: string;

  @Column()
  zipCode!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  email!: string;

  @Column()
  paymentMethod!: string;

  @OneToMany(() => UserAnswer, (answer) => answer.user)
  answers!: UserAnswer[];
}
