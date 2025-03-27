/**
 * @fileoverview Tests du service de questions
 * @module tests/services/QuestionsService.test
 */

import { QuestionsService } from "../../services/QuestionsService";
import { QuestionRepository } from "../../repositories/QuestionsRepository";
import { Question } from "../../entities/Question";
import { Answer } from "../../entities/Answer";

// Mock du repository
jest.mock("../../repositories/QuestionsRepository");

/**
 * Tests du service de questions
 * @describe QuestionsService
 */
describe("QuestionsService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Tests de la méthode getFirstQuestionByCategory
   * @describe getFirstQuestionByCategory
   */
  describe("getFirstQuestionByCategory", () => {
    /**
     * Vérifie le retour de la première question pour une catégorie valide
     * @test
     */
    it("should return first question for a valid category", async () => {
      const mockQuestion: Question = {
        id: 1,
        text: "Première question",
        category: "Plomberie",
        level: 1,
        answers: [],
      };

      (QuestionRepository.findFirstQuestion as jest.Mock).mockResolvedValue(
        mockQuestion
      );

      const result = await QuestionsService.getFirstQuestionByCategory(
        "Plomberie"
      );

      expect(QuestionRepository.findFirstQuestion).toHaveBeenCalledWith(
        "Plomberie"
      );
      expect(result).toEqual(mockQuestion);
    });

    /**
     * Vérifie le retour null quand aucune question n'est trouvée pour la catégorie
     * @test
     */
    it("should return null if no question found for category", async () => {
      (QuestionRepository.findFirstQuestion as jest.Mock).mockResolvedValue(
        null
      );

      const result = await QuestionsService.getFirstQuestionByCategory(
        "InvalidCategory"
      );

      expect(QuestionRepository.findFirstQuestion).toHaveBeenCalledWith(
        "InvalidCategory"
      );
      expect(result).toBeNull();
    });

    /**
     * Vérifie la gestion des erreurs de la base de données
     * @test
     */
    it("should throw an error if database query fails", async () => {
      (QuestionRepository.findFirstQuestion as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await expect(
        QuestionsService.getFirstQuestionByCategory("Plomberie")
      ).rejects.toThrow("Database error");
    });
  });

  /**
   * Tests de la méthode getQuestionById
   * @describe getQuestionById
   */
  describe("getQuestionById", () => {
    /**
     * Vérifie le retour d'une question avec ses réponses pour un ID valide
     * @test
     */
    it("should return question with answers for a valid id", async () => {
      const mockAnswers: Answer[] = [
        {
          id: 1,
          text: "Réponse 1",
          question: {} as Question,
        },
      ];

      const mockQuestion: Question = {
        id: 1,
        text: "Question test",
        category: "Plomberie",
        level: 1,
        answers: mockAnswers,
      };

      (QuestionRepository.findByIdWithAnswers as jest.Mock).mockResolvedValue(
        mockQuestion
      );

      const result = await QuestionsService.getQuestionById(1);

      expect(QuestionRepository.findByIdWithAnswers).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockQuestion);
    });

    /**
     * Vérifie le retour null quand la question n'est pas trouvée
     * @test
     */
    it("should return null if question not found", async () => {
      (QuestionRepository.findByIdWithAnswers as jest.Mock).mockResolvedValue(
        null
      );

      const result = await QuestionsService.getQuestionById(999);

      expect(QuestionRepository.findByIdWithAnswers).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });

    /**
     * Vérifie la gestion des erreurs de la base de données
     * @test
     */
    it("should throw an error if database query fails", async () => {
      (QuestionRepository.findByIdWithAnswers as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await expect(QuestionsService.getQuestionById(1)).rejects.toThrow(
        "Database error"
      );
    });
  });

  /**
   * Tests de la méthode getAllQuestionsByCategory
   * @describe getAllQuestionsByCategory
   */
  describe("getAllQuestionsByCategory", () => {
    /**
     * Vérifie le retour de toutes les questions pour une catégorie valide
     * @test
     */
    it("should return all questions for a valid category", async () => {
      const mockQuestions: Question[] = [
        {
          id: 1,
          text: "Question 1",
          category: "Plomberie",
          level: 1,
          answers: [],
        },
        {
          id: 2,
          text: "Question 2",
          category: "Plomberie",
          level: 2,
          answers: [],
        },
      ];

      (QuestionRepository.findAllByCategory as jest.Mock).mockResolvedValue(
        mockQuestions
      );

      const result = await QuestionsService.getAllQuestionsByCategory(
        "Plomberie"
      );

      expect(QuestionRepository.findAllByCategory).toHaveBeenCalledWith(
        "Plomberie"
      );
      expect(result).toEqual(mockQuestions);
    });

    /**
     * Vérifie le retour d'un tableau vide quand aucune question n'est trouvée pour la catégorie
     * @test
     */
    it("should return empty array if no questions found for category", async () => {
      (QuestionRepository.findAllByCategory as jest.Mock).mockResolvedValue([]);

      const result = await QuestionsService.getAllQuestionsByCategory(
        "InvalidCategory"
      );

      expect(QuestionRepository.findAllByCategory).toHaveBeenCalledWith(
        "InvalidCategory"
      );
      expect(result).toEqual([]);
    });

    /**
     * Vérifie la gestion des erreurs de la base de données
     * @test
     */
    it("should throw an error if database query fails", async () => {
      (QuestionRepository.findAllByCategory as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await expect(
        QuestionsService.getAllQuestionsByCategory("Plomberie")
      ).rejects.toThrow("Database error");
    });
  });
});
