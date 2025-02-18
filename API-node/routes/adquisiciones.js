const express = require("express");
const router = express.Router();
const db = require("../config/database");

// **1. Obtener todas las adquisiciones**
router.get("/", (req, res) => {
  db.all("SELECT * FROM Adquisiciones", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// **2. Insertar una adquisición**
router.post("/", (req, res) => {
  const { Presupuesto, Unidad, TipoBienServicio, Cantidad, ValorUnitario, FechaAdquisicion, Proveedor, Documentacion } = req.body;
  const ValorTotal = Cantidad * ValorUnitario;

  db.run(
    `INSERT INTO Adquisiciones (Presupuesto, Unidad, TipoBienServicio, Cantidad, ValorUnitario, ValorTotal, FechaAdquisicion, Proveedor, Documentacion) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [Presupuesto, Unidad, TipoBienServicio, Cantidad, ValorUnitario, ValorTotal, FechaAdquisicion, Proveedor, Documentacion],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, message: "Adquisición registrada correctamente" });
    }
  );
});

// **3. Actualizar una adquisición**
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { Presupuesto, Unidad, TipoBienServicio, Cantidad, ValorUnitario, FechaAdquisicion, Proveedor, Documentacion } = req.body;
  const ValorTotal = Cantidad * ValorUnitario;

  db.run(
    `UPDATE Adquisiciones 
     SET Presupuesto = ?, Unidad = ?, TipoBienServicio = ?, Cantidad = ?, ValorUnitario = ?, ValorTotal = ?, FechaAdquisicion = ?, Proveedor = ?, Documentacion = ?
     WHERE Id = ?`,
    [Presupuesto, Unidad, TipoBienServicio, Cantidad, ValorUnitario, ValorTotal, FechaAdquisicion, Proveedor, Documentacion, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ message: "Adquisición no encontrada" });
      res.json({ message: "Adquisición actualizada correctamente" });
    }
  );
});

// **4. Eliminar una adquisición**
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM Adquisiciones WHERE Id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "Adquisición no encontrada" });
    res.json({ message: "Adquisición eliminada correctamente" });
  });
});

module.exports = router;
