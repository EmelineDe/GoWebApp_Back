import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(express.json());

// Route Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route de test
app.get("/", (req, res) => {
  res.status(200).json({ message: "🚀 Backend opérationnel" });
});

export default app;
