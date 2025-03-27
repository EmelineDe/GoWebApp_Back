/**
 * @fileoverview Tests des routes de questions
 * @module tests/routes/QuestionRoutes.test
 */

import request from "supertest";
import app from "../../app";
import { QuestionsService } from "../../services/QuestionsService";

jest.mock("../../services/QuestionsService");

/**
 * Tests des routes de questions
 * @describe Question Routes
 */
describe("Question Routes", () => {
  const mockAnswers = [
    {
      id: 1,
      text: "Réponse A",
      question: null,
      nextQuestion: {
        id: 2,
        text: "Question suivante",
        category: "Plomberie",
        level: 2,
        answers: [],
      },
    },
    {
      id: 2,
      text: "Réponse B",
      question: null,
      nextQuestion: undefined,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Vérifie le retour de la première question d'une catégorie
   * @test
   */
  it("GET /api/questions/first/:category - should return first question of category", async () => {
    const mockQuestion = {
      id: 1,
      text: "Question test",
      category: "Plomberie",
      level: 1,
      answers: mockAnswers.map((answer) => ({
        ...answer,
        question: {
          id: 1,
          text: "Question test",
          category: "Plomberie",
          level: 1,
          answers: mockAnswers,
        },
      })),
    };

    (
      QuestionsService.getFirstQuestionByCategory as jest.Mock
    ).mockResolvedValue(mockQuestion);

    const res = await request(app).get("/api/questions/first/Plomberie");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("text");
    expect(res.body.category).toBe("Plomberie");
    expect(res.body.level).toBe(1);
    expect(res.body.answers).toHaveLength(2);
    expect(res.body.answers[0].text).toBe("Réponse A");
    expect(res.body.answers[1].text).toBe("Réponse B");
    expect(res.body.answers[0].nextQuestion).toBeDefined();
    expect(res.body.answers[1].nextQuestion).toBeUndefined();
  });

  /**
   * Vérifie le retour d'une question par ID avec ses réponses
   * @test
   */
  it("GET /api/questions/:id - should return question by id with answers", async () => {
    const mockQuestion = {
      id: 5,
      text: "Question test",
      category: "Plomberie",
      level: 2,
      answers: mockAnswers.map((answer) => ({
        ...answer,
        question: {
          id: 5,
          text: "Question test",
          category: "Plomberie",
          level: 2,
          answers: mockAnswers,
        },
      })),
    };

    (QuestionsService.getQuestionById as jest.Mock).mockResolvedValue(
      mockQuestion
    );

    const res = await request(app).get("/api/questions/5");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", 5);
    expect(res.body).toHaveProperty("text");
    expect(res.body.category).toBe("Plomberie");
    expect(res.body.level).toBe(2);
    expect(res.body.answers).toHaveLength(2);
    expect(res.body.answers[0].text).toBe("Réponse A");
    expect(res.body.answers[1].text).toBe("Réponse B");
    expect(res.body.answers[0].nextQuestion).toBeDefined();
    expect(res.body.answers[1].nextQuestion).toBeUndefined();
  });

  /**
   * Vérifie le retour 404 quand la question n'est pas trouvée
   * @test
   */
  it("GET /api/questions/:id - should return 404 when question not found", async () => {
    (QuestionsService.getQuestionById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/api/questions/999");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Question non trouvée");
  });

  /**
   * Vérifie le retour 404 quand aucune question n'est trouvée pour la catégorie
   * @test
   */
  it("GET /api/questions/first/:category - should return 404 when no question found for category", async () => {
    (
      QuestionsService.getFirstQuestionByCategory as jest.Mock
    ).mockResolvedValue(null);

    const res = await request(app).get(
      "/api/questions/first/CategorieInexistante"
    );

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Question non trouvée");
  });
});
