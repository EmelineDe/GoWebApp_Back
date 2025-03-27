/**
 * @fileoverview Tests du contrôleur de réponses
 * @module tests/controllers/AnswerController.test
 */

import { Request, Response } from "express";
import { AnswerController } from "../../controllers/AnswerController";
import { AnswersService } from "../../services/AnswersService";

jest.mock("../../services/AnswersService");

/**
 * Tests du contrôleur de réponses
 * @describe AnswerController
 */
describe("AnswerController", () => {
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
    mockRequest = {
      params: {},
    };
    jest.clearAllMocks();
  });

  /**
   * Tests de la méthode getNextQuestionFromAnswer
   * @describe getNextQuestionFromAnswer
   */
  describe("getNextQuestionFromAnswer", () => {
    /**
     * Vérifie le retour de la question suivante basée sur la réponse
     * @test
     */
    it("should return next question based on answer", async () => {
      const mockQuestion = {
        id: 2,
        text: "Question suivante",
        category: "Plomberie",
        level: 2,
        answers: [],
      };

      mockRequest.params = { id: "1" };
      (AnswersService.getAnswerWithNextQuestion as jest.Mock).mockResolvedValue(
        { nextQuestion: mockQuestion }
      );

      await AnswerController.getNextQuestionFromAnswer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(AnswersService.getAnswerWithNextQuestion).toHaveBeenCalledWith(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockQuestion);
    });

    /**
     * Vérifie le retour de 404 si aucune question suivante n'est trouvée
     * @test
     */
    it("should return 404 if no next question found", async () => {
      mockRequest.params = { id: "999" };
      (AnswersService.getAnswerWithNextQuestion as jest.Mock).mockResolvedValue(
        { nextQuestion: null }
      );

      await AnswerController.getNextQuestionFromAnswer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        message: "Pas de question suivante.",
      });
    });

    /**
     * Vérifie le retour de 404 si la réponse est null
     * @test
     */
    it("should return 404 if answer is null", async () => {
      mockRequest.params = { id: "999" };
      (AnswersService.getAnswerWithNextQuestion as jest.Mock).mockResolvedValue(
        null
      );

      await AnswerController.getNextQuestionFromAnswer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        message: "Pas de question suivante.",
      });
    });

    /**
     * Vérifie la gestion des erreurs lors de la récupération de la question suivante
     * @test
     */
    it("should handle errors when getting next question", async () => {
      mockRequest.params = { id: "1" };
      (AnswersService.getAnswerWithNextQuestion as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await AnswerController.getNextQuestionFromAnswer(
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
     * Vérifie le retour de 400 si l'ID n'est pas un nombre
     * @test
     */
    it("should return 400 if id is not a number", async () => {
      mockRequest.params = { id: "abc" };

      await AnswerController.getNextQuestionFromAnswer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: "ID invalide." });
    });
  });
});
