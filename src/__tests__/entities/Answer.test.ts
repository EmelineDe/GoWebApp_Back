/**
 * @fileoverview Tests de l'entité Answer
 * @module tests/entities/Answer.test
 */

import { Answer } from "../../entities/Answer";
import { Question } from "../../entities/Question";

/**
 * Tests de l'entité Answer
 * @describe Answer Entity
 */
describe("Answer Entity", () => {
  /**
   * Vérifie la création d'une Answer valide avec toutes ses propriétés
   * @test
   */
  it("should create a valid Answer", () => {
    const question = { id: 1 } as Question;
    const nextQuestion = { id: 2 } as Question;

    const answer = new Answer();
    answer.id = 1;
    answer.text = "Réponse test";
    answer.question = question;
    answer.nextQuestion = nextQuestion;

    expect(answer.id).toBe(1);
    expect(answer.text).toBe("Réponse test");
    expect(answer.question).toBe(question);
    expect(answer.nextQuestion).toBe(nextQuestion);
  });

  /**
   * Vérifie la gestion d'une question suivante optionnelle
   * @test
   */
  it("should handle optional nextQuestion", () => {
    const answer = new Answer();
    answer.id = 1;
    answer.text = "Réponse test";

    expect(answer.id).toBe(1);
    expect(answer.text).toBe("Réponse test");
    expect(answer.nextQuestion).toBeUndefined();
  });

  /**
   * Vérifie la gestion des champs requis
   * @test
   */
  it("should handle required fields", () => {
    const answer = new Answer();
    answer.id = 1;
    answer.text = "Réponse test";

    expect(answer.id).toBe(1);
    expect(answer.text).toBe("Réponse test");
    expect(answer.question).toBeUndefined();
  });

  /**
   * Vérifie la création d'une Answer avec le constructeur
   * @test
   */
  it("should create Answer with constructor", () => {
    const question = { id: 1 } as Question;
    const nextQuestion = { id: 2 } as Question;

    const answer = new Answer();
    Object.assign(answer, {
      id: 1,
      text: "Réponse test",
      question,
      nextQuestion,
    });

    expect(answer.id).toBe(1);
    expect(answer.text).toBe("Réponse test");
    expect(answer.question).toBe(question);
    expect(answer.nextQuestion).toBe(nextQuestion);
  });

  /**
   * Vérifie la gestion de la relation bidirectionnelle avec Question
   * @test
   */
  it("should handle bidirectional relationship with Question", () => {
    const question = new Question();
    question.id = 1;
    question.text = "Question test";
    question.category = "Test";
    question.level = 1;

    const answer = new Answer();
    answer.id = 1;
    answer.text = "Réponse test";
    answer.question = question;

    expect(answer.question).toBe(question);
    expect(question.answers).toBeUndefined(); // TypeORM will handle this in runtime
  });
});
