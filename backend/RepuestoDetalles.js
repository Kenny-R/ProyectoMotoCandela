const mongoose = require("mongoose");

const esquema = {
    Nombre: {type: String, required: true},
    "Código de parte": { type: String, unique: true },
    Modelo: {type: String, required: true},
    Descripción: {type: String, required: true},
    Color: {type: String, required: true},
    Artículo: {type: String, required: true},
    "Número de Parte": {type: String, required: true},
    Presentación: {type: String, required: true},
    "Más especificaciones": {type: String, required: true},
    Suspendido: {type: Boolean, required:true},
};

const RepuestoDetalles = new mongoose.Schema(esquema, {
    collection: "Repuestos",
});
mongoose.model("Repuestos", RepuestoDetalles);
