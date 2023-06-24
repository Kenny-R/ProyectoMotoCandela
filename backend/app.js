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
    if (req.body["tipo"] === "Repuestos") {
        try {
            await Repuesto.create(
                req.body["form"]["Información Basica"]
            );
            res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(400).send();
        }
    } else {
        try {
            await Moto.create(func.aplanar(req.body["form"]));
            res.send({ status: "ok" });
        } catch (error) {
            res.send({ status: "error" });
        }
    }
});

app.listen(5000, () => {
    console.log("Servidor Iniciado");
});

app.get("/obtenerRepuestos", async (req, res) => {
    try {
        const elementoRepuestos = await Repuesto.find({});
        res.status(200).json(elementoRepuestos).send();
    } catch (error) {
        res.status(400).send();
    }
});
