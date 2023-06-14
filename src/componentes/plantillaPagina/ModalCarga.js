import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import DroppableComponent from "./DroppableComponent";

const ModalCarga = ({ abierto, setAbierto }) => {
  return (
    <Dialog open={abierto} onClose={() => setAbierto(false)}>
      <DialogTitle>Sube un archivo de Excel</DialogTitle>
      <DialogContent>
        <DroppableComponent abierto={abierto} setAbierto={setAbierto}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAbierto(false)}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCarga;
