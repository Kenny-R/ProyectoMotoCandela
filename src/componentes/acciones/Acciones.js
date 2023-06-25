import { useState, useEffect } from "react";
import { Grid, Tooltip, IconButton } from "@mui/material";
import { PlantillaModal } from "../plantillaPagina/PlantillaModal";
import { BsPencil, BsTrash } from "react-icons/bs";
import ModalEliminar from "../plantillaPagina/ModalEliminar";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { peticionSuspensionProducto } from "../../Utilidades/FetchApis/PeticionesBD";
import { useGlobalAlert } from "../../hooks/useGlobalAlert";

const Acciones = ({ motos, producto, obtenerProductos }) => {
  const { popAlert } = useGlobalAlert();
  const [suspender, setSuspender] = useState(producto["Suspendido"]);
  const [modificar, setModificar] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [dataModal, setDataModal] = useState({
    nombre: "",
    modelo: "",
    arranque: "",
    embrague: "",
    chasis: "",
    suspensionDelantera: "",
    recorridoSuspension: "",
    diametroFrenoDelantero: "",
    frenoTrasero: "",
    diametroFrenoTrasero: "",
    neumaticoDelantero: "",
    llantaDelantera: "",
    neumaticoTrasero: "",
    llantaTrasera: "",
    configuracionMotor: "",
    cicloMotor: "",
    distribucion: "",
    refrigeracion: "",
    cilindrada: "",
    diametroCilindros: "",
    carreraCilindros: "",
    relacionCompresion: "",
    potenciaMaxima: "",
    regimenGiroPotenciaMaxima: "",
    parMotorMaximo: "",
    alimentacion: "",
  });

  const manejarModificarProducto = () => {
    setDataModal(producto);
    setModificar(true);
  };

  const manejarEliminarProducto = () => {
    setEliminar(true);
  };

  const suspensionProducto = async () => {
    console.log(producto["Suspendido"]);
    try {
      const respuesta = await peticionSuspensionProducto(
        motos ? "Motos" : "Repuestos",
        motos
          ? {
              Nombre: producto["Nombre"],
              Modelo: producto["Modelo"],
              Suspendido: producto["Suspendido"],
            }
          : {
              "Código de parte": producto["Código de parte"],
              Suspendido: producto["Suspendido"],
            }
      );

      if (!respuesta.ok) {
        popAlert(
          "Hubo un error al cambiar la suspensión del producto",
          "error"
        );
      }

      const contenido = await respuesta.json();
      if (contenido === "Hecho") {
        setSuspender(!suspender);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const manejarSuspender = () => {
    suspensionProducto();
    if (suspender) {
      popAlert(
        "Se levantó correctamente la suspensión del producto",
        "success"
      );
    } else {
      popAlert("Se suspendió correctamente el producto", "success");
    }
  };

  return (
    <>
      {modificar && (
        <PlantillaModal
          abierto={modificar}
          setAbierto={setModificar}
          crear={false}
          data={dataModal}
          motos={motos}
        />
      )}
      {eliminar && (
        <ModalEliminar
          abierto={eliminar}
          setAbierto={setEliminar}
          motos={motos}
          producto={producto}
          obtenerProductos={obtenerProductos}
        />
      )}
      <Grid container columns={3} spacing={1}>
        {suspender && (
          <Grid item xs={0.85} align="center">
            <Tooltip
              title="Haz click para levantar suspension del producto"
              arrow
            >
              <IconButton color="primary" onClick={manejarSuspender}>
                <FaLock />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
        {!suspender && (
          <Grid item xs={0.85} align="center">
            <Tooltip title="Haz click para suspender producto" arrow>
              <IconButton color="primary" onClick={manejarSuspender}>
                <FaLockOpen />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
        <Grid item xs={1.1} align="center">
          <Tooltip title="Modificar producto" arrow>
            <IconButton color="primary">
              <BsPencil />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={0.85} align="center">
          <Tooltip title="Eliminar producto" arrow>
            <IconButton color="primary" onClick={manejarEliminarProducto}>
              <BsTrash />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
};

export default Acciones;
