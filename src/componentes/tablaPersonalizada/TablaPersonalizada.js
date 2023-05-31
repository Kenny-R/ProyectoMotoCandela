import React from 'react'
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import CeldaTablaConEstilo from '../celdaTablaConEstilo/CeldaTablaConEstilo';
import FilasTablaConEstilo from '../filasTablaConEstilo/FilasTablaConEstilo';

const TablaPersonalizada = (props) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                {props.names.map((name, index) => (
                    <CeldaTablaConEstilo align="left" key={index}>{name}</CeldaTablaConEstilo>
                ))}
            </TableRow>
            </TableHead>
            <TableBody>
            {props.rows.map((row) => (
                <FilasTablaConEstilo key={row.drag}>
                <CeldaTablaConEstilo align="left">{row.drag}</CeldaTablaConEstilo>
                <CeldaTablaConEstilo align="left">{row.posicion}</CeldaTablaConEstilo>
                <CeldaTablaConEstilo align="left">{row.modelo}</CeldaTablaConEstilo>
                <CeldaTablaConEstilo align="left">{row.reacciones}</CeldaTablaConEstilo>
                <CeldaTablaConEstilo align="left">{row.ventas}</CeldaTablaConEstilo>
                <CeldaTablaConEstilo align="left">{row.acciones}</CeldaTablaConEstilo>
                </FilasTablaConEstilo>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default TablaPersonalizada