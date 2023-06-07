import React, { useState } from "react";
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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
    const visibleRows = React.useMemo(
        () =>
          props.rows.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
          ),
        [page, rowsPerPage],
      );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <>
            <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {props.names.map((name, index) => (
                                <CeldaTablaConEstilo align="left" key={index}>
                                    {name}
                                </CeldaTablaConEstilo>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row) => (
                            <FilasTablaConEstilo key={row.drag}>
                                <CeldaTablaConEstilo align="left">
                                    {row.drag}
                                </CeldaTablaConEstilo>
                                <CeldaTablaConEstilo align="left">
                                    {row.posicion}
                                </CeldaTablaConEstilo>
                                <CeldaTablaConEstilo align="left">
                                    {row.modelo}
                                </CeldaTablaConEstilo>
                                <CeldaTablaConEstilo align="left">
                                    {row.reacciones}
                                </CeldaTablaConEstilo>
                                <CeldaTablaConEstilo align="left">
                                    {row.ventas}
                                </CeldaTablaConEstilo>
                                <CeldaTablaConEstilo align="left">
                                    {row.acciones}
                                </CeldaTablaConEstilo>
                            </FilasTablaConEstilo>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage =  {"Filas por paginas"}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            />
        </>
    );
};

export default TablaPersonalizada;
