export const validacionCamposVacios = (estadoCampos) => {
    let hayCampoVacio = false;

    for (let campo in estadoCampos) {
        if (estadoCampos[campo] === '') {
            hayCampoVacio = true;
            break;
        }
    }

    return hayCampoVacio;
};
