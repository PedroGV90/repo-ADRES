const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../config/db");

// Insertar, actualizar, eliminar y leer adquisiciones
router.post("/", async (req, res) => {
  const { Opcion, Id, Presupuesto, Unidad, TipoBienServicio, Cantidad, ValorUnitario, FechaAdquisicion, Proveedor, Documentacion } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Opcion", sql.VarChar(10), Opcion)
      .input("Id", sql.Int, Id || null)
      .input("Presupuesto", sql.Decimal(18, 2), Presupuesto || null)
      .input("Unidad", sql.VarChar(100), Unidad || null)
      .input("TipoBienServicio", sql.VarChar(255), TipoBienServicio || null)
      .input("Cantidad", sql.Int, Cantidad || null)
      .input("ValorUnitario", sql.Decimal(18, 2), ValorUnitario || null)
      .input("FechaAdquisicion", sql.Date, FechaAdquisicion || null)
      .input("Proveedor", sql.VarChar(255), Proveedor || null)
      .input("Documentacion", sql.Text, Documentacion || null)
      .execute("CRUD_Adquisiciones");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error en la ejecución del SP:", error);
    res.status(500).json({ error: "Error en la base de datos" });
  }
});

module.exports = router;
