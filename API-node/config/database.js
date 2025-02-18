const sqlite3 = require("sqlite3").verbose();

// Conectar a la base de datos SQLite
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error al conectar con SQLite:", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite.");
  }
});

// Crear la tabla si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS Adquisiciones (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Presupuesto DECIMAL(18,2),
    Unidad VARCHAR(100),
    TipoBienServicio VARCHAR(255),
    Cantidad INT,
    ValorUnitario DECIMAL(18,2),
    ValorTotal DECIMAL(18,2), 
    FechaAdquisicion DATE,
    Proveedor VARCHAR(255),
    Documentacion TEXT
  )
`);

module.exports = db;
