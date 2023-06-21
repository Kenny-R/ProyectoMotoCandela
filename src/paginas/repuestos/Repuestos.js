import React from "react";
import Acciones from "../../componentes/acciones/Acciones";
import PlantillaPagina from "../../componentes/plantillaPagina/PlantillaPagina";

import { CamposRepuestos } from "../../Utilidades/Constantes/CamposMotosRepuestos"; 

function crearDatos(posicion, Nombre, Código, reacciones, ventas, acciones) {
  return { posicion, Nombre, Código, reacciones, ventas, acciones };
}

const columnas = ["#", "Nombre", "Código", "Reacciones", "Ventas", "Acciones"];

const repuestos = [
  crearDatos(1, "New Owen", "3J4824PQ", 0, 0, <Acciones motos={false}/>),
  crearDatos(2, "New Owen", "BNUPR2GT", 0, 0, <Acciones motos={false}/>),
  crearDatos(3, "New Owen", "WP77NRUC", 0, 0, <Acciones motos={false}/>),
  crearDatos(4, "New Owen", "VXFNG3G8", 0, 0, <Acciones motos={false}/>),
  crearDatos(5, "New Owen", "3DPDNCY6", 0, 0, <Acciones motos={false}/>),
  crearDatos(6, "New Owen", "YLUJ7WKS", 0, 0, <Acciones motos={false}/>),
  crearDatos(7, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  crearDatos(8, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  crearDatos(9, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  crearDatos(10, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  crearDatos(11, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  crearDatos(12, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  crearDatos(13, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  crearDatos(14, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
  crearDatos(15, "New Owen", "CR42G57", 0, 0, <Acciones motos={false}/>),
];

const Repuestos = () => {
  return (
    <PlantillaPagina nombreLista="Lista de Repuestos" filas={repuestos} columnas={columnas} camposModal={CamposRepuestos} tipoProducto={"Repuestos"}/>
  );
};

export default Repuestos;
