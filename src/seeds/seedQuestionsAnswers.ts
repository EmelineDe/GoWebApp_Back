/**
 * @fileoverview Script d'initialisation des questions et réponses dans la base de données
 * @module seeds/seedQuestionsAnswers
 */

import { AppDataSource } from "../config/data-source";
import { Question } from "../entities/Question";
import { Answer } from "../entities/Answer";

/**
 * Initialise la base de données avec les questions et réponses par défaut
 * @async
 * @function seedQuestionsAnswers
 * @description Ce script crée une structure de questions et réponses pour le diagnostic
 * de problèmes de plomberie. Il crée :
 * - Une question initiale pour identifier le type de problème
 * - Des questions détaillées liées aux réponses précédentes
 * - Des réponses associées à chaque question
 * - Des liens entre les réponses et les questions suivantes
 *
 * La structure est organisée en niveaux :
 * - Niveau 1 : Question initiale sur la localisation du problème
 * - Niveau 2 : Questions sur la nature du problème
 * - Niveau 3 : Questions spécifiques selon les réponses précédentes
 *
 * @throws {Error} Si une erreur survient lors de l'initialisation de la base de données
 */
const seedQuestionsAnswers = async () => {
  await AppDataSource.initialize();

  const questionRepo = AppDataSource.getRepository(Question);
  const answerRepo = AppDataSource.getRepository(Answer);

  const questionsData = [
    {
      text: "Où se situe votre problème ?",
      category: "Plomberie",
      level: 1,
      answers: [
        { text: "WC" },
        { text: "Lavabo" },
        { text: "Douche" },
        { text: "Colonne générale d'immeuble" },
        { text: "Tuyauterie" },
        { text: "Chaudière" },
        { text: "Tuyau de la machine à laver / du lave-vaisselle" },
        { text: "Autre" },
      ],
    },
  ];

  for (const qData of questionsData) {
    const question = questionRepo.create({
      text: qData.text,
      category: qData.category,
      level: qData.level,
    });
    await questionRepo.save(question);

    for (const ans of qData.answers) {
      const answer = answerRepo.create({
        text: ans.text,
        question,
      });
      await answerRepo.save(answer);
    }
  }

  const detailedQuestions = [
    {
      text: "Quelle est la nature de votre problème ?",
      category: "Plomberie",
      level: 2,
      parentAnswerText: ["WC"],
      answers: [
        "Engorgement (WC bouchés)",
        "Fuite (recherche de fuite)",
        "Problème de fonctionnement (cuvette...)",
        "Changement de WC",
      ],
    },
    {
      text: "Quel type de WC possédez-vous ?",
      category: "Plomberie",
      level: 3,
      parentAnswerText: [
        "Engorgement (WC bouchés)",
        "Fuite (recherche de fuite)",
        "Problème de fonctionnement (cuvette...)",
        "Changement de WC",
      ],
      answers: ["WC simple", "WC suspendu", "Autre"],
    },
    {
      text: "Votre lavabo possède-t-il un sanispeed ?",
      category: "Plomberie",
      level: 3,
      parentAnswerText: ["Engorgement (lavabo / évier bouché)"],
      answers: ["oui", "non"],
    },
    {
      text: "D'où coule l'eau ?",
      category: "Plomberie",
      level: 3,
      parentAnswerText: [
        "Fuite / robinetterie",
        "Fuite de douche",
        "Fuite de baignoire",
      ],
      answers: [
        "Autour du robinet",
        "Directement du robinet",
        "Au niveau du siphon",
        "Au niveau des flexibles",
        "Du robinet",
        "Du tuyau d'évacuation (sous la douche)",
        "Du tuyau d'évacuation",
        "Inconnu",
      ],
    },
    {
      text: "Voulez-vous effectuer ?",
      category: "Plomberie",
      level: 3,
      parentAnswerText: ["Autre"],
      answers: [
        "Changement de lavabo / évier",
        "Installation d'un robinet",
        "Installation de bac à douche",
        "Installation de baignoire",
        "Autre problème avec la douche",
        "Autre problème avec la baignoire",
        "Réfection des joints de la douche / baignoire",
        "Autre",
      ],
    },
    {
      text: "Quel type de recherche de fuite souhaitez-vous ?",
      category: "Plomberie",
      level: 3,
      parentAnswerText: ["Je ne vois pas (recherche d'une fuite)"],
      answers: ["Recherche de fuite simple", "Recherche de fuite encastrée"],
    },
    {
      text: "Votre problème est lié ?",
      category: "Plomberie",
      level: 3,
      parentAnswerText: ["Réparation d'une panne"],
      answers: [
        "Au chauffage",
        "À l'eau chaude",
        "Au chauffage et à l'eau chaude",
      ],
    },
    {
      text: "Quel objet est concerné par votre demande ?",
      category: "Plomberie",
      level: 3,
      parentAnswerText: ["Installation"],
      answers: [
        "Chaudière",
        "Chauffe-eau / chauffe-bain",
        "Ballon d'eau chaude",
        "Radiateur électrique / sèche-serviettes",
      ],
    },
  ];

  for (const dq of detailedQuestions) {
    const question = questionRepo.create({
      text: dq.text,
      category: dq.category,
      level: dq.level,
    });
    await questionRepo.save(question);

    for (const ansText of dq.answers) {
      const answer = answerRepo.create({ text: ansText, question });
      await answerRepo.save(answer);
    }

    for (const parentText of dq.parentAnswerText) {
      const parentAnswer = await answerRepo.findOneBy({ text: parentText });
      if (parentAnswer) {
        parentAnswer.nextQuestion = question;
        await answerRepo.save(parentAnswer);
      }
    }
  }

  await AppDataSource.destroy();
};

// Exécute le script de seeding
seedQuestionsAnswers().catch(console.error);
