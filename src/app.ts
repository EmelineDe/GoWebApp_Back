/**
 * @fileoverview Configuration principale de l'application Express
 * @module app
 */

import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import questionRoutes from "./routes/QuestionsRoutes";
import answerRoutes from "./routes/AnswerRoutes";
import userRoutes from "./routes/UserRoute";
import userAnswerRoutes from "./routes/UserAnswerRoute";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes API
app.use("/api", questionRoutes);
app.use("/api", answerRoutes);
app.use("/api", userRoutes);
app.use("/api", userAnswerRoutes);

/**
 * Route de base pour vérifier l'état du serveur
 * @route GET /
 * @returns {Object} Message de confirmation du fonctionnement du serveur
 */
app.get("/", (req, res) => {
  res.status(200).json({ message: "🚀 Backend opérationnel" });
});

export default app;
