const mongoose = require("mongoose");

const MotoDetalles = new mongoose.Schema(
  {
    Nombre: String,
    Modelo: String,
    Arranque: String,
    Embrague: String,
    Chasis: String,
    "Distribución": String,
    "Refigeración": String,
    "Alimentación": String,
    Suspendido: Boolean,
    "Suspensión Delantera": String,
    "Recorrido suspensión delantera": String,
    "Freno Delantero": String,
    "Diámetro freno delantero": String,
    "Neumático delantero": String,
    "Llanta Delantera": String,
    "Suspensión trasera": String,
    "Recorrido suspesión trasera": String,
    "Freno trasero": String,
    "Diámetro freno trasero": String,
    "Neumático Trasero": String,
    "Llanta trasera": String,
    "Configuración del motor": String,
    "Ciclo de moto": String,
    "Potencia máxima": String,
    "Regimen de giro del motro para potencia maxima (rpm)": String,
    "Par motor maximo (Nm)": String,
    "Regimen de giro del motor para el par maximo (rpm)": String,
    Cilindrada: String,
    "Diámetro de cilindros (mm)": String,
    "Carrera de cilindros (mm)": String,
    "Relación de compresión": String,
  },
  {
    collection: "Motos",
  }
).index({Nombre: 1, Modelo: 1}, {unique: true});
mongoose.model("Motos", MotoDetalles);
