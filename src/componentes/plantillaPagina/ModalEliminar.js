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

const ModalEliminar = ({
  abierto,
  setAbierto,
  motos,
  producto,
  obtenerRepuesto,
}) => {
  const { popAlert } = useGlobalAlert();
  const [eliminado, setEliminado] = useState(false);

  const tipo_producto = motos ? "la moto" : "el repuesto";
  const nombre = producto["Nombre"];
  const codigo = motos ? producto["Modelo"] : producto["Código de parte"];

  const eliminarRepuesto = async () => {
    const respuesta = await fetch("http://localhost:5000/eliminarRepuesto", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        "Código de parte": codigo,
      }),
    });

    if (!respuesta.ok) {
      popAlert("Hubo un error al eliminar el producto", "error");
    }

    popAlert("Se eliminó correctamente el producto", "success");
    const contenido = await respuesta.json();
    if (contenido === "Eliminado") {
      setEliminado(true);
      obtenerRepuesto();
    }
  };

  const eliminarProducto = () => {
    if (motos) {
      // eliminarMoto();
    } else {
      eliminarRepuesto();
    }
  };

  return (
    <Dialog open={abierto} onClose={() => setAbierto(false)}>
      <DialogTitle>
        ¿Estás seguro que deseas eliminar {tipo_producto} {nombre} del sistema?
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
            setAbierto(false);
            eliminarProducto();
          }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEliminar;
