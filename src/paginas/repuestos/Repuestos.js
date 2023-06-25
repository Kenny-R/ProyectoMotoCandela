import React, { useState, useEffect } from "react";
import Acciones from "../../componentes/acciones/Acciones";
import PlantillaPagina from "../../componentes/plantillaPagina/PlantillaPagina";

import { CamposRepuestos } from "../../Utilidades/Constantes/CamposMotosRepuestos";
import { obtenerProductos } from "../../Utilidades/FetchApis/PeticionesBD";

function crearDatos(nombre, codigo, modelo, acciones) {
  return {
    Nombre: nombre,
    "Código de parte": codigo,
    Modelo: modelo,
    Acciones: acciones,
  };
}

const columnas = ["Nombre", "Código de parte", "Modelo", "Acciones"];

const Repuestos = () => {
  const [datos, setDatos] = useState([]);

  const obtenerRepuesto = async () => {
    try {
      const respuesta = await obtenerProductos("repuestos");

      if (!respuesta.ok) {
        throw new Error(
          `Ocurrio un error. Estado de respuesta: ${respuesta.status}`
        );
      }
      const contenido = await respuesta.json();
      const repuestos = contenido.map((repuesto) => {
        return crearDatos(
          repuesto["Nombre"],
          repuesto["Código de parte"],
          repuesto["Modelo"],
          <Acciones
            motos={false}
            producto={repuesto}
            obtenerRepuesto={obtenerRepuesto}
          />
        );
      });
      setDatos(repuestos);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    obtenerRepuesto();
  }, []);

  return (
    <PlantillaPagina
      nombreLista="Lista de Repuestos"
      filas={datos}
      columnas={columnas}
      camposModal={CamposRepuestos}
      tipoProducto={"Repuestos"}
      obtenerRepuesto={obtenerRepuesto}
    />
  );
};

export default Repuestos;
