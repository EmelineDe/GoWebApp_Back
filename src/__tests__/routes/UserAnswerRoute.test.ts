/**
 * @fileoverview Tests des routes de réponses utilisateur
 * @module tests/routes/UserAnswerRoute.test
 */

import request from "supertest";
import app from "../../app";
import { UserAnswerService } from "../../services/UserAnswerService";

jest.mock("../../services/UserAnswerService");

/**
 * Tests des routes de réponses utilisateur
 * @describe UserAnswer Routes
 */
describe("UserAnswer Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Vérifie la sauvegarde réussie des réponses utilisateur
   * @test
   */
  it("POST /api/user-answers - should return 201 when answers are saved successfully", async () => {
    const mockAnswers = [
      { userId: 1, answerId: 1 },
      { userId: 1, answerId: 2 },
    ];

    const mockSavedAnswers = [
      { id: 1, userId: 1, answerId: 1 },
      { id: 2, userId: 1, answerId: 2 },
    ];

    (UserAnswerService.saveUserAnswers as jest.Mock).mockResolvedValue(
      mockSavedAnswers
    );

    const res = await request(app)
      .post("/api/user-answers")
      .send({ userId: 1, answers: mockAnswers });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockSavedAnswers);
    expect(UserAnswerService.saveUserAnswers).toHaveBeenCalledWith(mockAnswers);
  });

  /**
   * Vérifie la validation des données invalides
   * @test
   */
  it("POST /api/user-answers - should return 400 when request body is invalid", async () => {
    const invalidData = { notAnswers: [] };

    const res = await request(app).post("/api/user-answers").send(invalidData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveProperty("answers");
    expect(res.body.errors).toHaveProperty("userId");
  });

  /**
   * Vérifie la gestion des erreurs serveur
   * @test
   */
  it("POST /api/user-answers - should return 500 on service error", async () => {
    const mockAnswers = [{ userId: 1, answerId: 1 }];

    (UserAnswerService.saveUserAnswers as jest.Mock).mockRejectedValue(
      new Error("Erreur serveur")
    );

    const res = await request(app)
      .post("/api/user-answers")
      .send({ userId: 1, answers: mockAnswers });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: "Erreur serveur.",
      details: expect.any(Object),
    });
  });
});
