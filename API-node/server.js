const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/database"); // Importamos la conexión a SQLite
const adquisicionesRoutes = require("./routes/adquisiciones");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/adquisiciones", adquisicionesRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
