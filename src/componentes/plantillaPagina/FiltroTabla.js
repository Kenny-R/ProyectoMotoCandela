import React, { useState } from "react";
import { MenuItem, TextField, Button } from "@mui/material";
import { MdSearch } from "react-icons/md";

const FiltroTabla = ({ columnasAFiltrar, filas, setFilasFiltradas }) => {
    const [columnaSeleccionada, setColumnaSeleccionada] = useState("");
    const [textoAFiltrar, setTextoAFiltrar] = useState("");

    const cambioColumnaSeleccionada = (event) => {
        setColumnaSeleccionada(event.target.value);
    };
    
    const cambioTextoAFiltrar = (event) => {
        setTextoAFiltrar(event.target.value);
    };

    const filtrar = () => {
        if (columnaSeleccionada === ""){
            setFilasFiltradas(filas);
        } else {
            const filasFiltradas = filas.filter((row) =>
                row[columnaSeleccionada] && row[columnaSeleccionada].includes(textoAFiltrar)
            );
            setFilasFiltradas(filasFiltradas);
        };
    };
    
    return (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
        <TextField
            select
            label="Filtrar por"
            value={columnaSeleccionada}
            onChange={cambioColumnaSeleccionada}
            variant="outlined"
            style={{ width: "150px", marginRight: "10px" }}
        >
            {columnasAFiltrar.map((columna) => (
            <MenuItem key={columna} value={columna}>
                {columna}
            </MenuItem>
            ))}
        </TextField>
        <TextField
            label="Buscar por"
            value={textoAFiltrar}
            onChange={cambioTextoAFiltrar}
            variant="outlined"
            style={{ marginRight: "10px" }}
        />
        <Button variant="container" sx={{margin: "10px"}} className="options-button" onClick={filtrar} startIcon={<MdSearch />}>
            Buscar
        </Button>
        </div>
    );
};


export default FiltroTabla;
