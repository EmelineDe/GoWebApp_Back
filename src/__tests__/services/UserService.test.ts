/**
 * @fileoverview Tests du service utilisateur
 * @module tests/services/UserService.test
 */

import { UserService } from "../../services/UserService";
import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../entities/User";
import { UserDTO } from "../../DTO/UserDTO";

// Mock du repository
jest.mock("../../repositories/UserRepository");

/**
 * Tests du service utilisateur
 * @describe UserService
 */
describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Tests de la méthode createUser
   * @describe createUser
   */
  describe("createUser", () => {
    /**
     * Vérifie la création réussie d'un utilisateur
     * @test
     */
    it("should create a user successfully", async () => {
      const mockUserData: UserDTO = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phoneNumber: "1234567890",
        address: "123 Main St",
        zipCode: "75000",
        paymentMethod: "online" as const,
      };

      const mockUser = {
        id: 1,
        ...mockUserData,
        answers: [],
      };

      (UserRepository.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await UserService.createUser(mockUserData);

      expect(UserRepository.create).toHaveBeenCalledWith(mockUserData);
      expect(result).toEqual(mockUser);
    });

    /**
     * Vérifie la gestion des erreurs lors de la création d'un utilisateur
     * @test
     */
    it("should throw an error if user creation fails", async () => {
      const mockUserData: UserDTO = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phoneNumber: "1234567890",
        address: "123 Main St",
        zipCode: "75000",
        paymentMethod: "online" as const,
      };

      (UserRepository.create as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await expect(UserService.createUser(mockUserData)).rejects.toThrow(
        "Database error"
      );
    });
  });

  /**
   * Tests de la méthode getUserWithAnswers
   * @describe getUserWithAnswers
   */
  describe("getUserWithAnswers", () => {
    /**
     * Vérifie le retour d'un utilisateur avec ses réponses s'il est trouvé
     * @test
     */
    it("should return user with answers if found", async () => {
      const mockUser = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phoneNumber: "1234567890",
        address: "123 Main St",
        zipCode: "75000",
        paymentMethod: "online",
        answers: [],
      };

      (UserRepository.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await UserService.getUserWithAnswers(1);

      expect(UserRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });

    /**
     * Vérifie le retour null quand l'utilisateur n'est pas trouvé
     * @test
     */
    it("should return null if user not found", async () => {
      (UserRepository.findById as jest.Mock).mockResolvedValue(null);

      const result = await UserService.getUserWithAnswers(999);

      expect(UserRepository.findById).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  });
});
