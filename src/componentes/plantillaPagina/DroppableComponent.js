import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";
import { FaUpload } from "react-icons/fa";

import "./Drop.css";

function DroppableComponent() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const { acceptedFiles, getRootProps } = useDropzone({
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles.map((file) => file.path));
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
      <Button variant="contained" component="label" className="upload-button">
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
