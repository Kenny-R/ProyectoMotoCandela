import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import Item from "../item/Item";
import TablaPersonalizada from "../tablaPersonalizada/TablaPersonalizada";
import { MdAdd } from "react-icons/md";
import { PlantillaModal } from "./PlantillaModal";
import ModalCargaMasiva from "./ModalCargaMasiva";
import FiltroTabla from "./FiltroTabla";
import SyncLoader from "react-spinners/SyncLoader";

const PlantillaPagina = ({
  nombreLista,
  filas,
  columnas,
  camposModal,
  tipoProducto,
  obtenerProductos,
  cargando,
}) => {
  const [agregar, setAgregar] = useState(false);
  const [modalCargaMasiva, setModalCargaMasiva] = useState(false);
  const [filasFiltradas, setFilasFiltradas] = useState(filas);
  const columnasAFiltrar = [columnas[0], columnas[1]];

  useEffect(() => {
    setFilasFiltradas(filas);
  }, [filas]);

  const manejarAgregarProducto = () => {
    setAgregar(true);
  };

  const manejarCargaMasiva = () => {
    setModalCargaMasiva(!modalCargaMasiva);
  };

  const keyframes = `
    @-webkit-keyframes fade-out {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    @keyframes fade-out {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  `;

  return (
    <>
      {agregar && (
        <PlantillaModal
          abierto={agregar}
          setAbierto={setAgregar}
          crear={true}
          campos={camposModal}
          tipoProducto={tipoProducto}
          obtenerProductos={obtenerProductos}
        />
      )}
      {modalCargaMasiva && (
        <ModalCargaMasiva
          abierto={modalCargaMasiva}
          setAbierto={setModalCargaMasiva}
          tipoProducto={tipoProducto}
          obtenerProductos={obtenerProductos}
        />
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
                    startIcon={
                      <MdAdd
                        sx={{
                          color: "#FFF",
                          fontSize: "1rem",
                        }}
                      />
                    }
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
                  {cargando && (
                    <div>
                      <style>{keyframes}</style>
                      <SyncLoader
                        margin={100}
                        cssOverride={{
                          animation: "fade-out 0.5s ease-out both",
                          WebkitAnimation: "fade-out 0.5s ease-out both",
                        }}
                      />
                    </div>
                  )}
                  {!cargando && (
                    <TablaPersonalizada
                      filas={filasFiltradas}
                      columnas={columnas}
                    />
                  )}
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
