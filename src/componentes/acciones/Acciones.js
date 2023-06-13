import { useState } from "react";
import { Grid, Button } from "@mui/material";
import { PlantillaModal } from "../plantillaPagina/MotosModals";

const Acciones = (props) => {
    const [modificar, setModificar] = useState(false);
    const [dataModal, setDataModal] = useState({
        nombre: "",
        modelo: "",
        arranque: "",
        embrague: "",
        chasis: "",
        suspensionDelantera: "",
        recorridoSuspension: "",
        diametroFrenoDelantero: "",
        frenoTrasero: "",
        diametroFrenoTrasero: "",
        neumaticoDelantero: "",
        llantaDelantera: "",
        neumaticoTrasero: "",
        llantaTrasera: "",
        configuracionMotor: "",
        cicloMotor: "",
        distribucion: "",
        refrigeracion: "",
        cilindrada: "",
        diametroCilindros: "",
        carreraCilindros: "",
        relacionCompresion: "",
        potenciaMaxima: "",
        regimenGiroPotenciaMaxima: "",
        parMotorMaximo: "",
        alimentacion: "",
    });
    
    const manejarModificarProducto = () => {
        //setDataModal(data);
        setModificar(true);
    };
    return (
        <>
            {modificar && (
                <PlantillaModal
                    abierto={modificar}
                    setAbierto={setModificar}
                    crear={false}
                    data={dataModal}
                    motos={props.motos}
                />
            )}
            <Grid container columns={2} spacing={1}>
                <Grid item xs={1}>
                    <Button
                        onClick={manejarModificarProducto}
                        variant="contained"
                        color="warning"
                    >
                        Modificar
                    </Button>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="contained" color="error">
                        Eliminar
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Acciones;
