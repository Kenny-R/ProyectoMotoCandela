import { useState } from "react";
import Acciones from "../../componentes/acciones/Acciones";
import PlantillaPagina from "../../componentes/plantillaPagina/PlantillaPagina";
import { CamposMotos } from "../../Utilidades/Constantes/Constantes/CamposMotosRepuestos";

function crearDatos( posicion, Nombre, Modelo, reacciones, ventas, acciones) {
  return { posicion, Nombre, Modelo, reacciones, ventas, acciones };
}

const columnas = ["#", "Nombre", "Modelo", "Reacciones", "Ventas", "Acciones"];

const motos = [
  crearDatos(1, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  crearDatos(2, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  crearDatos(3, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  crearDatos(4, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  crearDatos(5, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  crearDatos(6, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  crearDatos(7, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  crearDatos(8, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  crearDatos(9, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  crearDatos(10, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  crearDatos(11, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  crearDatos(12, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  crearDatos(13, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  crearDatos(14, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
  crearDatos(15, "benelli rk6", "New Owen", 0, 0, <Acciones motos={true}/>),
];

const Motos = () => {
  const [camposMotos, setCamposMotos] = useState(CamposMotos);

  return (
    <PlantillaPagina nombreLista="Lista de Motos" filas={motos} columnas={columnas} camposModal={camposMotos} tipoProducto={"Motos"}/>
  );
};

export default Motos;
