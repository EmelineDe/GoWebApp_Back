/**
 * @fileoverview Point d'entrée principal de l'application
 * @module server
 */

import "reflect-metadata";
import dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./config/data-source";

dotenv.config();

/**
 * Initialise la connexion à la base de données et démarre le serveur
 * @async
 * @throws {Error} Erreur de connexion à la base de données
 */
AppDataSource.initialize()
  .then(() => {
    console.log("📦 Connected to PostgreSQL");

    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
    });
  })
  .catch((error) => {
    console.error("❌ Database connection error:", error);
  });
