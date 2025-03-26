import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Question } from "./entities/Question";
import { Answer } from "./entities/Answer";
import { UserAnswer } from "./entities/UserAnswer";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "chantier_qualification",
  synchronize: true, // À désactiver en production
  logging: true,
  entities: [User, Question, Answer, UserAnswer],
  subscribers: [],
  migrations: [],
});
