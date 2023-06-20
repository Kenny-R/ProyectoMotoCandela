import { useState } from "react";
import { Grid, Tooltip, IconButton } from "@mui/material";
import { PlantillaModal } from "../plantillaPagina/MotosModals";
import { BsPencil, BsTrash } from 'react-icons/bs';

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
                <Grid item xs={1.1} align="center">
                <Tooltip title="Modificar producto" arrow>
                    <IconButton color="primary">
                    <BsPencil />
                    </IconButton>
                </Tooltip>
                </Grid>
                <Grid item xs={0.85} align="center">
                <Tooltip title="Eliminar producto" arrow>
                    <IconButton
                    color="primary"
                    >
                    <BsTrash />
                    </IconButton>
                </Tooltip>
                </Grid>
            </Grid>
        </>
    );
};

export default Acciones;
