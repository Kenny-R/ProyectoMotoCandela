import React from "react";
import Acciones from "../../componentes/acciones/Acciones";
import PlantillaPagina from "../../componentes/plantillaPagina/PlantillaPagina";

function createData( posicion, Nombre, Modelo, reacciones, ventas, acciones) {
  return { posicion, Nombre, Modelo, reacciones, ventas, acciones };
}

const columnas = ["#", "Nombre", "Modelo", "Reacciones", "Ventas", "Acciones"];

const filas = [
  createData(1, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  createData(2, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  createData(3, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  createData(4, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  createData(5, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  createData(6, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  createData(7, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  createData(8, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  createData(9, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  createData(10, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  createData(11, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  createData(12, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  createData(13, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  createData(14, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  createData(15, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
];

const Motos = () => {
  return (
    <PlantillaPagina nameList="Lista de Motos" filas={filas} columnas={columnas} motos={true}/>
  );
};

export default Motos;
