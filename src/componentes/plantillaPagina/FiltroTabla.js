import React, { useState } from "react";
import { MenuItem, TextField, Button } from "@mui/material";
import { MdSearch } from "react-icons/md";

/**
 * Componente de filtro para una tabla.
 * Permite filtrar filas en función de una columna seleccionada y un texto de búsqueda.
 * @param {Array} columnasAFiltrar - Columnas disponibles para filtrar.
 * @param {Array} filas - Filas de la tabla.
 * @param {Function} setFilasFiltradas - Función para establecer las filas filtradas.
 * @returns {JSX.Element} El componente de filtro para la tabla.
 */
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
    if (columnaSeleccionada === "") {
      setFilasFiltradas(filas);
    } else {
      const filasFiltradas = filas.filter(
        (row) =>
          row[columnaSeleccionada] &&
          row[columnaSeleccionada].includes(textoAFiltrar)
      );
      setFilasFiltradas(filasFiltradas);
    }
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
      <Button
        variant="container"
        sx={{ margin: "10px" }}
        className="options-button"
        onClick={filtrar}
        startIcon={<MdSearch />}
      >
        Buscar
      </Button>
    </div>
  );
};

export default FiltroTabla;
