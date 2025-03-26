import { Request, Response } from "express";
import { UserController } from "../../controllers/UserController";
import { UserService } from "../../services/UserService";

jest.mock("../../services/UserService");

describe("UserController", () => {
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
    mockRequest = {};
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create user successfully", async () => {
      const userData = {
        firstName: "Jean",
        lastName: "Dupont",
        address: "12 rue des Lilas",
        zipCode: "75012",
        phoneNumber: "0601020304",
        email: "jean.dupont@email.com",
        paymentMethod: "online",
      };

      mockRequest.body = userData;
      (UserService.createUser as jest.Mock).mockResolvedValue({
        id: 1,
        ...userData,
      });

      await UserController.create(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(UserService.createUser).toHaveBeenCalledWith(userData);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({ id: 1, ...userData });
    });

    it("should handle validation errors", async () => {
      mockRequest.body = {}; // invalide

      await UserController.create(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({ errors: expect.any(Object) })
      );
    });

    it("should handle errors when creating a user", async () => {
      const userData = {
        firstName: "Jean",
        lastName: "Dupont",
        address: "12 rue des Lilas",
        zipCode: "75012",
        phoneNumber: "0601020304",
        email: "jean.dupont@email.com",
        paymentMethod: "online",
      };

      mockRequest.body = userData;
      (UserService.createUser as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await UserController.create(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Erreur serveur.",
        details: new Error("Database error"),
      });
    });
  });

  describe("getUserWithAnswers", () => {
    it("should return user with answers", async () => {
      const mockUser = {
        id: 1,
        firstName: "Jean",
        lastName: "Dupont",
        answers: [],
      };

      mockRequest.params = { id: "1" };
      (UserService.getUserWithAnswers as jest.Mock).mockResolvedValue(mockUser);

      await UserController.getUserWithAnswers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockUser);
    });

    it("should return 400 if id is invalid", async () => {
      mockRequest.params = { id: "abc" };

      await UserController.getUserWithAnswers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: "ID invalide." });
    });

    it("should return 404 if user not found", async () => {
      mockRequest.params = { id: "99" };
      (UserService.getUserWithAnswers as jest.Mock).mockResolvedValue(null);

      await UserController.getUserWithAnswers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Utilisateur non trouvé.",
      });
    });

    it("should handle errors when getting user", async () => {
      mockRequest.params = { id: "1" };
      (UserService.getUserWithAnswers as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await UserController.getUserWithAnswers(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: "Erreur serveur.",
        details: new Error("Database error"),
      });
    });
  });
});
