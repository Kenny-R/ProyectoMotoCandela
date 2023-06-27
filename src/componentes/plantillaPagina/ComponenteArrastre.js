import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import { read, utils } from "xlsx";
import { FaUpload } from "react-icons/fa";
import { useGlobalAlert } from "../../hooks/useGlobalAlert";

import "./ComponenteArrastre.css";
import { peticionAgregacionMasivaProducto} from "../../Utilidades/FetchApis/PeticionesBD";

function ComponenteArrastre({ abierto, setAbierto, tipoProducto,obtenerProductos }) {
    const [data, setData] = useState([]);
    const { popAlert } = useGlobalAlert();

    const { archivosAceptados, getRootProps } = useDropzone({
        accept: {
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
        },
        onDrop: async (archivosAceptados) => {
            const archivo = archivosAceptados[0];

            if (!archivo) {
                popAlert("Hubo un error al cargar los datos", "error");
                return;
            }

            try {
                console.log(tipoProducto);
                const archivoBuffer = await archivo.arrayBuffer();
                const libro = read(archivoBuffer);
                const primeraHoja = libro.Sheets[libro.SheetNames[0]];
                const datos = utils.sheet_to_json(primeraHoja);

                const respuesta = await peticionAgregacionMasivaProducto(tipoProducto, datos);

                if (!respuesta.ok){
                  popAlert("Hubo un error al cargar los datos", "error");
                  return;
                }

            } catch (e) {
                console.log(e);
                popAlert("Hubo un error al cargar los datos", "error");
                return;
            }
            popAlert("Se cargo correctamente los datos", "success");
            setAbierto(false);
            obtenerProductos()
        },
        maxFiles: 1,
    });

    return (
        <div className="upload-file">
            <div {...getRootProps()} className="drag-file-area">
                <FaUpload className="icono" />
                <p>
                    Arrastra y sube un archivo XLS, o haz click aquí para
                    seleccionar el archivo.
                </p>
            </div>
            <Button
                {...getRootProps()}
                variant="contained"
                component="label"
                className="subir-boton"
            >
                Subir archivo
            </Button>
        </div>
    );
}

export default ComponenteArrastre;
