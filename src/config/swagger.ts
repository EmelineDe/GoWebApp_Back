import swaggerJSDoc from "swagger-jsdoc";

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

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
