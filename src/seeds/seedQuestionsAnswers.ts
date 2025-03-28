/**
 * @fileoverview Nouveau seed structurant les questions/réponses par niveau 1 > 2 > 3
 */

import { AppDataSource } from "../config/data-source";
import { Question } from "../entities/Question";
import { Answer } from "../entities/Answer";

const seedQuestionsAnswers = async () => {
  await AppDataSource.initialize();

  const questionRepo = AppDataSource.getRepository(Question);
  const answerRepo = AppDataSource.getRepository(Answer);

  const level1Question = questionRepo.create({
    text: "où se situe votre problème ?",
    category: "plomberie",
    level: 1,
  });
  await questionRepo.save(level1Question);

  const level1Answers = [
    { text: "wc", displayText: "wc" },
    { text: "lavabo", displayText: "lavabo" },
    { text: "douche", displayText: "douche" },
    {
      text: "colonne générale d'immeuble",
      displayText: "colonne générale d'immeuble",
    },
    { text: "tuyauterie", displayText: "tuyauterie" },
    { text: "chaudière", displayText: "chaudière" },
    {
      text: "tuyau de la machine à laver / du lave-vaisselle",
      displayText: "tuyau de la machine à laver / du lave-vaisselle",
    },
    { text: "autre", displayText: "autre" },
  ];

  const answerMap: Record<string, Answer> = {};

  for (const text of level1Answers) {
    const answer = answerRepo.create({
      text: text.text,
      displayText: text.displayText,
      question: level1Question,
    });
    await answerRepo.save(answer);
    answerMap[text.text.toLowerCase()] = answer;
  }

  const level2Questions = [
    {
      parent: "wc",
      text: "quelle est la nature de votre problème ?",
      answers: [
        {
          text: "engorgement (wc bouchés)",
          displayText: "engorgement (wc bouchés)",
        },
        {
          text: "fuite (recherche de fuite)",
          displayText: "fuite (recherche de fuite)",
        },
        {
          text: "problème de fonctionnement (cuvette...)",
          displayText: "problème de fonctionnement (cuvette...)",
        },
        { text: "changement de wc", displayText: "changement de wc" },
      ],
    },
    {
      parent: "lavabo",
      text: "quelle est la nature de votre problème ?",
      answers: [
        {
          text: "engorgement (lavabo / évier bouché)",
          displayText: "engorgement (lavabo / évier bouché)",
        },
        { text: "fuite / robinetterie", displayText: "fuite / robinetterie" },
        { text: "autre(lavabo)", displayText: "autre" },
      ],
    },
    {
      parent: "douche",
      text: "quelle est la nature de votre problème ?",
      answers: [
        {
          text: "engorgement de douche (bouchée)",
          displayText: "engorgement de douche (bouchée)",
        },
        {
          text: "engorgement de baignoire (bouchée)",
          displayText: "engorgement de baignoire (bouchée)",
        },
        { text: "fuite de douche", displayText: "fuite de douche" },
        { text: "fuite de baignoire", displayText: "fuite de baignoire" },
        { text: "autre(douche)", displayText: "autre" },
      ],
    },
    {
      parent: "tuyauterie",
      text: "vous avez une fuite au niveau ?",
      answers: [
        {
          text: "d'un tuyau d’évacuation (tuyau PVC)",
          displayText: "d'un tuyau d’évacuation (tuyau PVC)",
        },
        { text: "de la vanne d’entrée", displayText: "de la vanne d’entrée" },
        { text: "d'un autre tuyau", displayText: "d'un autre tuyau" },
        {
          text: "je ne vois pas (recherche d'une fuite)",
          displayText: "je ne vois pas (recherche d'une fuite)",
        },
      ],
    },
    {
      parent: "chaudière",
      text: "quel est votre besoin ?",
      answers: [
        {
          text: "réparation d'une panne",
          displayText: "réparation d'une panne",
        },
        {
          text: "souscription d'un contrat d'entretien",
          displayText: "souscription d'un contrat d'entretien",
        },
        {
          text: "réparation d'une fuite du ballon d'eau chaude",
          displayText: "réparation d'une fuite du ballon d'eau chaude",
        },
        { text: "autre(chaudière)", displayText: "autre" },
        { text: "installation", displayText: "installation" },
      ],
    },
  ];

  for (const lvl2 of level2Questions) {
    const question = questionRepo.create({
      text: lvl2.text,
      category: "plomberie",
      level: 2,
    });
    await questionRepo.save(question);

    for (const ansText of lvl2.answers) {
      const answer = answerRepo.create({
        text: ansText.text,
        displayText: ansText.displayText,
        question,
      });
      await answerRepo.save(answer);
    }

    const parent = answerMap[lvl2.parent];
    parent.nextQuestion = question;
    await answerRepo.save(parent);
  }

  const level3Questions = [
    {
      parentAnswers: [
        "engorgement (wc bouchés)",
        "fuite (recherche de fuite)",
        "problème de fonctionnement (cuvette...)",
        "changement de wc",
      ],
      text: "quel type de WC possédez-vous ?",
      answers: [
        { text: "wc simple", displayText: "wc simple" },
        { text: "wc suspendu", displayText: "wc suspendu" },
        { text: "autre", displayText: "autre" },
      ],
    },
    {
      parentAnswers: ["engorgement (lavabo / évier bouché)"],
      text: "votre lavabo possède-t-il un sanispeed ?",
      answers: [
        { text: "oui", displayText: "oui" },
        { text: "non", displayText: "non" },
      ],
    },
    {
      parentAnswers: ["fuite / robinetterie"],
      text: "d'où coule l'eau ?",
      answers: [
        { text: "autour du robinet", displayText: "autour du robinet" },
        {
          text: "directement du robinet",
          displayText: "directement du robinet",
        },
        { text: "au niveau du siphon", displayText: "au niveau du siphon" },
        {
          text: "au niveau des flexibles",
          displayText: "au niveau des flexibles",
        },
      ],
    },
    {
      parentAnswers: ["autre(lavabo)"],
      text: "voulez-vous effectuer ?",
      answers: [
        {
          text: "changement de lavabo / évier",
          displayText: "changement de lavabo / évier",
        },
        {
          text: "installation d'un robinet",
          displayText: "installation d'un robinet",
        },
        { text: "autre", displayText: "autre" },
      ],
    },
    {
      parentAnswers: ["fuite de douche"],
      text: "d'où coule l'eau ?",
      answers: [
        { text: "du robinet", displayText: "du robinet" },
        {
          text: "du tuyau d'évacuation (sous la douche)",
          displayText: "du tuyau d'évacuation (sous la douche)",
        },
        { text: "inconnu", displayText: "inconnu" },
      ],
    },
    {
      parentAnswers: ["fuite de baignoire"],
      text: "d'où coule l'eau ?",
      answers: [
        { text: "du robinet", displayText: "du robinet" },
        { text: "du tuyau d'évacuation", displayText: "du tuyau d'évacuation" },
        { text: "inconnu", displayText: "inconnu" },
      ],
    },
    {
      parentAnswers: ["autre(douche)"],
      text: "voulez-vous effectuer ?",
      answers: [
        {
          text: "installation de bac à douche",
          displayText: "installation de bac à douche",
        },
        {
          text: "installation de baignoire",
          displayText: "installation de baignoire",
        },
        {
          text: "autre problème avec la douche",
          displayText: "autre problème avec la douche",
        },
        {
          text: "autre problème avec la baignoire",
          displayText: "autre problème avec la baignoire",
        },
        {
          text: "réfection des joints de la douche / baignoire",
          displayText: "réfection des joints de la douche / baignoire",
        },
      ],
    },
    {
      parentAnswers: ["je ne vois pas (recherche d'une fuite)"],
      text: "quel type de recherche de fuite souhaitez-vous ?",
      answers: [
        {
          text: "recherche de fuite simple",
          displayText: "recherche de fuite simple",
        },
        {
          text: "recherche de fuite encastrée",
          displayText: "recherche de fuite encastrée",
        },
      ],
    },
    {
      parentAnswers: ["réparation d'une panne"],
      text: "votre problème est lié ?",
      answers: [
        { text: "au chauffage", displayText: "au chauffage" },
        { text: "à l'eau chaude", displayText: "à l'eau chaude" },
        {
          text: "au chauffage et à l'eau chaude",
          displayText: "au chauffage et à l'eau chaude",
        },
      ],
    },
    {
      parentAnswers: ["installation"],
      text: "quel objet est concerné par votre demande ?",
      answers: [
        { text: "chaudière", displayText: "chaudière" },
        {
          text: "chauffe-eau / chauffe-bain",
          displayText: "chauffe-eau / chauffe-bain",
        },
        { text: "ballon d'eau chaude", displayText: "ballon d'eau chaude" },
        {
          text: "radiateur électrique / sèche-serviettes",
          displayText: "radiateur électrique / sèche-serviettes",
        },
      ],
    },
  ];

  for (const lvl3 of level3Questions) {
    const question = questionRepo.create({
      text: lvl3.text,
      category: "plomberie",
      level: 3,
    });
    await questionRepo.save(question);

    for (const ansText of lvl3.answers) {
      const answer = answerRepo.create({
        text: ansText.text,
        displayText: ansText.displayText,
        question,
      });
      await answerRepo.save(answer);
    }

    for (const parentText of lvl3.parentAnswers) {
      const parent = await answerRepo.findOneBy({
        text: parentText.toLowerCase(),
      });
      if (parent) {
        parent.nextQuestion = question;
        await answerRepo.save(parent);
      }
    }
  }
  await AppDataSource.destroy();
};

seedQuestionsAnswers().catch(console.error);
