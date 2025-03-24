import request from "supertest";
import app from "../app";

describe("GET /", () => {
  it("should return the backend operational message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("🚀 Backend opérationnel");
  });
});
