import { React, useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, Box, TextField, Typography } from "@mui/material/";
import "./style.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseha, setContraseha] = useState("");

  const handleSubmit = () => {
    if (usuario && contraseha) {
      console.log({ usuario: usuario, contraseha: contraseha });
      setUsuario("");
      setContraseha("");
    }
  };

  const BotonIniciarSesion = styled(Button)(() => ({
    color: "#000000",
    backgroundColor: "#F17D3B",
    "&:hover": {
      backgroundColor: "#D36D34",
    },
  }));
  return (
    <Box className="custom-box">
      <Box className="ladoIzquierdo"/>

      <Box className="ladoDerecho">
        <Typography sx={{ textAlign: "center", m: 3 }} variant="h4">
          Iniciar Sesion
        </Typography>
        <TextField
          value={usuario}
          onChange={(e) => {
            setUsuario(e.target.value);
          }}
          id="usuario"
          label="Usuario"
          variant="outlined"
          fullWidth
          sx={{ marginTop: 2, marginBottom: 3 }}
        />

        <TextField
          value={contraseha}
          onChange={(e) => {
            setContraseha(e.target.value);
          }}
          id="contraseha"
          label="Contraseña"
          variant="outlined"
          fullWidth
          autoComplete="false"
          type="password"
          sx={{ marginBottom: 2 }}
        />

        <Box>
          <BotonIniciarSesion
            onClick={handleSubmit}
            variant="contained"
            fullWidth
            sx={{
              margin: 2,
              paddingX: 3,
              paddingY: 1.5,
            }}
          >
            Iniciar Sesion
          </BotonIniciarSesion>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
