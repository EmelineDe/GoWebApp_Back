/**
 * @fileoverview Configuration de la connexion à la base de données PostgreSQL
 * @module data-source
 */

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Question } from "../entities/Question";
import { Answer } from "../entities/Answer";
import { UserAnswer } from "../entities/UserAnswer";

/**
 * Configuration de la source de données PostgreSQL
 * @type {DataSource}
 * @description Configure la connexion à la base de données avec les paramètres
 * d'environnement ou les valeurs par défaut. Cette configuration permet de :
 * - Se connecter à une base de données PostgreSQL
 * - Gérer les entités User, Question, Answer et UserAnswer
 * - Activer la synchronisation automatique du schéma
 * - Activer les logs de requêtes SQL
 *
 * @property {string} type - Type de base de données (postgres)
 * @property {string} host - Hôte de la base de données
 * @property {number} port - Port de la base de données
 * @property {string} username - Nom d'utilisateur
 * @property {string} password - Mot de passe
 * @property {string} database - Nom de la base de données
 * @property {boolean} synchronize - Active la synchronisation automatique du schéma
 * @property {boolean} logging - Active les logs de requêtes SQL
 * @property {Array} entities - Liste des entités à gérer
 * @property {Array} subscribers - Liste des souscripteurs d'événements
 * @property {Array} migrations - Liste des migrations
 */
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "chantier_qualification",
  synchronize: true,
  logging: true,
  entities: [User, Question, Answer, UserAnswer],
  subscribers: [],
  migrations: [],
});
