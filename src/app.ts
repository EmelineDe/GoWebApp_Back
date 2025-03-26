import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import questionRoutes from "./routes/QuestionsRoutes";
import answerRoutes from "./routes/AnswerRoutes";
import userRoutes from "./routes/UserRoute";
import userAnswerRoutes from "./routes/UserAnswerRoute";

const app = express();

app.use(express.json());

// Documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes API
app.use("/api", questionRoutes);
app.use("/api", answerRoutes);
app.use("/api", userRoutes);
app.use("/api", userAnswerRoutes);

// Route de test
app.get("/", (req, res) => {
  res.status(200).json({ message: "🚀 Backend opérationnel" });
});

export default app;
