const waitPort = require("wait-port");

const host = process.env.DB_HOST || "postgres";
const port = parseInt(process.env.DB_PORT || "5432", 10);

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
