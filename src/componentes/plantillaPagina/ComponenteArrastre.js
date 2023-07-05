import { useDropzone } from "react-dropzone";
import { Button } from "@mui/material";
import { read, utils } from "xlsx";
import { FaUpload } from "react-icons/fa";
import { useGlobalAlert } from "../../hooks/useGlobalAlert";

import "./ComponenteArrastre.css";
import { peticionAgregacionMasivaProducto } from "../../Utilidades/FetchApis/PeticionesBD";

/**
 * Componente de arrastre de archivos.
 *
 * @param {boolean} abierto - Indica si el componente está abierto.
 * @param {function} setAbierto - Función para controlar el estado de abierto/cerrado del componente.
 * @param {string} tipoProducto - Tipo de producto asociado al archivo.
 * @param {function} obtenerProductos - Función para obtener los productos.
 * @returns {JSX.Element} Componente JSX de arrastre de archivos.
 */
function ComponenteArrastre({
  abierto,
  setAbierto,
  tipoProducto,
  obtenerProductos,
}) {
  const { popAlert } = useGlobalAlert();

  const { getRootProps } = useDropzone({
    accept: {
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    onDrop: async (archivosAceptados) => {
      const archivo = archivosAceptados[0];

      if (!archivo) {
        popAlert("Este formato del archivo no está soportado.", "error");
        return;
      }

      try {
        const archivoBuffer = await archivo.arrayBuffer();
        const libro = read(archivoBuffer);
        const primeraHoja = libro.Sheets[libro.SheetNames[0]];
        const datos = utils.sheet_to_json(primeraHoja);

        const respuesta = await peticionAgregacionMasivaProducto(
          tipoProducto,
          datos
        );

        const contenido = await respuesta.json();
        if (contenido === "Codigo duplicado") {
          popAlert(
            "Existe un producto con código duplicado. Por favor, revise el archivo.",
            "error"
          );
          return;
        } 
        
        if (contenido === "Error de validacion") {
          popAlert(
            "Hay campos inválidos o vacíos. Por favor, revise el archivo.",
            "error"
          );
          return;
        }
        
        if (!respuesta.ok) {
          popAlert("Hubo un error al cargar los datos.", "error");
          return;
        }
        
        popAlert("Se cargaron todos los datos satisfactoriamente.", "success");
        obtenerProductos();
        setAbierto(false);


      } catch (e) {
        console.log(e);
        popAlert("Hubo un error al cargar los datos.", "error");
        return;
      }
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
