const func = require("./aplanar.js");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
const { FaTheRedYeti } = require("react-icons/fa");
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

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

require("./RepuestoDetalles");
require("./MotoDetalles");

const Repuesto = mongoose.model("Repuestos");
const Moto = mongoose.model("Motos");
app.post("/register", async (req, res) => {
    try {
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

app.listen(5000, () => {
    console.log("Servidor Iniciado");
});

app.get("/obtenerProductos", async (req, res) => {
    try {
        let elementoProducto = [];
        if (req.query.tipo === "Repuestos") {
            elementoProducto = await Repuesto.find({});
        } else if (req.query.tipo === "Motos") {
            elementoProducto = await Moto.find({});
        }
        res.status(200).json(elementoProducto).send();
    } catch (error) {
        res.status(400).send();
    }
});

app.post("/eliminarProducto", async (req, res) => {
    try {
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
