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

const TablaPersonalizada = (props) => {
    const [pagina, setPagina] = useState(0);
    const [filasPorPagina, setFilasPorPagina] = useState(5);

    useEffect (() => {
        setPagina(0);
    }, [props.filas]);

    const obtenerFilasVisibles = useCallback((filas) => {
        if (filas == null) return null;
        const empezarIndice = pagina * filasPorPagina;
        const terminarIndice = empezarIndice + filasPorPagina;
        return filas.slice(empezarIndice, terminarIndice);
    }, [pagina, filasPorPagina]);

    const filasAMostrar = obtenerFilasVisibles(props.filas);

    const cambioDePagina = (event, newPage) => {
        setPagina(newPage);
    };

    const cambioFilasPorPagina = (event) => {
        setFilasPorPagina(parseInt(event.target.value, 10));
        setPagina(0);
    };
    return (
        <>
            <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {props.columnas.map((columna, indice) => (
                                <CeldaTablaConEstilo align={columna === "Acciones" ? "center" : "left"} key={indice}>
                                    {columna}
                                </CeldaTablaConEstilo>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filasAMostrar && filasAMostrar.map((fila) => (
                        <FilasTablaConEstilo>
                            {Object.values(fila).map((valor, indice) => (
                            <CeldaTablaConEstilo key={indice} align={ indice === 5 ? "center" : "left"}>
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
        </>
    );
};

export default TablaPersonalizada;
