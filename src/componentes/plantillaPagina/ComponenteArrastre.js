import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";
import { FaUpload } from "react-icons/fa";
import { useGlobalAlert } from "../../hooks/useGlobalAlert";

import "./ComponenteArrastre.css";

function ComponenteArrastre({ abierto, setAbierto }) {
  const [data, setData] = useState([]);
  const { popAlert } = useGlobalAlert();

  const { archivosAceptados, getRootProps } = useDropzone({
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    onDrop: (archivosAceptados) => {
      const file = archivosAceptados[0];

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
          Arrastra y sube un archivo XLS, o haz click aquí para seleccionar el
          archivo.
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
