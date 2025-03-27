/**
 * @fileoverview Tests du service de réponses utilisateur
 * @module tests/services/UserAnswerService.test
 */

import { UserAnswerService } from "../../services/UserAnswerService";
import { UserAnswerRepository } from "../../repositories/UserAnswerRepository";
import { UserAnswerDTO } from "../../DTO/UserAnswerDTO";

// Mock du repository
jest.mock("../../repositories/UserAnswerRepository");

/**
 * Tests du service de réponses utilisateur
 * @describe UserAnswerService
 */
describe("UserAnswerService", () => {
  beforeEach(() => {
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
      const mockAnswers: UserAnswerDTO[] = [
        { userId: 1, answerId: 1 },
        { userId: 1, answerId: 2 },
      ];

      const mockSavedAnswers = [
        { id: 1, user: { id: 1 }, answer: { id: 1 } },
        { id: 2, user: { id: 1 }, answer: { id: 2 } },
      ];

      (UserAnswerRepository.createMany as jest.Mock).mockResolvedValue(
        mockSavedAnswers
      );

      const result = await UserAnswerService.saveUserAnswers(mockAnswers);

      expect(UserAnswerRepository.createMany).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            user: { id: 1 },
            answer: { id: 1 },
          }),
          expect.objectContaining({
            user: { id: 1 },
            answer: { id: 2 },
          }),
        ])
      );
      expect(result).toEqual(mockSavedAnswers);
    });

    /**
     * Vérifie la gestion des erreurs lors de la sauvegarde des réponses
     * @test
     */
    it("should throw an error if saving answers fails", async () => {
      const mockAnswers: UserAnswerDTO[] = [{ userId: 1, answerId: 1 }];

      (UserAnswerRepository.createMany as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await expect(
        UserAnswerService.saveUserAnswers(mockAnswers)
      ).rejects.toThrow("Database error");
    });
  });
});
