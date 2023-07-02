import React from "react";
import logo from "./imagenes/logo.png";
import { NavLink, Link, useLocation, useNavigate} from "react-router-dom";
import {
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
} from "@mui/material";

import { BiLogOut } from "react-icons/bi";

import { FaMotorcycle } from "react-icons/fa";
import { SiCoronaengine } from "react-icons/si";

import "./estilosBarraLateral.css";
import { cerrarSesion } from "../../Utilidades/FetchApis/PeticionesBD";

const BarraLateral = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            direccion: "/motos",
            nombre: "Motos",
            icono: <FaMotorcycle className="icono" />,
        },
        {
            direccion: "/repuestos",
            nombre: "Repuestos",
            icono: <SiCoronaengine className="icono" />,
        },
    ];

    const manejarCierreSesion = async () =>{
        try {
            const respuesta = await cerrarSesion();
            if (!respuesta.ok){
                console.log("ha ocurrido un error");
                console.log(respuesta);
                return;
            }

            console.log("se ha cerrado sesión");
            navigate("/", {
                state: { from: location },
                replace: true,
            });
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <>
            <Box className="container" component="div">
                <Box className="barraLateral" component="div">
                    <Box className="contenedorLogo" component="div">
                        <Link to="/motos">
                            <img
                                src={logo}
                                className="logo"
                                alt="Logo de Keeway"
                            />
                        </Link>
                    </Box>
                    <List>
                        {menuItems.map((item, index) => (
                            <NavLink
                                to={item.direccion}
                                key={index}
                                className="enlace"
                            >
                                <ListItem>
                                    <ListItemText
                                        className="textoEnlace"
                                        primary={item.nombre}
                                    />
                                    <ListItemIcon>{item.icono}</ListItemIcon>
                                </ListItem>
                            </NavLink>
                        ))}
                    </List>
                    <Button
                        sx={{ position: "absolute", bottom: 5, left: 5 }}
                        variant="contained"
                        color="primary"
                        onClick={manejarCierreSesion}
                        startIcon={
                            <BiLogOut/>
                        }
                    />
                </Box>
                <Box className="contenido">{children}</Box>
            </Box>
        </>
    );
};

export default BarraLateral;
