import React, { useState } from "react";
import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import Item from "../item/Item";
import TablaPersonalizada from "../tablaPersonalizada/TablaPersonalizada";
import { MdAdd } from "react-icons/md";
import { PlantillaModal } from "./MotosModals";
import ModalCarga from "./ModalCarga";
import FiltroTabla from "./FiltroTabla";

const PlantillaPagina = ({ nombreLista, filas, columnas, camposModal, tipoProducto }) => {
  const [agregar, setAgregar] = useState(false);
  const [modalCarga, setModalCarga] = useState(false);
  const [filasFiltradas, setFilasFiltradas] = useState(filas);
  const columnasAFiltrar = [columnas[1], columnas[2]];

  const manejarAgregarProducto = () => {
    setAgregar(true);
  };

  const manejarCargaMasiva = () => {
    setModalCarga(!modalCarga);
  };

  return (
    <>
      {agregar && (
        <PlantillaModal
          abierto={agregar}
          setAbierto={setAgregar}
          crear={true}
          campos={camposModal}
          tipoProducto={tipoProducto}
        />
      )}
      {modalCarga && (
        <ModalCarga abierto={modalCarga} setAbierto={setModalCarga} />
      )}
      <Box
        sx={{
          minWidth: "700px",
          height: "100%",
          minHeight: "100vh",
          backgroundColor: "#f1f1f1",
          p: 4,
        }}
      >
        <Grid container>
          <Grid item md={12}>
            <Item>
              <Grid container>
                <Grid item md={8}>
                  <Typography
                    variant="h6"
                    align="left"
                    sx={{ fontWeight: "600" }}
                  >
                    {nombreLista}
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={manejarAgregarProducto}
                    startIcon={<MdAdd sx={{ color: "#FFF", fontSize: "1rem" }} />}
                  >
                    Agregar
                  </Button>
                </Grid>
                <Grid item md={2}>
                  <Button
                    onClick={manejarCargaMasiva}
                    variant="contained"
                    color="primary"
                  >
                    Carga Masiva
                  </Button>
                </Grid>
                <Grid item md={12}>
                  <FiltroTabla
                    columnasAFiltrar={columnasAFiltrar}
                    filas={filas}
                    setFilasFiltradas={setFilasFiltradas}
                  />
                  <TablaPersonalizada filas={filasFiltradas} columnas={columnas} />
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PlantillaPagina;
