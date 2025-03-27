/**
 * @fileoverview Tests de l'entité Question
 * @module tests/entities/Question.test
 */

import { Question } from "../../entities/Question";
import { Answer } from "../../entities/Answer";

/**
 * Tests de l'entité Question
 * @describe Question Entity
 */
describe("Question Entity", () => {
  /**
   * Vérifie la création d'une Question valide avec toutes ses propriétés
   * @test
   */
  it("should create a valid Question", () => {
    const answers = [
      { id: 1, text: "Réponse 1" } as Answer,
      { id: 2, text: "Réponse 2" } as Answer,
    ];

    const question = new Question();
    question.id = 1;
    question.text = "Question test";
    question.category = "Plomberie";
    question.level = 1;
    question.answers = answers;

    expect(question.id).toBe(1);
    expect(question.text).toBe("Question test");
    expect(question.category).toBe("Plomberie");
    expect(question.level).toBe(1);
    expect(question.answers).toEqual(answers);
  });

  /**
   * Vérifie la gestion d'un tableau de réponses vide
   * @test
   */
  it("should handle empty answers array", () => {
    const question = new Question();
    question.id = 1;
    question.text = "Question test";
    question.category = "Plomberie";
    question.level = 1;
    question.answers = [];

    expect(question.id).toBe(1);
    expect(question.text).toBe("Question test");
    expect(question.category).toBe("Plomberie");
    expect(question.level).toBe(1);
    expect(question.answers).toEqual([]);
  });

  /**
   * Vérifie la gestion des champs requis sans les réponses
   * @test
   */
  it("should handle required fields", () => {
    const question = new Question();
    question.id = 1;
    question.text = "Question test";
    question.category = "Plomberie";
    question.level = 1;

    expect(question.id).toBe(1);
    expect(question.text).toBe("Question test");
    expect(question.category).toBe("Plomberie");
    expect(question.level).toBe(1);
    expect(question.answers).toBeUndefined();
  });

  /**
   * Vérifie la création d'une Question avec le constructeur
   * @test
   */
  it("should create Question with constructor", () => {
    const answers = [
      { id: 1, text: "Réponse 1" } as Answer,
      { id: 2, text: "Réponse 2" } as Answer,
    ];

    const question = new Question();
    Object.assign(question, {
      id: 1,
      text: "Question test",
      category: "Plomberie",
      level: 1,
      answers,
    });

    expect(question.id).toBe(1);
    expect(question.text).toBe("Question test");
    expect(question.category).toBe("Plomberie");
    expect(question.level).toBe(1);
    expect(question.answers).toEqual(answers);
  });
});
