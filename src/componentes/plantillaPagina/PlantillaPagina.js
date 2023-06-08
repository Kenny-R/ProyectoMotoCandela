import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import Item from "../item/Item";
import TablaPersonalizada from "../tablaPersonalizada/TablaPersonalizada";
import { MdAdd } from "react-icons/md";

const PlantillaPagina = (props) => {
  return (
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
                  startIcon={<MdAdd sx={{ color: "#FFF", fontSize: "1rem" }} />}
                >
                  Agregar
                </Button>
              </Grid>
              <Grid item md={2}>
                <Button variant="contained" color="primary">
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
  );
};

export default PlantillaPagina;
