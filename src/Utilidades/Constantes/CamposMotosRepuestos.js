/**
 * Campos predefinidos para la información básica de una motocicleta.
 */
const CamposMotos = {
  "Informacion Basica": {
    Nombre: "",
    Modelo: "",
    Arranque: "",
    Embrague: "",
    Chasis: "",
    Distribución: "",
    Refigeración: "",
    Alimentación: "",
    Suspendido: false,
  },
  "Parte delantera": {
    "Suspensión Delantera": "",
    "Recorrido suspensión delantera": "",
    "Freno Delantero": "",
    "Diámetro freno delantero": "",
    "Neumático delantero": "",
    "Llanta Delantera": "",
  },
  "Parte trasera": {
    "Suspensión trasera": "",
    "Recorrido suspesión trasera": "",
    "Freno trasero": "",
    "Diámetro freno trasero": "",
    "Neumático Trasero": "",
    "Llanta trasera": "",
  },
  Motor: {
    "Configuración del motor": "",
    "Ciclo de moto": "",
    "Potencia máxima": "",
    "Regimen de giro del motro para potencia maxima (rpm)": "",
    "Par motor maximo (Nm)": "",
    "Regimen de giro del motor para el par maximo (rpm)": "",
  },
  Cilindros: {
    Cilindrada: "",
    "Diámetro de cilindros (mm)": "",
    "Carrera de cilindros (mm)": "",
    "Relación de compresión": "",
  },
};

/**
 * Campos predefinidos para la información básica de un repuesto.
 */
const CamposRepuestos = {
  "Información Basica": {
    Nombre: "",
    "Código de parte": "",
    Modelo: "",
    Descripción: "",
    Color: "",
    Artículo: "",
    "Número de Parte": "",
    Presentación: "",
    "Más especificaciones": "",
    Suspendido: false,
  },
};
export { CamposMotos, CamposRepuestos };
