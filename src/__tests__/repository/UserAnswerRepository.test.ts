/**
 * @fileoverview Tests du repository UserAnswer
 * @module tests/repository/UserAnswerRepository.test
 */

import { AppDataSource } from "../../config/data-source";
import { UserAnswerRepository } from "../../repositories/UserAnswerRepository";
import { UserAnswer } from "../../entities/UserAnswer";
import { Answer } from "../../entities/Answer";
import { User } from "../../entities/User";

jest.mock("../../config/data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

/**
 * Tests du repository UserAnswer
 * @describe UserAnswerRepository
 */
describe("UserAnswerRepository", () => {
  const mockCreate = jest.fn();
  const mockSave = jest.fn();

  beforeEach(() => {
    (AppDataSource.getRepository as jest.Mock).mockReturnValue({
      create: mockCreate,
      save: mockSave,
    });

    jest.clearAllMocks();
  });

  /**
   * Vérifie la création et la sauvegarde de plusieurs réponses utilisateur
   * @test
   */
  it("should create and save multiple user answers", async () => {
    const userAnswersData: Partial<UserAnswer>[] = [
      {
        user: { id: 1 } as User,
        answer: { id: 10 } as Answer,
      },
      {
        user: { id: 1 } as User,
        answer: { id: 12 } as Answer,
      },
    ];

    const createdAnswers = userAnswersData.map((data, index) => ({
      id: index + 1,
      ...data,
    })) as UserAnswer[];

    mockCreate.mockReturnValue(createdAnswers);
    mockSave.mockResolvedValue(createdAnswers);

    const result = await UserAnswerRepository.createMany(userAnswersData);

    expect(mockCreate).toHaveBeenCalledWith(userAnswersData);
    expect(mockSave).toHaveBeenCalledWith(createdAnswers);
    expect(result).toEqual(createdAnswers);
  });
});
