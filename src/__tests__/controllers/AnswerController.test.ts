import { Request, Response } from "express";
import { AnswerController } from "../../controllers/AnswerController";
import { AnswersService } from "../../services/AnswersService";

jest.mock("../../services/AnswersService");

describe("AnswerController", () => {
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

  describe("getNextQuestionFromAnswer", () => {
    it("should return next question based on answer", async () => {
      const mockQuestion = {
        id: 2,
        text: "Question suivante",
        category: "Plomberie",
        level: 2,
        answers: [],
      };

      mockRequest.params = { id: "1" };
      (AnswersService.getAnswerWithNextQuestion as jest.Mock).mockResolvedValue(
        { nextQuestion: mockQuestion }
      );

      await AnswerController.getNextQuestionFromAnswer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(AnswersService.getAnswerWithNextQuestion).toHaveBeenCalledWith(1);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockQuestion);
    });

    it("should return 404 if no next question found", async () => {
      mockRequest.params = { id: "999" };
      (AnswersService.getAnswerWithNextQuestion as jest.Mock).mockResolvedValue(
        { nextQuestion: null }
      );

      await AnswerController.getNextQuestionFromAnswer(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        message: "Pas de question suivante.",
      });
    });

    it("should handle errors when getting next question", async () => {
      mockRequest.params = { id: "1" };
      (AnswersService.getAnswerWithNextQuestion as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      await AnswerController.getNextQuestionFromAnswer(
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
