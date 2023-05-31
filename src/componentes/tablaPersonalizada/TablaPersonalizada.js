import React from 'react'
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import StyledTableCell from '../styledTableCell/StyledTableCell';
import StyledTableRow from '../styledTableRow/StyledTableRow';

const TablaPersonalizada = (props) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
            <TableRow>
                {props.names.map((name, index) => (
                    <StyledTableCell align="left" key={index}>{name}</StyledTableCell>
                ))}
            </TableRow>
            </TableHead>
            <TableBody>
            {props.rows.map((row) => (
                <StyledTableRow key={row.drag}>
                <StyledTableCell align="left">{row.drag}</StyledTableCell>
                <StyledTableCell align="left">{row.posicion}</StyledTableCell>
                <StyledTableCell align="left">{row.modelo}</StyledTableCell>
                <StyledTableCell align="left">{row.reacciones}</StyledTableCell>
                <StyledTableCell align="left">{row.ventas}</StyledTableCell>
                <StyledTableCell align="left">{row.acciones}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default TablaPersonalizada