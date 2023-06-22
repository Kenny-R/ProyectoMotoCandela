import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import ComponenteArrastre from "./ComponenteArrastre";

const ModalCargaMasiva = ({ abierto, setAbierto }) => {
  return (
    <Dialog open={abierto} onClose={() => setAbierto(false)}>
      <DialogTitle>Sube un archivo de Excel</DialogTitle>
      <DialogContent>
        <ComponenteArrastre abierto={abierto} setAbierto={setAbierto}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAbierto(false)}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCargaMasiva;
