const express = require("express");
const cors = require("cors");
require("dotenv").config();

const adquisicionesRoutes = require("./routes/adquisiciones");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/adquisiciones", adquisicionesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
