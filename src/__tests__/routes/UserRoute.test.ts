/**
 * @fileoverview Tests des routes utilisateur
 * @module tests/routes/UserRoute.test
 */

import request from "supertest";
import app from "../../app";
import { UserService } from "../../services/UserService";

jest.mock("../../services/UserService");

/**
 * Tests des routes utilisateur
 * @describe User Routes
 */
describe("User Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Vérifie la création réussie d'un utilisateur
   * @test
   */
  it("POST /api/user - should return 201 when user is created successfully", async () => {
    const mockUserData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phoneNumber: "0612345678",
      address: "123 rue Test",
      zipCode: "75000",
      paymentMethod: "online",
    };

    const mockCreatedUser = {
      id: 1,
      ...mockUserData,
    };

    (UserService.createUser as jest.Mock).mockResolvedValue(mockCreatedUser);

    const res = await request(app).post("/api/user").send(mockUserData);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockCreatedUser);
    expect(UserService.createUser).toHaveBeenCalledWith(mockUserData);
  });

  /**
   * Vérifie la validation des données invalides
   * @test
   */
  it("POST /api/user - should return 400 when request body is invalid", async () => {
    const invalidData = {
      firstName: "John",
      // lastName manquant
      email: "invalid-email",
    };

    const res = await request(app).post("/api/user").send(invalidData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveProperty("lastName");
    expect(res.body.errors).toHaveProperty("email");
  });

  /**
   * Vérifie la gestion des erreurs serveur
   * @test
   */
  it("POST /api/user - should return 500 on service error", async () => {
    const mockUserData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phoneNumber: "0612345678",
      address: "123 rue Test",
      zipCode: "75000",
      paymentMethod: "online",
    };

    (UserService.createUser as jest.Mock).mockRejectedValue(
      new Error("Erreur serveur")
    );

    const res = await request(app).post("/api/user").send(mockUserData);

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: "Erreur serveur.",
      details: expect.any(Object),
    });
  });

  /**
   * Vérifie la récupération d'un utilisateur avec ses réponses
   * @test
   */
  it("GET /api/user/:id - should return 200 with user and answers", async () => {
    const mockUser = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      answers: [
        {
          id: 1,
          answer: {
            id: 1,
            text: "Réponse A",
            question: {
              id: 1,
              text: "Question 1",
            },
          },
        },
      ],
    };

    (UserService.getUserWithAnswers as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).get("/api/user/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUser);
    expect(UserService.getUserWithAnswers).toHaveBeenCalledWith(1);
  });

  /**
   * Vérifie le retour 404 quand l'utilisateur n'est pas trouvé
   * @test
   */
  it("GET /api/user/:id - should return 404 when user not found", async () => {
    (UserService.getUserWithAnswers as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/api/user/999");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Utilisateur non trouvé." });
  });

  /**
   * Vérifie la validation d'un ID invalide
   * @test
   */
  it("GET /api/user/:id - should return 400 when ID is invalid", async () => {
    const res = await request(app).get("/api/user/invalid");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "ID invalide." });
  });

  /**
   * Vérifie la gestion des erreurs serveur pour la récupération d'un utilisateur
   * @test
   */
  it("GET /api/user/:id - should return 500 on service error", async () => {
    (UserService.getUserWithAnswers as jest.Mock).mockRejectedValue(
      new Error("Erreur serveur")
    );

    const res = await request(app).get("/api/user/1");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: "Erreur serveur.",
      details: expect.any(Object),
    });
  });
});
