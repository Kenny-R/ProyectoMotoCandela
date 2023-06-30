import React from "react";
import logo from "./imagenes/logo.png";
import { NavLink, Link } from "react-router-dom";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

import { FaMotorcycle } from "react-icons/fa";
import { SiCoronaengine } from "react-icons/si";

import "./estilosBarraLateral.css";

const BarraLateral = ({ children }) => {
  const menuItems = [
    {
      direccion: "/motos",
      name: "Motos",
      icono: <FaMotorcycle className="icono" />,
    },
    {
      direccion: "/repuestos",
      name: "Repuestos",
      icono: <SiCoronaengine className="icono" />,
    },
  ];
  return (
    <>
      <Box className="container" component="div">
        <Box className="barraLateral" component="div">
          <Box className="contenedorLogo" component="div">
            <Link to="/motos">
              <img src={logo} className="logo" alt="Logo de Keeway" />
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
                  <ListItemText className="textoEnlace" primary={item.name} />
                  <ListItemIcon>{item.icono}</ListItemIcon>
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Box>
        <Box className="contenido">{children}</Box>
      </Box>
    </>
  );
};

export default BarraLateral;
