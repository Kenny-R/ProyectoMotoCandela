import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Acciones from "../../componentes/acciones/Acciones";
import PlantillaPagina from "../../componentes/plantillaPagina/PlantillaPagina";

import { CamposRepuestos } from "../../Utilidades/Constantes/CamposMotosRepuestos";

function crearDatos(posicion, Nombre, Código, reacciones, ventas, acciones) {
  return { posicion, Nombre, Código, reacciones, ventas, acciones };
}

const columnas = ["#", "Nombre", "Código", "Reacciones", "Ventas", "Acciones"];
const repuestos = [];

const Repuestos = () => {
  const [datos, setDatos] = useState([]);

  async function obtenerRepuesto() {
    try {
      const respuesta = await fetch("http://localhost:5000/obtenerRepuestos", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!respuesta.ok) {
        throw new Error(
          `Ocurrio un error. Estado de respuesta: ${respuesta.status}`
        );
      }
      const resultado = await respuesta.json();
      setDatos(resultado.data); // aca es donde no se actualiza "datos"
      console.log(datos);
      Promise.resolve("Resuelto");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    obtenerRepuesto();
  }, []);

  //eliminar un repuesto
  const eliminarRepuesto = (id, nombre) => {
    if (window.confirm(`Estas seguro que quieres eliminarlo ${nombre}`)) {
      fetch("http://localhost:5000/eliminarRepuesto", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          "Código de parte": id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          obtenerRepuesto();
        });
    }
  };
  return (
    <PlantillaPagina
      nombreLista="Lista de Repuestos"
      filas={repuestos}
      columnas={columnas}
      camposModal={CamposRepuestos}
      tipoProducto={"Repuestos"}
    />
  );
};

export default Repuestos;
