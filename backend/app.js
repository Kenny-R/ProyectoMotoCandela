const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
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
      await Repuesto.create(req.body["form"]["Información Basica"]);
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
  } else {
    try {
      await Moto.create(req.body["form"]);
      res.send({ status: "ok" });
    } catch (error) {
      res.send({ status: "error" });
    }
  }
});

app.listen(5000, () => {
  console.log("Servidor Iniciado");
});
