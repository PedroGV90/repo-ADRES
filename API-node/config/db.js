const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // Cambia a true si usas Azure
    trustServerCertificate: true, // Requerido para algunas versiones de SQL Server
  },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("Conectado a SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Error de conexión a SQL Server:", err);
    process.exit(1);
  });

module.exports = {
  sql,
  poolPromise,
};
