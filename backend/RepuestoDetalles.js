const mongoose = require("mongoose");

// Definición del esquema para el modelo de datos del repuesto
const esquema = {
  Nombre: { type: String, required: true },
  "Código de parte": { type: String, unique: true },
  Modelo: { type: String, required: true },
  Descripción: { type: String, required: true },
  Color: { type: String, required: true },
  Artículo: { type: String, required: true },
  "Número de Parte": { type: String, required: true },
  Presentación: { type: String, required: true },
  "Más especificaciones": { type: String, required: true },
  Suspendido: { type: Boolean, required: true },
};

// Definición del modelo de datos del repuesto
const RepuestoDetalles = new mongoose.Schema(esquema, {
  collection: "Repuestos",
});

// Asociar el modelo de datos del repuesto con la colección "Repuestos" en la base de datos
mongoose.model("Repuestos", RepuestoDetalles);
