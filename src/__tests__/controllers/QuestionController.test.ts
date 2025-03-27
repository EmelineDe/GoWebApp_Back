/**
 * @fileoverview Tests du contrôleur de questions
 * @module tests/controllers/QuestionController.test
 */

import { Request, Response } from "express";
import { QuestionController } from "../../controllers/QuestionController";
import { QuestionsService } from "../../services/QuestionsService";

jest.mock("../../services/QuestionsService");

/**
 * Tests du contrôleur de questions
 * @describe QuestionController
 */
describe("QuestionController", () => {
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
   * Tests de la méthode getFirstQuestion
   * @describe getFirstQuestion
   */
  describe("getFirstQuestion", () => {
    /**
     * Vérifie le retour de la première question d'une catégorie
     * @test
     */
    it("should return first question of a category", async () => {
      const mockQuestion = {
        id: 1,
        text: "Question 1",
        category: "Plomberie",
        level: 1,
        answers: [],
      };
      mockRequest.params = { category: "Plomberie" };

      (
        QuestionsService.getFirstQuestionByCategory as jest.Mock
      ).mockResolvedValue(mockQuestion);

      await QuestionController.getFirstQuestion(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockQuestion);
    });

    /**
     * Vérifie le retour de 404 si la question n'est pas trouvée
     * @test
     */
    it("should return 404 if question not found", async () => {
      mockRequest.params = { category: "Inconnue" };
      (
        QuestionsService.getFirstQuestionByCategory as jest.Mock
      ).mockResolvedValue(null);

      await QuestionController.getFirstQuestion(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        message: "Question non trouvée",
      });
    });
  });

  /**
   * Tests de la méthode getQuestionById
   * @describe getQuestionById
   */
  describe("getQuestionById", () => {
    /**
     * Vérifie le retour d'une question par son ID
     * @test
     */
    it("should return question by ID", async () => {
      const mockQuestion = {
        id: 1,
        text: "Question 1",
        category: "Plomberie",
        level: 1,
        answers: [],
      };
      mockRequest.params = { id: "1" };

      (QuestionsService.getQuestionById as jest.Mock).mockResolvedValue(
        mockQuestion
      );

      await QuestionController.getQuestionById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockQuestion);
    });

    /**
     * Vérifie le retour de 404 si la question n'est pas trouvée
     * @test
     */
    it("should return 404 if question not found", async () => {
      mockRequest.params = { id: "999" };
      (QuestionsService.getQuestionById as jest.Mock).mockResolvedValue(null);

      await QuestionController.getQuestionById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        message: "Question non trouvée",
      });
    });

    /**
     * Vérifie la gestion des erreurs pour getFirstQuestion
     * @test
     */
    it("should handle error on getFirstQuestion", async () => {
      mockRequest.params = { category: "Plomberie" };
      (
        QuestionsService.getFirstQuestionByCategory as jest.Mock
      ).mockRejectedValue(new Error("Erreur DB"));

      await QuestionController.getFirstQuestion(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ message: "Erreur serveur" });
    });

    /**
     * Vérifie la gestion des erreurs pour getQuestionById
     * @test
     */
    it("should handle error on getQuestionById", async () => {
      mockRequest.params = { id: "1" };
      (QuestionsService.getQuestionById as jest.Mock).mockRejectedValue(
        new Error("Erreur DB")
      );

      await QuestionController.getQuestionById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ message: "Erreur serveur" });
    });
  });
});
