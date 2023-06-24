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
    Stepper,
    Step,
    StepLabel,
    Typography,
    Box,
} from "@mui/material";

// alertas
import { useGlobalAlert } from "../../hooks/useGlobalAlert";

// funciones utiles
import { validacionCamposVacios } from "../../Utilidades/validacionCamposVacios";
import { registrarProducto } from "../../Utilidades/FetchApis/PeticionesBD";

const pasos = (
    pasoActivo,
    campos,
    estadoForm,
    manejarCambiarDato,
    siguientePaso,
    pasoAnterior,
    reiniciarPasos,
    finalizar
) => {
    const pasosEtiquetas = [];
    const camposModal = [];

    for (let categoria in campos) {
        const propsPasos = {};
        const propsEtiq = {};

        pasosEtiquetas.push(
            <Step key={categoria} {...propsPasos}>
                <StepLabel {...propsEtiq}>{categoria}</StepLabel>
            </Step>
        );

        camposModal.push([]);
        for (let campo in campos[categoria]) {
            camposModal[camposModal.length - 1].push(
                <Grid item xs={12} md={6} key={campo}>
                    <TextField
                        value={estadoForm[categoria][campo]}
                        onChange={(event) => {
                            manejarCambiarDato(
                                categoria,
                                campo,
                                event.target.value
                            );
                        }}
                        label={campo}
                        fullWidth
                        style={{ marginTop: "0.5rem" }}
                    />
                </Grid>
            );
        }
    }
    return (
        <>
            <Stepper activeStep={pasoActivo}>{pasosEtiquetas}</Stepper>
            {pasoActivo === pasosEtiquetas.length ? (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Todos los datos han sido llenados. Seleccione Aplicar
                        para terminar la carga.
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button color="error" onClick={reiniciarPasos}>
                            Reiniciar
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Paso {pasoActivo + 1}
                    </Typography>
                    <Grid container rowSpacing={3} columnSpacing={3}>
                        {camposModal[pasoActivo]}
                    </Grid>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={pasoActivo === 0}
                            onClick={pasoAnterior}
                            sx={{ mr: 1 }}
                        >
                            Atrás
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button
                            onClick={() => {
                                siguientePaso();
                                pasoActivo === pasosEtiquetas.length - 1 &&
                                    finalizar();
                            }}
                        >
                            {pasoActivo === pasosEtiquetas.length - 1
                                ? "Terminar"
                                : "Siguiente"}
                        </Button>
                    </Box>
                </>
            )}
        </>
    );
};

const nombresPasos = (campos) => {
    const nombres = [];

    for (let categoria in campos) {
        nombres.push(categoria);
    }

    return nombres;
};

const PlantillaModal = ({
    abierto,
    setAbierto,
    crear,
    campos,
    tipoProducto,
}) => {
    //form fields states
    const [estadoForm, setEstadoForm] = useState(campos);
    const [pasoActivo, setPasoActivo] = useState(0);
    const [final, setFinal] = useState(false);
    const categorias = nombresPasos(campos);

    const manejarCambiarDato = (categoria, campo, valor) => {
        setEstadoForm({
            ...estadoForm,
            [categoria]: {
                ...estadoForm[categoria],
                [campo]: valor,
            },
        });
    };

    const siguientePaso = () => {
        if (validacionCamposVacios(estadoForm[categorias[pasoActivo]])) {
            popAlert("Hay campos vacios", "error");
            return;
        }
        setPasoActivo((antPasoActivo) => antPasoActivo + 1);
    };

    const pasoAnterior = () => {
        setPasoActivo((antPasoActivo) => antPasoActivo - 1);
    };

    const reiniciarPasos = () => {
        setPasoActivo(0);
        setFinal(false);
    };
    const finalizar = async () => {
        if (validacionCamposVacios(estadoForm[categorias[pasoActivo]])) {
            popAlert("Hay campos vacios", "error");
            return;
        }
        setFinal(true);
    };

    const { popAlert } = useGlobalAlert();

    const handleSubmitDialog = async () => {
        /* await fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ tipo: tipoProducto, form: estadoForm }),
    }).then((data) => {
      if (data.status === "ok") {
        popAlert("Se agregó el producto exitosamente", "success");
      } else {
        popAlert("Ocurrio un error al agregar el producto", "error");
      }
    }); */

        try {
            const response = crear
                ? await registrarProducto(
                      JSON.stringify({ tipo: tipoProducto, form: estadoForm })
                  )
                : null;
            console.log(response);
            console.log(crear);

            if (!response.ok) {
                popAlert("Ocurrio un error al agregar el producto", "error");
                return;
            }
            popAlert(
                `Producto ${crear ? "agregado" : "modificado"} adecuadamente`,
                "success"
            );
        } catch (e) {
            popAlert("Ocurrio un error de red.", "error");
            return;
        }

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
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">
                    {crear
                        ? `Agregar producto de ${tipoProducto}`
                        : `Modificar producto de ${tipoProducto}`}
                </DialogTitle>

                <DialogContent>
                    {pasos(
                        pasoActivo,
                        campos,
                        estadoForm,
                        manejarCambiarDato,
                        siguientePaso,
                        pasoAnterior,
                        reiniciarPasos,
                        finalizar
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAbierto(false)}>Cancelar</Button>
                    {final && (
                        <Button onClick={handleSubmitDialog} autoFocus>
                            Aplicar
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

export { PlantillaModal };
