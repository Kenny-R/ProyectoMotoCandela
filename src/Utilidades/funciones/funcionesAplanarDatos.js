export const obtenerClases = (campos) => {
    const clases = {};
  
    for (let clasificacion in campos) {
      for (let campo in campos[clasificacion]) {
        clases[campo] = clasificacion;
      }
    }
  
    return clases;
  };
  
export const clasificar = (clases, campos) => {
    const camposClasificados = {};
  
    for (let campo in campos) {
      if (camposClasificados[clases[campo]] === undefined) {
        camposClasificados[clases[campo]] = {}
      }
      camposClasificados[clases[campo]][campo] = campos[campo];
    }
    return camposClasificados;
  };