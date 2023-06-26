import React, { useState, useEffect } from "react";
import Acciones from "../../componentes/acciones/Acciones";
import PlantillaPagina from "../../componentes/plantillaPagina/PlantillaPagina";

import { CamposRepuestos } from "../../Utilidades/Constantes/CamposMotosRepuestos";
import { peticionObtenerProductos } from "../../Utilidades/FetchApis/PeticionesBD";

import { clasificar, obtenerClases } from "../../Utilidades/funciones/funcionesAplanarDatos";

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

    const obtenerRepuestos = async () => {
        try {
            const respuesta = await peticionObtenerProductos("Repuestos");

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
                        obtenerProductos={obtenerRepuestos}
                        productoClasificado={clasificar(obtenerClases(CamposRepuestos),repuesto)}
                    />
                );
            });
            setDatos(repuestos);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        obtenerRepuestos();
    }, []);

    return (
        <>
            <PlantillaPagina
                nombreLista="Lista de Repuestos"
                filas={datos}
                columnas={columnas}
                camposModal={CamposRepuestos}
                tipoProducto={"Repuestos"}
                obtenerProductos={obtenerRepuestos}
            />
        </>
    );
};

export default Repuestos;
