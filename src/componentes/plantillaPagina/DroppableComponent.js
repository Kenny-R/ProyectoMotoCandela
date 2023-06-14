import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";
import { FaUpload } from "react-icons/fa";
import { useGlobalAlert } from "../../hooks/useGlobalAlert";

import "./Drop.css";

function DroppableComponent({ abierto, setAbierto }) {
    const [data, setData] = useState([]);
    const { popAlert } = useGlobalAlert();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {
            popAlert("Hubo un error al cargar los datos", "error");
            return;
        }

        const extension = file.name.split(".").pop();

        if (extension !== "xls" || extension !== "xlsx") {
          popAlert("Hubo un error al cargar los datos", "error");
          return;
        }

        if (file.name) {
            popAlert("Se cargo correctamente los datos", "success");
            setAbierto(false);
        } else {
            popAlert("Hubo un error al cargar los datos", "error");
        }
    };

    const { acceptedFiles, getRootProps } = useDropzone({
        accept: {
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
        },
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (!file) {
                popAlert("Hubo un error al cargar los datos", "error");
                return;
            }

            popAlert("Se cargo correctamente los datos", "success");
            setAbierto(false);
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
                variant="contained"
                component="label"
                className="upload-button"
            >
                Subir archivo
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    hidden
                    onChange={handleFileUpload}
                />
            </Button>
        </div>
    );
}

export default DroppableComponent;
