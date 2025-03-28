/**
 * @fileoverview Tests du repository Answer
 * @module tests/repository/AnswerRepository.test
 */

import { AppDataSource } from "../../config/data-source";
import { AnswersRepository } from "../../repositories/AnswersRepository";
import { Answer } from "../../entities/Answer";

jest.mock("../../config/data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn().mockReturnValue({
      findOne: jest.fn(),
      find: jest.fn(),
    }),
  },
}));

/**
 * Tests du repository Answer
 * @describe AnswersRepository
 */
describe("AnswersRepository", () => {
  const mockFindOne = jest.fn();
  const mockFind = jest.fn();

  beforeEach(() => {
    (AppDataSource.getRepository as jest.Mock).mockReturnValue({
      findOne: mockFindOne,
      find: mockFind,
    });
    jest.clearAllMocks();
  });

  /**
   * Vérifie la recherche d'une réponse par ID avec sa question suivante
   * @test
   */
  it("should find answer by id with next question", async () => {
    const mockAnswer = { id: 1, text: "Réponse", nextQuestion: {} } as Answer;
    mockFindOne.mockResolvedValue(mockAnswer);

    const result = await AnswersRepository.findByIdWithNextQuestion(1);
    expect(mockFindOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: {
        nextQuestion: {
          answers: true,
        },
      },
    });
    expect(result).toEqual(mockAnswer);
  });

  /**
   * Vérifie la recherche des réponses par ID de question
   * @test
   */
  it("should find answers by questionId", async () => {
    const mockAnswers = [
      { id: 1, text: "Réponse 1" },
      { id: 2, text: "Réponse 2" },
    ] as Answer[];
    mockFind.mockResolvedValue(mockAnswers);

    const result = await AnswersRepository.findByQuestionId(1);
    expect(mockFind).toHaveBeenCalledWith({
      where: { question: { id: 1 } },
      relations: ["nextQuestion"],
      order: { id: "ASC" },
    });
    expect(result).toEqual(mockAnswers);
  });
});
