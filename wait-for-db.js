/**
 * @fileoverview Script d'attente de la disponibilité de la base de données PostgreSQL
 * @module wait-for-db
 */

const waitPort = require("wait-port");

/**
 * Configuration de la connexion à la base de données
 * @type {Object}
 */
const host = process.env.DB_HOST || "postgres";
const port = parseInt(process.env.DB_PORT || "5432", 10);

/**
 * Attend que la base de données PostgreSQL soit disponible avant de démarrer l'application
 * @description Ce script :
 * - Attend jusqu'à 30 secondes que le port PostgreSQL soit ouvert
 * - Démarre l'application si la base de données est disponible
 * - Termine le processus avec une erreur si la base de données n'est pas disponible
 *
 * @param {Object} options - Options de configuration
 * @param {string} options.host - Hôte de la base de données
 * @param {number} options.port - Port de la base de données
 * @param {number} options.timeout - Délai d'attente maximum en millisecondes
 * @param {string} options.output - Niveau de sortie des logs
 */
waitPort({
  host,
  port,
  timeout: 30000,
  output: "silent",
}).then((open) => {
  if (open) {
    console.log(`✅ PostgreSQL is ready on ${host}:${port} - Starting app...`);
    require("./src/server.ts");
  } else {
    console.error(`❌ Timeout: PostgreSQL not available on ${host}:${port}`);
    process.exit(1);
  }
});
