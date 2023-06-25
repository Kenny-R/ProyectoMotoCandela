const mongoose = require("mongoose");

const RepuestoDetalles = new mongoose.Schema(
  {
    Nombre: String,
    "Código de parte": { type: String, unique: true },
    Modelo: String,
    Descripción: String,
    Color: String,
    Artículo: String,
    "Número de Parte": String,
    Presentación: String,
    "Más especificaciones": String,
  },
  {
    collection: "Repuestos",
  }
);

mongoose.model("Repuestos", RepuestoDetalles);
