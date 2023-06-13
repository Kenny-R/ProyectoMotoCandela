import { useState } from "react";

// MUI
import {
    TextField,
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

import { useGlobalAlert } from "../useGlobalAlert";

const PlantillaModal = ({ abierto, setAbierto, crear, data, motos }) => {
    //form fields states
    const initialState = crear ? "" : data;
    const [formState, setFormState] = useState(initialState);
    const tipoProducto = motos ? "moto" : "repuesto";    

    const campos = motos ? [
        { id: "nombre", label: "Nombre" },
        { id: "modelo", label: "Modelo" },
        { id: "arranque", label: "Arranque" },
        { id: "embrague", label: "Embrague" },
        { id: "chasis", label: "Chasis" },
        { id: "suspensionDelantera", label: "Suspensión Delantera" },
        { id: "recorridoSuspension", label: "Recorrido suspensión" },
        { id: "diametroFrenoDelantero", label: "Diámetro freno delantero(mm)" },
        { id: "frenoTrasero", label: "Freno trasero" },
        { id: "diametroFrenoTrasero", label: "Diámetro freno trasero" },
        { id: "neumaticoDelantero", label: "Neumático delantero" },
        { id: "llantaDelantera", label: "Llanta Delantera" },
        { id: "neumaticoTrasero", label: "Neumático Trasero" },
        { id: "llantaTrasera", label: "Llanta trasera" },
        { id: "configuracionMotor", label: "Configuración de motor" },
        { id: "cicloMotor", label: "Ciclo de motor" },
        { id: "distribucion", label: "Distribución" },
        { id: "refrigeracion", label: "Refrigeración" },
        { id: "cilindrada", label: "Cilindrada" },
        { id: "diametroCilindros", label: "Diámetro de cilindros (mm)" },
        { id: "carreraCilindros", label: "Carrera de cilindros (mm)" },
        { id: "relacionCompresion", label: "Relación de compresión" },
        { id: "potenciaMaxima", label: "Potencia máxima" },
        { id: "regimenGiroPotenciaMaxima", label: "Régimen de giro del motor para potencia máxima (rpm)" },
        { id: "parMotorMaximo", label: "Par motor máximo (Nm)" },
        { id: "regimenGiroParMotorMaximo", label: "Régimen de giro del motor para el par máximo (rpm)" },
        { id: "alimentacion", label: "Alimentación" },
    ] : [
        { id: "nombre", label: "Nombre" },
        { id: "descripcion", label: "Descripción" },
        { id: "color", label: "Color" },
        { id: "articulo", label: "Artículo" },
        { id: "numeroParte", label: "Número de parte" },
        { id: "codigoParte", label: "Código de parte" },
        { id: "modelo", label: "Modelo" },
        { id: "presentacion", label: "Presentación" },
        { id: "especificaciones", label: "Más especificaciones" },
    ];
  

    const manejarCambiarDato = (event) => {
        const { id, value } = event.target;
        setFormState((prevState) => ({ ...prevState, [id]: value }));
    };

    const { popAlert } = useGlobalAlert();

    const handleSubmitDialog = async () => {

        const hayCampoVacio = campos.some((campo) => campo.valor === "");

        if (hayCampoVacio) {
            popAlert("Hay campos vacios", "error");
            return;
        }

        const request = {
            campos
        };

        try {
            const response =  null //crear ? await agregarUser(request) : await editUser(request);

            if (!response.ok) {
                popAlert("Error, por favor chequear todos los campos", "error" );
                return;
            }
            popAlert( `Producto ${crear ? "agregado" : "modificado"} adecuadamente`, "exito");
        } catch (e) {
            popAlert("Ocurrio un error de red.", "error");
            return;
        }

        window.location.reload();
        setAbierto(false);
    };

    return (
        <>
            <Dialog
                open={abierto}
                onClose={() => setAbierto(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="alert-dialog-title">
                    {crear ? `Agregar producto de ${tipoProducto}` : `Modificar producto de ${tipoProducto}`}
                </DialogTitle>

                <DialogContent>
                    <Grid container rowSpacing={3}>
                        {campos.map((campo) => (
                            <Grid item xs={12} key={campo.id}>
                                <TextField
                                    value={formState[campo.id]}
                                    onChange={manejarCambiarDato}
                                    id={campo.id}
                                    label={campo.label}
                                    fullWidth
                                    style={{ marginTop: '0.5rem' }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAbierto(false)}>Cancel</Button>
                    <Button onClick={handleSubmitDialog} autoFocus>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export { PlantillaModal };
