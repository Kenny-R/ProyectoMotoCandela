import React from "react";
import Acciones from "../../componentes/acciones/Acciones";
import PlantillaPagina from "../../componentes/plantillaPagina/PlantillaPagina";

function createData(drag, posicion, modelo, reacciones, ventas, acciones) {
  return { drag, posicion, modelo, reacciones, ventas, acciones };
}

const names = ["Drag", "#", "Modelo", "Reacciones", "Ventas", "Acciones"];

const rows = [
  createData("=", 1, "New Owen", 0, 0, <Acciones />),
  createData("=", 2, "New Owen", 0, 0, <Acciones />),
  createData("=", 3, "New Owen", 0, 0, <Acciones />),
  createData("=", 4, "New Owen", 0, 0, <Acciones />),
  createData("=", 5, "New Owen", 0, 0, <Acciones />),
  createData("=", 6, "New Owen", 0, 0, <Acciones />),
  createData("=", 7, "New Owen", 0, 0, <Acciones />),
  createData("=", 8, "New Owen", 0, 0, <Acciones />),
  createData("=", 9, "New Owen", 0, 0, <Acciones />),
  createData("=", 10, "New Owen", 0, 0, <Acciones />),
  createData("=", 11, "New Owen", 0, 0, <Acciones />),
  createData("=", 12, "New Owen", 0, 0, <Acciones />),
  createData("=", 13, "New Owen", 0, 0, <Acciones />),
  createData("=", 14, "New Owen", 0, 0, <Acciones />),
  createData("=", 15, "New Owen", 0, 0, <Acciones />),
];

const Repuestos = () => {
  return (
    <PlantillaPagina nameList="Lista de Repuestos" rows={rows} names={names} />
  );
};

export default Repuestos;
