import React, { useState } from "react";
import { Box, Grid, Typography, Button, TextField } from "@mui/material";
import Item from "../item/Item";
import TablaPersonalizada from "../tablaPersonalizada/TablaPersonalizada";
import { MdAdd } from "react-icons/md";
import { PlantillaModal } from "./MotosModals";
import ModalCarga from "./ModalCarga";

const PlantillaPagina = (props) => {
  const [agregar, setAgregar] = useState(false);
  const [modalCarga, setModalCarga] = useState(false);

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
          data={null}
          motos={props.motos}
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
                    {props.nameList}
                  </Typography>
                </Grid>
                <Grid item md={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={manejarAgregarProducto}
                    startIcon={
                      <MdAdd sx={{ color: "#FFF", fontSize: "1rem" }} />
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
                  <TablaPersonalizada rows={props.rows} names={props.names} />
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
