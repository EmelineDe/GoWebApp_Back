/**
 * @fileoverview Tests du dépôt utilisateur
 * @module tests/repositories/UserRepository.test
 */

import { AppDataSource } from "../../config/data-source";
import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../entities/User";
import { Answer } from "../../entities/Answer";
import { Question } from "../../entities/Question";

jest.mock("../../config/data-source", () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

/**
 * Tests du dépôt UserRepository
 * @describe UserRepository
 */
describe("UserRepository", () => {
  const mockSave = jest.fn();
  const mockFindOne = jest.fn();
  const mockCreate = jest.fn();

  beforeEach(() => {
    (AppDataSource.getRepository as jest.Mock).mockReturnValue({
      save: mockSave,
      findOne: mockFindOne,
      create: mockCreate,
    });
    jest.clearAllMocks();
  });

  /**
   * Vérifie la création d’un utilisateur avec ses informations
   * @test
   */
  it("should create a user", async () => {
    const userData: Partial<User> = {
      firstName: "Alice",
      lastName: "Martin",
      address: "123 rue Paris",
      zipCode: "75000",
      phoneNumber: "0600000000",
      email: "alice@example.com",
      paymentMethod: "online",
    };

    const createdUser = { ...userData, id: 1 } as User;

    mockCreate.mockReturnValue(createdUser);
    mockSave.mockResolvedValue(createdUser);

    const result = await UserRepository.create(userData);

    expect(mockCreate).toHaveBeenCalledWith(userData);
    expect(mockSave).toHaveBeenCalledWith(createdUser);
    expect(result).toEqual(createdUser);
  });

  /**
   * Vérifie la récupération d’un utilisateur avec ses réponses et questions associées
   * @test
   */
  it("should find user with answers", async () => {
    const mockUser: User = {
      id: 1,
      firstName: "Bob",
      lastName: "Lemoine",
      address: "123 rue Test",
      zipCode: "33000",
      phoneNumber: "0612345678",
      email: "bob@example.com",
      paymentMethod: "in-person",
      answers: [
        {
          id: 1,
          user: {} as User,
          answer: {
            id: 10,
            text: "Réponse A",
            question: {
              id: 5,
              text: "Question ?",
              category: "Plomberie",
              level: 2,
              answers: [],
            } as Question,
          } as Answer,
        },
      ],
    };

    mockFindOne.mockResolvedValue(mockUser);

    const result = await UserRepository.findById(1);

    expect(mockFindOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ["answers", "answers.answer"],
    });

    expect(result).toEqual(mockUser);
  });
});
