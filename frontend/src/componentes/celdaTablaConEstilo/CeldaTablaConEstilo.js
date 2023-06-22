import { styled, TableCell } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

const CeldaTablaConEstilo = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

export default CeldaTablaConEstilo