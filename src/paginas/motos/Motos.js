import React from "react";
import Acciones from "../../componentes/acciones/Acciones";
import PlantillaPagina from "../../componentes/plantillaPagina/PlantillaPagina";

function createData(drag, posicion, modelo, reacciones, ventas, acciones) {
  return { drag, posicion, modelo, reacciones, ventas, acciones };
}

const names = ["Drag", "#", "Modelo", "Reacciones", "Ventas", "Acciones"];

const rows = [
  createData("=", 1, "New Owen", 0, 0, <Acciones motos={true}/>),
  createData("=", 2, "New Owen", 0, 0, <Acciones motos={true}/>),
  createData("=", 3, "New Owen", 0, 0, <Acciones motos={true}/>),
  createData("=", 4, "New Owen", 0, 0, <Acciones motos={true}/>),
  createData("=", 5, "New Owen", 0, 0, <Acciones motos={true}/>),
  createData("=", 6, "New Owen", 0, 0, <Acciones motos={true}/>),
  createData("=", 7, "New Owen", 0, 0, <Acciones motos={true}/>),
  createData("=", 8, "New Owen", 0, 0, <Acciones motos={true}/>),
  createData("=", 9, "New Owen", 0, 0, <Acciones motos={true}/>),
  createData("=", 10, "New Owen", 0, 0, <Acciones motos={true}/>),
  createData("=", 11, "New Owen", 0, 0, <Acciones motos={true}/>),
  createData("=", 12, "New Owen", 0, 0, <Acciones motos={true}/>),
  createData("=", 13, "New Owen", 0, 0, <Acciones motos={true}/>),
  createData("=", 14, "New Owen", 0, 0, <Acciones motos={true}/>),
  createData("=", 15, "New Owen", 0, 0, <Acciones motos={true}/>),
];

const Motos = () => {
  return (
    <PlantillaPagina nameList="Lista de Motos" rows={rows} names={names} motos={true}/>
  );
};

export default Motos;
