/**
 * @fileoverview Tests du repository Question
 * @module tests/repository/QuestionRepository.test
 */

import { AppDataSource } from "../../config/data-source";
import { QuestionRepository } from "../../repositories/QuestionsRepository";
import { Question } from "../../entities/Question";

jest.mock("../../config/data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

/**
 * Tests du repository Question
 * @describe QuestionsRepository
 */
describe("QuestionsRepository", () => {
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
   * Vérifie la recherche de la première question par catégorie et niveau
   * @test
   */
  it("should find first question by category and level", async () => {
    const mockQuestion = {
      id: 1,
      text: "Première question",
      category: "Plomberie",
      level: 1,
      answers: [],
    } as Question;

    mockFindOne.mockResolvedValue(mockQuestion);

    const result = await QuestionRepository.findFirstQuestion("Plomberie");

    expect(mockFindOne).toHaveBeenCalledWith({
      where: { category: "Plomberie", level: 1 },
      relations: ["answers"],
    });
    expect(result).toEqual(mockQuestion);
  });

  /**
   * Vérifie la recherche d'une question par ID avec ses réponses
   * @test
   */
  it("should find question by ID with answers", async () => {
    const mockQuestion = {
      id: 1,
      text: "Question 1",
      category: "Plomberie",
      level: 1,
      answers: [
        {
          id: 1,
          text: "Réponse A",
          question: {
            id: 1,
            text: "Question 1",
            category: "Plomberie",
            level: 1,
            answers: [],
          },
        },
        {
          id: 2,
          text: "Réponse B",
          question: {
            id: 1,
            text: "Question 1",
            category: "Plomberie",
            level: 1,
            answers: [],
          },
        },
      ],
    } as Question;

    mockFindOne.mockResolvedValue(mockQuestion);

    const result = await QuestionRepository.findByIdWithAnswers(1);

    expect(mockFindOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ["answers"],
    });
    expect(result).toEqual(mockQuestion);
  });

  /**
   * Vérifie la recherche de toutes les questions par catégorie
   * @test
   */
  it("should find all questions by category", async () => {
    const mockQuestions = [
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
    ] as Question[];

    mockFind.mockResolvedValue(mockQuestions);

    const result = await QuestionRepository.findAllByCategory("Plomberie");

    expect(mockFind).toHaveBeenCalledWith({
      where: { category: "Plomberie" },
      relations: ["answers"],
      order: { level: "ASC", id: "ASC" },
    });
    expect(result).toEqual(mockQuestions);
  });
});
