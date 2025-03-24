import "reflect-metadata";
import dotenv from "dotenv";
import app from "./app";
import { AppDataSource } from "./config/data-source";

dotenv.config();
console.log("✅ Mot de passe utilisé :", process.env.DB_PASSWORD);

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
