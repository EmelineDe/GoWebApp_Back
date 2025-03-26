import { UserService } from "../../services/UserService";
import { UserRepository } from "../../repositories/UserRepository";
import { User } from "../../entities/User";
import { UserDTO } from "../../DTO/UserDTO";

// Mock du repository
jest.mock("../../repositories/UserRepository");

describe("UserService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
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

  describe("getUserWithAnswers", () => {
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

    it("should return null if user not found", async () => {
      (UserRepository.findById as jest.Mock).mockResolvedValue(null);

      const result = await UserService.getUserWithAnswers(999);

      expect(UserRepository.findById).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  });
});
