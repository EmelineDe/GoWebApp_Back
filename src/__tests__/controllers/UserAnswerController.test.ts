/**
 * @fileoverview Tests du contrôleur de réponses utilisateur
 * @module tests/controllers/UserAnswerController.test
 */

import { Request, Response } from "express";
import { UserAnswerController } from "../../controllers/UserAnswerController";
import { UserAnswerService } from "../../services/UserAnswerService";

jest.mock("../../services/UserAnswerService");

/**
 * Tests du contrôleur de réponses utilisateur
 * @describe UserAnswerController
 */
describe("UserAnswerController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
    mockRequest = {};
    jest.clearAllMocks();
  });

  /**
   * Tests de la méthode saveUserAnswers
   * @describe saveUserAnswers
   */
  describe("saveUserAnswers", () => {
    /**
     * Vérifie la sauvegarde réussie des réponses utilisateur
     * @test
     */
    it("should save user answers successfully", async () => {
      const mockAnswers = [
        { userId: 1, answerId: 1 },
        { userId: 1, answerId: 2 },
      ];

      mockRequest.body = {
        userId: 1,
        answers: [{ answerId: 1 }, { answerId: 2 }],
      };

      (UserAnswerService.saveUserAnswers as jest.Mock).mockResolvedValue(
        mockAnswers
      );

      await UserAnswerController.saveUserAnswers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(UserAnswerService.saveUserAnswers).toHaveBeenCalledWith(
        mockAnswers
      );
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(mockAnswers);
    });

    /**
     * Vérifie la gestion des erreurs lors de la sauvegarde des réponses
     * @test
     */
    it("should handle errors when saving answers", async () => {
      mockRequest.body = {
        userId: 1,
        answers: [{ answerId: 1 }, { answerId: 2 }],
      };

      (UserAnswerService.saveUserAnswers as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await UserAnswerController.saveUserAnswers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Erreur serveur.",
        details: new Error("Database error"),
      });
    });

    /**
     * Vérifie que 400 est retourné si les données sont invalides
     * @test
     */
    it("should return 400 if data is invalid", async () => {
      mockRequest.body = {};

      await UserAnswerController.saveUserAnswers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({ errors: expect.any(Object) })
      );
    });
  });
});
