/**
 * @fileoverview Configuration de la documentation Swagger pour l'API
 * @module config/swagger
 */

import swaggerJSDoc from "swagger-jsdoc";

/**
 * Options de configuration pour Swagger
 * @type {swaggerJSDoc.Options}
 * @description Configure la documentation de l'API avec les paramètres suivants :
 * - Version OpenAPI : 3.0.0
 * - Titre : API Goweb
 * - Version : 1.0.0
 * - Serveur : http://localhost:3000
 * - Fichiers de documentation : ./src/docs/*.yaml
 */
export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Goweb",
      version: "1.0.0",
      description:
        "Documentation de l'API du formulaire de qualification de chantier",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/docs/*.yaml"],
};

/**
 * Spécification Swagger générée
 * @type {Object}
 */
export const swaggerSpec = swaggerJSDoc(swaggerOptions);
