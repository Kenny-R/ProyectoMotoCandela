import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  AlertTitle,
} from "@mui/material";

import { useGlobalAlert } from "../../hooks/useGlobalAlert";
import { peticionEliminarProducto } from "../../Utilidades/FetchApis/PeticionesBD";

const ModalEliminar = ({
  abierto,
  setAbierto,
  motos,
  producto,
  obtenerProductos,
}) => {
  const { popAlert } = useGlobalAlert();
  const [eliminado, setEliminado] = useState(false);

  const tipo_producto = motos ? "la moto" : "el repuesto";

  const eliminarProducto = async () => {
    try {
      const respuesta = await peticionEliminarProducto(
        motos ? "Motos" : "Repuestos",
        motos
          ? { Nombre: producto["Nombre"], Modelo: producto["Modelo"] }
          : { "Código de parte": producto["Código de parte"] }
      );

      if (!respuesta.ok) {
        popAlert("Hubo un error al eliminar el producto.", "error");
      }

      popAlert("Se eliminó correctamente el producto.", "success");
      const contenido = await respuesta.json();
      if (contenido === "Eliminado") {
        setEliminado(true);
        obtenerProductos();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dialog open={abierto} onClose={() => setAbierto(false)}>
        <DialogTitle>
          ¿Estás seguro que deseas eliminar {tipo_producto} {producto["Nombre"]}{" "}
          del sistema?
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning">
            <AlertTitle>
              <strong>Alerta</strong>
            </AlertTitle>
            Al eliminar este producto, sus datos también se eliminarán de forma
            permanente.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAbierto(false)}>Cancelar</Button>
          <Button
            className="eliminar-boton"
            onClick={() => {
              eliminarProducto();
              setAbierto(false);
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalEliminar;
