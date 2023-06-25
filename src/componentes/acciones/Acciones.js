import { useState } from "react";
import { Grid, Tooltip, IconButton } from "@mui/material";
import { PlantillaModal } from "../plantillaPagina/PlantillaModal";
import { BsPencil, BsTrash } from "react-icons/bs";
import ModalEliminar from "../plantillaPagina/ModalEliminar";

const Acciones = ({
    motos,
    producto,
    obtenerProductos,
}) => {
    const [modificar, setModificar] = useState(false);
    const [eliminar, setEliminar] = useState(false);
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
        setDataModal(producto);
        setModificar(true);
    };

    const manejarEliminarProducto = () => {
        setEliminar(true);
    };

    return (
        <>
            {modificar && (
                <PlantillaModal
                    abierto={modificar}
                    setAbierto={setModificar}
                    crear={false}
                    data={dataModal}
                    motos={motos}
                />
            )}
            {eliminar && (
                <ModalEliminar
                    abierto={eliminar}
                    setAbierto={setEliminar}
                    motos={motos}
                    producto={producto}
                    obtenerProductos={obtenerProductos}
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
                            onClick={manejarEliminarProducto}
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
