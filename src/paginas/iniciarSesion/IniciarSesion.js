import { React, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Button, Box, TextField, Typography } from "@mui/material/";
import "./estilosIniciarSesion.css";
import {
    chequearSesion,
    iniciarSesion,
} from "../../Utilidades/FetchApis/PeticionesBD";
import { useLocation, useNavigate } from "react-router-dom";

const IniciarSesion = () => {
    const [usuario, setUsuario] = useState("");
    const [contraseha, setContraseha] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const comprobarSiInicioSesion = async () => {
            try {
                const respuesta = await chequearSesion();
                if (!respuesta.ok) {
                    throw new Error("problemas con la conexion al servidor");
                }
                navigate("/motos", {
                    state: { from: location },
                    replace: true,
                });
            } catch (e) {
                console.log(e);
            }
        };

        comprobarSiInicioSesion();
    }, []);

    const handleSubmit = async () => {
        if (usuario && contraseha) {
            try {
                const contraseñaEncriptada = btoa(contraseha);
                const respuesta = await iniciarSesion({
                    Usuario: usuario,
                    Contraseña: contraseñaEncriptada,
                });
                if (!respuesta.ok) {
                    throw new Error("No puedes iniciar sesion");
                }
                console.log(respuesta);
                navigate("/motos", {
                    state: { from: location },
                    replace: true,
                });
            } catch (e) {
                console.log(e);
            }
            console.log({ usuario: usuario, contraseha: contraseha });
            setUsuario("");
            setContraseha("");
        }
    };

    const BotonIniciarSesion = styled(Button)(() => ({
        color: "#fff",
        backgroundColor: "#F17D3B",
        width: "12rem",
        boxShadow:
            "0 10px 20px rgba(0, 0, 0, .1), 0 3px 6px rgba(0, 0, 0, .05)",
        "&:hover": {
            backgroundColor: "#D36D34",
            boxShadow: "rgba(0, 1, 0, .2) 0 2px 8px",
        },
    }));
    return (
        <div className="iniciarSesionBody">
            <Box className="custom-box">
                <Box className="ladoIzquierdo" />

                <Box className="ladoDerecho">
                    <Typography sx={{ textAlign: "center", m: 3 }} variant="h4">
                        Iniciar Sesión
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
                        Iniciar Sesión
                    </BotonIniciarSesion>
                </Box>
            </Box>
        </div>
    );
};

export default IniciarSesion;
