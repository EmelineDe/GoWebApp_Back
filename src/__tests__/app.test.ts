/**
 * @fileoverview Tests de l'application principale
 * @module tests/app.test
 */

import request from "supertest";
import app from "../app";

/**
 * Tests de la route principale de l'application
 * @describe GET /
 */
describe("GET /", () => {
  /**
   * Vérifie que la route principale renvoie le message de fonctionnement
   * @test
   */
  it("should return the backend operational message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("🚀 Backend opérationnel");
  });
});
