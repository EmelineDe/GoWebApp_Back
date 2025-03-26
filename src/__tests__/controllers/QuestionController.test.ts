import { Request, Response } from "express";
import { QuestionController } from "../../controllers/QuestionController";
import { QuestionsService } from "../../services/QuestionsService";

jest.mock("../../services/QuestionsService");

describe("QuestionController", () => {
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
    mockRequest = {
      params: {},
    };
    jest.clearAllMocks();
  });

  describe("getFirstQuestion", () => {
    it("should return first question of a category", async () => {
      const mockQuestion = {
        id: 1,
        text: "Question 1",
        category: "Plomberie",
        level: 1,
        answers: [],
      };
      mockRequest.params = { category: "Plomberie" };

      (
        QuestionsService.getFirstQuestionByCategory as jest.Mock
      ).mockResolvedValue(mockQuestion);

      await QuestionController.getFirstQuestion(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockQuestion);
    });

    it("should return 404 if question not found", async () => {
      mockRequest.params = { category: "Inconnue" };
      (
        QuestionsService.getFirstQuestionByCategory as jest.Mock
      ).mockResolvedValue(null);

      await QuestionController.getFirstQuestion(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        message: "Question non trouvée",
      });
    });
  });

  describe("getQuestionById", () => {
    it("should return question by ID", async () => {
      const mockQuestion = {
        id: 1,
        text: "Question 1",
        category: "Plomberie",
        level: 1,
        answers: [],
      };
      mockRequest.params = { id: "1" };

      (QuestionsService.getQuestionById as jest.Mock).mockResolvedValue(
        mockQuestion
      );

      await QuestionController.getQuestionById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockQuestion);
    });

    it("should return 404 if question not found", async () => {
      mockRequest.params = { id: "999" };
      (QuestionsService.getQuestionById as jest.Mock).mockResolvedValue(null);

      await QuestionController.getQuestionById(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        message: "Question non trouvée",
      });
    });
  });
});
