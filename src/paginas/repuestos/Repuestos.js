import React, { useState, useEffect } from "react";
import Acciones from "../../componentes/acciones/Acciones";
import PlantillaPagina from "../../componentes/plantillaPagina/PlantillaPagina";

import { CamposRepuestos } from "../../Utilidades/Constantes/CamposMotosRepuestos";
import { obtenerProductos } from "../../Utilidades/FetchApis/PeticionesBD";

function crearDatos(nombre, codigo, modelo) {
    return { "Nombre" : nombre, "Código de parte": codigo, "Modelo": modelo };
}

const columnas = ["Nombre", "Código de parte", "Modelo"];

const Repuestos = () => {
    const [datos, setDatos] = useState([]);

    const obtenerRepuesto = async () => {
        try {
            const respuesta = await obtenerProductos("repuestos")

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
                    repuesto["Modelo"]
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
            filas={datos}
            columnas={columnas}
            camposModal={CamposRepuestos}
            tipoProducto={"Repuestos"}
        />
    );
};

export default Repuestos;
