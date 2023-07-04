import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import CeldaTablaConEstilo from "../celdaTablaConEstilo/CeldaTablaConEstilo";
import FilasTablaConEstilo from "../filasTablaConEstilo/FilasTablaConEstilo";

/**
 * Componente de tabla personalizada.
 *
 * @param {object} props - Propiedades del componente.
 * @param {array} props.filas - Filas de datos.
 * @param {array} props.columnas - Columnas de la tabla.
 * @returns {JSX.Element} Componente JSX de tabla personalizada.
 */
const TablaPersonalizada = (props) => {
  const [pagina, setPagina] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(5);

  useEffect(() => {
    setPagina(0);
  }, [props.filas]);

  /**
   * Obtiene las filas visibles según la página y filas por página.
   *
   * @param {array} filas - Filas de datos.
   * @returns {array} Filas visibles.
   */
  const obtenerFilasVisibles = useCallback(
    (filas) => {
      if (filas == null) return null;
      const empezarIndice = pagina * filasPorPagina;
      const terminarIndice = empezarIndice + filasPorPagina;
      return filas.slice(empezarIndice, terminarIndice);
    },
    [pagina, filasPorPagina]
  );

  const filasAMostrar = obtenerFilasVisibles(props.filas);

  /**
   * Maneja el cambio de página.
   *
   * @param {object} event - Evento del cambio de página.
   * @param {number} newPage - Nueva página.
   */
  const cambioDePagina = (event, newPage) => {
    setPagina(newPage);
  };

  /**
   * Maneja el cambio de filas por página.
   *
   * @param {object} event - Evento del cambio de filas por página.
   */
  const cambioFilasPorPagina = (event) => {
    setFilasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  const keyframes = `
    @-webkit-keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
    }
  `;
  return (
    <>
      <style>{keyframes}</style>
      <div
        style={{
          WebkitAnimation:
            "fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
          animation:
            "fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        }}
      >
        <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {props.columnas.map((columna, indice) => (
                  <CeldaTablaConEstilo
                    align={columna === "Acciones" ? "center" : "left"}
                    key={indice}
                  >
                    {columna}
                  </CeldaTablaConEstilo>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filasAMostrar &&
                filasAMostrar.map((fila) => (
                  <FilasTablaConEstilo>
                    {Object.values(fila).map((valor, indice) => (
                      <CeldaTablaConEstilo
                        key={indice}
                        align={indice === 5 ? "center" : "left"}
                      >
                        {valor}
                      </CeldaTablaConEstilo>
                    ))}
                  </FilasTablaConEstilo>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.filas.length}
          rowsPerPage={filasPorPagina}
          page={pagina}
          onPageChange={cambioDePagina}
          onRowsPerPageChange={cambioFilasPorPagina}
          labelRowsPerPage={"Filas por paginas"}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
        />
      </div>
    </>
  );
};

export default TablaPersonalizada;
