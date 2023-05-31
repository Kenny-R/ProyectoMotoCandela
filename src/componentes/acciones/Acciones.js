import { Grid, Button } from "@mui/material";

const Acciones = () => {
  return (
    <Grid container columns={2} spacing={1}>
        <Grid item xs={1}>
            <Button variant="contained" color="warning">Edit</Button>
        </Grid>
        <Grid item xs={1}>
            <Button variant="contained" color="error">Delete</Button>
        </Grid>
    </Grid>
  )
}

export default Acciones