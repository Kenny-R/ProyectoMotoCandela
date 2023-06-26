import React, { useState, useEffect } from "react";
import Acciones from "../../componentes/acciones/Acciones";
import PlantillaPagina from "../../componentes/plantillaPagina/PlantillaPagina";

import { CamposMotos } from "../../Utilidades/Constantes/CamposMotosRepuestos";
import { peticionObtenerProductos } from "../../Utilidades/FetchApis/PeticionesBD";
import { clasificar, obtenerClases } from "../../Utilidades/funciones/funcionesAplanarDatos";

function crearDatos(nombre, modelo, acciones) {
    return {
        Nombre: nombre,
        Modelo: modelo,
        Acciones: acciones,
    };
}

const columnas = ["Nombre", "Modelo", "Acciones"];

const Motos = () => {
    const [datos, setDatos] = useState([]);

    const obtenerMotos = async () => {
        try {
            const respuesta = await peticionObtenerProductos("Motos");

            if (!respuesta.ok) {
                throw new Error(
                    `Ocurrio un error. Estado de respuesta: ${respuesta.status}`
                );
            }
            const contenido = await respuesta.json();
            const motos = contenido.map((moto) => {
                return crearDatos(
                    moto["Nombre"],
                    moto["Modelo"],
                    <Acciones
                        motos={true}
                        producto={moto}
                        obtenerProductos={obtenerMotos}
                        productoClasificado={clasificar(obtenerClases(CamposMotos),moto)}
                    />
                );
            });
            setDatos(motos);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        obtenerMotos();
    }, []);

    return (
        <>
            <PlantillaPagina
                nombreLista="Lista de Motos"
                filas={datos}
                columnas={columnas}
                camposModal={CamposMotos}
                tipoProducto={"Motos"}
                obtenerProductos={obtenerMotos}
            />
        </>
    );
};

export default Motos;
