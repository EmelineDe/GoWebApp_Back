/**
 * @fileoverview Tests de l'entité UserAnswer
 * @module tests/entities/UserAnswer.test
 */

import { UserAnswer } from "../../entities/UserAnswer";
import { User } from "../../entities/User";
import { Answer } from "../../entities/Answer";

/**
 * Tests de l'entité UserAnswer
 * @describe UserAnswer Entity
 */
describe("UserAnswer Entity", () => {
  /**
   * Vérifie la création d'un UserAnswer valide
   * @test
   */
  it("should create a valid UserAnswer", () => {
    const user = { id: 1 } as User;
    const answer = { id: 1 } as Answer;

    const userAnswer = new UserAnswer();
    userAnswer.id = 1;
    userAnswer.user = user;
    userAnswer.answer = answer;

    expect(userAnswer.id).toBe(1);
    expect(userAnswer.user).toBe(user);
    expect(userAnswer.answer).toBe(answer);
  });

  /**
   * Vérifie la gestion des champs optionnels
   * @test
   */
  it("should handle optional fields", () => {
    const userAnswer = new UserAnswer();
    userAnswer.id = 1;

    expect(userAnswer.id).toBe(1);
    expect(userAnswer.user).toBeUndefined();
    expect(userAnswer.answer).toBeUndefined();
  });

  /**
   * Vérifie la création d'un UserAnswer avec le constructeur
   * @test
   */
  it("should create UserAnswer with constructor", () => {
    const user = { id: 1 } as User;
    const answer = { id: 1 } as Answer;

    const userAnswer = new UserAnswer();
    Object.assign(userAnswer, {
      id: 1,
      user,
      answer,
    });

    expect(userAnswer.id).toBe(1);
    expect(userAnswer.user).toBe(user);
    expect(userAnswer.answer).toBe(answer);
  });
});
