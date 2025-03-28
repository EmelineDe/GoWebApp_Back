/**
 * @fileoverview Tests du service de réponses
 * @module tests/services/AnswerService.test
 */

import { AnswersService } from "../../services/AnswersService";
import { AnswersRepository } from "../../repositories/AnswersRepository";
import { Answer } from "../../entities/Answer";
import { Question } from "../../entities/Question";

// Mock du repository
jest.mock("../../repositories/AnswersRepository");

/**
 * Tests du service de réponses
 * @describe AnswersService
 */
describe("AnswersService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Tests de la méthode getAnswerWithNextQuestion
   * @describe getAnswerWithNextQuestion
   */
  describe("getAnswerWithNextQuestion", () => {
    /**
     * Vérifie le retour d'une réponse avec sa question suivante
     * @test
     */
    it("devrait retourner une réponse avec la question suivante", async () => {
      const mockAnswer = {
        id: 1,
        text: "Réponse",
        displayText: "Réponse",
        questionId: 1,
        nextQuestion: {
          id: 2,
          text: "Question suivante",
          category: "Plomberie",
          level: 2,
          answers: [],
        },
      } as unknown as Answer;

      (
        AnswersRepository.findByIdWithNextQuestion as jest.Mock
      ).mockResolvedValue(mockAnswer);

      const result = await AnswersService.getAnswerWithNextQuestion(1);

      expect(AnswersRepository.findByIdWithNextQuestion).toHaveBeenCalledWith(
        1
      );
      expect(result).toEqual(mockAnswer);
    });

    /**
     * Vérifie le retour null quand aucune réponse n'est trouvée
     * @test
     */
    it("devrait retourner null si aucune réponse trouvée", async () => {
      (
        AnswersRepository.findByIdWithNextQuestion as jest.Mock
      ).mockResolvedValue(null);

      const result = await AnswersService.getAnswerWithNextQuestion(999);

      expect(result).toBeNull();
    });

    /**
     * Vérifie la gestion des erreurs du repository
     * @test
     */
    it("devrait gérer les erreurs du repository", async () => {
      (
        AnswersRepository.findByIdWithNextQuestion as jest.Mock
      ).mockRejectedValue(new Error("Erreur BDD"));

      await expect(AnswersService.getAnswerWithNextQuestion(1)).rejects.toThrow(
        "Erreur BDD"
      );
    });
  });

  /**
   * Tests de la méthode getAnswersByQuestionId
   * @describe getAnswersByQuestionId
   */
  describe("getAnswersByQuestionId", () => {
    /**
     * Vérifie le retour des réponses associées à une question
     * @test
     */
    it("devrait retourner les réponses associées à une question", async () => {
      const mockAnswers = [
        { id: 1, text: "Réponse 1", question: {} as Question },
        { id: 2, text: "Réponse 2", question: {} as Question },
      ] as Answer[];

      (AnswersRepository.findByQuestionId as jest.Mock).mockResolvedValue(
        mockAnswers
      );

      const result = await AnswersService.getAnswersByQuestionId(1);

      expect(AnswersRepository.findByQuestionId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockAnswers);
    });

    /**
     * Vérifie la gestion des erreurs du repository
     * @test
     */
    it("devrait gérer les erreurs du repository", async () => {
      (AnswersRepository.findByQuestionId as jest.Mock).mockRejectedValue(
        new Error("Erreur BDD")
      );

      await expect(AnswersService.getAnswersByQuestionId(1)).rejects.toThrow(
        "Erreur BDD"
      );
    });
  });
});
