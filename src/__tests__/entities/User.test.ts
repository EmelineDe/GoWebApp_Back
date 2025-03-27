/**
 * @fileoverview Tests de l'entité User
 * @module tests/entities/User.test
 */

import { User } from "../../entities/User";
import { UserAnswer } from "../../entities/UserAnswer";

/**
 * Tests de l'entité User
 * @describe User Entity
 */
describe("User Entity", () => {
  /**
   * Vérifie la création d'un User valide avec toutes ses propriétés
   * @test
   */
  it("should create a valid User", () => {
    const answers = [{ id: 1 } as UserAnswer, { id: 2 } as UserAnswer];

    const user = new User();
    user.id = 1;
    user.firstName = "John";
    user.lastName = "Doe";
    user.email = "john@example.com";
    user.phoneNumber = "0612345678";
    user.address = "123 rue Test";
    user.zipCode = "75000";
    user.paymentMethod = "online";
    user.answers = answers;

    expect(user.id).toBe(1);
    expect(user.firstName).toBe("John");
    expect(user.lastName).toBe("Doe");
    expect(user.email).toBe("john@example.com");
    expect(user.phoneNumber).toBe("0612345678");
    expect(user.address).toBe("123 rue Test");
    expect(user.zipCode).toBe("75000");
    expect(user.paymentMethod).toBe("online");
    expect(user.answers).toEqual(answers);
  });

  /**
   * Vérifie la gestion d'un tableau de réponses vide
   * @test
   */
  it("should handle empty answers array", () => {
    const user = new User();
    user.id = 1;
    user.firstName = "John";
    user.lastName = "Doe";
    user.email = "john@example.com";
    user.phoneNumber = "0612345678";
    user.address = "123 rue Test";
    user.zipCode = "75000";
    user.paymentMethod = "online";
    user.answers = [];

    expect(user.id).toBe(1);
    expect(user.firstName).toBe("John");
    expect(user.lastName).toBe("Doe");
    expect(user.email).toBe("john@example.com");
    expect(user.phoneNumber).toBe("0612345678");
    expect(user.address).toBe("123 rue Test");
    expect(user.zipCode).toBe("75000");
    expect(user.paymentMethod).toBe("online");
    expect(user.answers).toEqual([]);
  });

  /**
   * Vérifie la gestion des champs requis sans les réponses
   * @test
   */
  it("should handle required fields", () => {
    const user = new User();
    user.id = 1;
    user.firstName = "John";
    user.lastName = "Doe";
    user.email = "john@example.com";
    user.phoneNumber = "0612345678";
    user.address = "123 rue Test";
    user.zipCode = "75000";
    user.paymentMethod = "online";

    expect(user.id).toBe(1);
    expect(user.firstName).toBe("John");
    expect(user.lastName).toBe("Doe");
    expect(user.email).toBe("john@example.com");
    expect(user.phoneNumber).toBe("0612345678");
    expect(user.address).toBe("123 rue Test");
    expect(user.zipCode).toBe("75000");
    expect(user.paymentMethod).toBe("online");
    expect(user.answers).toBeUndefined();
  });
});
