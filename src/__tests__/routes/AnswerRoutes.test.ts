/**
 * @fileoverview Tests des routes de réponses
 * @module tests/routes/AnswerRoutes.test
 */

import request from "supertest";
import app from "../../app";
import { AnswersService } from "../../services/AnswersService";

jest.mock("../../services/AnswersService");

/**
 * Tests des routes de réponses
 * @describe Answer Routes
 */
describe("Answer Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Vérifie le retour de la question suivante
   * @test
   */
  it("GET /api/answers/:id/next - should return 200 with next question", async () => {
    const mockNextQuestion = {
      id: 2,
      text: "Question suivante",
      category: "Plomberie",
      level: 2,
      answers: [
        { id: 10, text: "Oui", nextQuestionId: 3 },
        { id: 11, text: "Non", nextQuestionId: null },
      ],
    };

    (AnswersService.getAnswerWithNextQuestion as jest.Mock).mockResolvedValue({
      nextQuestion: mockNextQuestion,
    });

    const res = await request(app).get("/api/answers/1/next");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockNextQuestion);
  });

  /**
   * Vérifie le retour 404 quand il n'y a pas de question suivante
   * @test
   */
  it("GET /api/answers/:id/next - should return 404 if no next question", async () => {
    (AnswersService.getAnswerWithNextQuestion as jest.Mock).mockResolvedValue({
      nextQuestion: null,
    });

    const res = await request(app).get("/api/answers/1/next");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ finished: true });
  });

  /**
   * Vérifie la validation d'un ID invalide
   * @test
   */
  it("GET /api/answers/:id/next - should return 400 if ID is invalid", async () => {
    const res = await request(app).get("/api/answers/invalid/next");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "ID invalide." });
  });

  /**
   * Vérifie la gestion des erreurs serveur
   * @test
   */
  it("GET /api/answers/:id/next - should return 500 on service error", async () => {
    (AnswersService.getAnswerWithNextQuestion as jest.Mock).mockRejectedValue(
      new Error("Erreur serveur")
    );

    const res = await request(app).get("/api/answers/1/next");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: "Erreur serveur.",
      details: expect.any(Object),
    });
  });
});
