import React from "react";
import Acciones from "../../componentes/acciones/Acciones";
import PlantillaPagina from "../../componentes/plantillaPagina/PlantillaPagina";

function createData(posicion, Nombre, Código, reacciones, ventas, acciones) {
  return { posicion, Nombre, Código, reacciones, ventas, acciones };
}

const columnas = ["#", "Nombre", "Código", "Reacciones", "Ventas", "Acciones"];

const filas = [
  createData(1, "New Owen", "3J4824PQ", 0, 0, <Acciones motos={false}/>),
  createData(2, "New Owen", "BNUPR2GT", 0, 0, <Acciones motos={false}/>),
  createData(3, "New Owen", "WP77NRUC", 0, 0, <Acciones motos={false}/>),
  createData(4, "New Owen", "VXFNG3G8", 0, 0, <Acciones motos={false}/>),
  createData(5, "New Owen", "3DPDNCY6", 0, 0, <Acciones motos={false}/>),
  createData(6, "New Owen", "YLUJ7WKS", 0, 0, <Acciones motos={false}/>),
  createData(7, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  createData(8, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  createData(9, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  createData(10, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  createData(11, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  createData(12, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  createData(13, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  createData(14, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  createData(15, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
];

const Repuestos = () => {
  return (
    <PlantillaPagina nameList="Lista de Repuestos" filas={filas} columnas={columnas} motos={false}/>
  );
};

export default Repuestos;
