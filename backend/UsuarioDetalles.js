const mongoose = require("mongoose");

const esquema = {
    Usuario: {type: String, required: true},
    Contraseña: {type: String, required: true},
};

const UsuarioDetalles = new mongoose.Schema(esquema, {
    collection: "Usuarios",
});
mongoose.model("Usuarios", UsuarioDetalles);
