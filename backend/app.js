//////////////////////////////////////////////////////////////
// Dependencias
//////////////////////////////////////////////////////////////
const func = require("./aplanar.js");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cp = require("cookie-parser");
const jwt = require("jsonwebtoken");

//////////////////////////////////////////////////////////////
// Midleware de express
//////////////////////////////////////////////////////////////

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cp());

//////////////////////////////////////////////////////////////
// conexion con la base de datos
//////////////////////////////////////////////////////////////

const mongoUrl =
    "mongodb+srv://1910096:u2NnyYPZGiGi7bTO@prueba.stlmnyp.mongodb.net/";

mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Conectado al base de datos");
    })
    .catch((e) => console.log(e));

//////////////////////////////////////////////////////////////
// Modelos de la base de datos
//////////////////////////////////////////////////////////////

require("./RepuestoDetalles");
require("./MotoDetalles");
require("./UsuarioDetalles.js");

const Repuesto = mongoose.model("Repuestos");
const Moto = mongoose.model("Motos");
const Usuario = mongoose.model("Usuarios");

//////////////////////////////////////////////////////////////
// Verificar si el usuario inicio sesion
//////////////////////////////////////////////////////////////

const estaAutorizado = (req) => {
    if (!req.cookies.JWT) {
        return false;
    }

    try {
        const verificacionToken = jwt.verify(
            req.cookies.JWT,
            "EmpanadaDeJamonYQueso"
        );
        if (!verificacionToken) {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }

    req.payload = jwt.decode(req.cookies.JWT, "EmpanadaDeJamonYQueso");
    return true;
};

//////////////////////////////////////////////////////////////
// Rutas de autenticacion
//////////////////////////////////////////////////////////////

app.post("/iniciar-sesion", async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ Usuario: req.body.Usuario });
        if (!usuario) {
            res.status(400).json({ error: "El usuario no existe" }).send();
            return;
        }

        const comparacionContraseñas = await bcrypt.compare(
            atob(req.body.Contraseña),
            usuario.Contraseña
        );

        if (!comparacionContraseñas) {
            res.status(400)
                .json({ error: "La contraseña no es correcta" })
                .send();
            return;
        }

        const contenido = { Usuario: usuario.Usuario };
        const token = jwt.sign(contenido, "EmpanadaDeJamonYQueso");

        res.cookie("JWT", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        }).send();
    } catch {
        res.status(400).json({
            error: "ha ocurrido un error al procesar su solicitud",
        });
    }
});

app.get("/cerrar-sesion", (req, res) => {
    res.clearCookie("JWT");
    res.send();
    return;
});

app.get("/comprobar-sesion", async (req, res) => {
    if (estaAutorizado(req)) {
        res.status(200).send();
    } else {
        res.clearCookie("JWT").status(400).send();
    }
});

//////////////////////////////////////////////////////////////
// Rutas para trabajar con los productos de la base de datos
//////////////////////////////////////////////////////////////

app.post("/register", async (req, res) => {
    try {
        if (!estaAutorizado(req)) throw new Error("no estas autorizado");

        if (req.body["tipo"] === "Repuestos") {
            await Repuesto.create(req.body["form"]["Información Basica"]);
        } else if (req.body["tipo"] === "Motos") {
            await Moto.create(func.aplanar(req.body["form"]));
        }

        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
});

app.get("/obtenerProductos", async (req, res) => {
    try {
        if (!estaAutorizado(req)) throw new Error("no estas autorizado");

        let elementoProducto = [];
        if (req.query.tipo === "Repuestos") {
            elementoProducto = await Repuesto.find({});
        } else if (req.query.tipo === "Motos") {
            elementoProducto = await Moto.find({});
        } else {
            throw new Error("no existe ese tipo de producto");
        }
        res.status(200).json(elementoProducto).send();
    } catch (error) {
        res.status(400).send();
    }
});

app.post("/eliminarProducto", async (req, res) => {
    try {
        if (!estaAutorizado(req)) throw new Error("no estas autorizado");

        if (req.body["tipo"] === "Repuestos") {
            Repuesto.deleteOne(
                { "Código de parte": req.body["datos"]["Código de parte"] },
                function (err, res) {
                    if (err) {
                        res.status(400)
                            .json("Ocurrio un error al eliminar el producto")
                            .send();
                    }
                }
            );
        } else if (req.body["tipo"] === "Motos") {
            Moto.deleteOne(
                {
                    Nombre: req.body["datos"]["Nombre"],
                    Modelo: req.body["datos"]["Modelo"],
                },
                function (err, res) {
                    if (err) {
                        res.status(400)
                            .json("Ocurrio un error al eliminar el producto")
                            .send();
                    }
                }
            );
        }
        res.status(200).json("Eliminado").send();
    } catch (error) {
        res.status(400).send();
    }
});

app.post("/suspensionProducto", async (req, res) => {
    try {
        if (!estaAutorizado(req)) throw new Error("no estas autorizado");

        if (req.body["tipo"] === "Repuestos") {
            Repuesto.findOneAndUpdate(
                { "Código de parte": req.body["datos"]["Código de parte"] },
                {
                    Suspendido: !req.body["datos"]["Suspendido"],
                },
                function (err) {
                    if (err) {
                        res.status(400).json("Ocurrio un error").send();
                    }
                }
            );
        } else if (req.body["tipo"] === "Motos") {
            Moto.updateOne(
                {
                    Nombre: req.body["datos"]["Nombre"],
                    Modelo: req.body["datos"]["Modelo"],
                },
                {
                    Suspendido: !req.body["datos"]["Suspendido"],
                },
                function (err, res) {
                    if (err) {
                        res.status(400).json("Ocurrio un error").send();
                    }
                }
            );
        }
        res.status(200).json("Hecho").send();
    } catch (error) {
        res.status(400).send();
    }
});

app.post("/agregacionMasivaProducto", async (req, res) => {
    let sesion = await mongoose.startSession();
    sesion.startTransaction();
    try {
        if (!estaAutorizado(req)) throw new Error("no estas autorizado");

        if (req.body["tipo"] === "Repuestos") {
            await Repuesto.insertMany(req.body["datos"], { sesion });
        } else if (req.body["tipo"] === "Motos") {
            await Moto.insertMany(req.body["datos"], { sesion });
        }

        await sesion.commitTransaction();
        res.status(200).json("Hecho").send();
    } catch (error) {
        console.log(error);
        await sesion.abortTransaction();
        res.status(400).send();
    } finally {
        await sesion.endSession();
    }
});

app.post("/editarProducto", async (req, res) => {
    try {
        if (!estaAutorizado(req)) throw new Error("no estas autorizado");

        const nuevosDatos =  func.aplanar(req.body["datos"]);
        if (req.body["tipo"] === "Repuestos") {
            Repuesto.findOneAndUpdate(
                { "Código de parte": nuevosDatos["Código de parte"] },
                nuevosDatos,
                function (err) {
                    if (err) {
                        res.status(400).json("Ocurrio un error").send();
                    }
                }
            );
        } else if (req.body["tipo"] === "Motos") {
            Moto.updateOne(
                {
                    Nombre: nuevosDatos["Nombre"],
                    Modelo: nuevosDatos["Modelo"],
                },
                nuevosDatos,
                function (err, res) {
                    if (err) {
                        res.status(400).json("Ocurrio un error").send();
                    }
                }
            );
        }
        res.status(200).json("Hecho").send();
    } catch (error) {
        res.status(400).send();
    }
});

//////////////////////////////////////////////////////////////
// Puerto del servidor
//////////////////////////////////////////////////////////////

app.listen(5000, () => {
    console.log("Servidor Iniciado");
});
