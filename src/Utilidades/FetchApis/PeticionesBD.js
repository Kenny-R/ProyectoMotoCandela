/**
 * hace una peticion para que se almacene un nuevo producto en la base de datos
 * body recibe JSON.stringify({ tipo: tipoProducto, form: estadoForm })
 */
export const peticionRegistrarProducto = async (body) => {
  return fetch("http://localhost:5000/register", {
    method: "POST",
    crossDomain: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000",
    },
    body: body,
  });
};

export const peticionObtenerProductos = async (tipoProducto) => {
  return fetch(`http://localhost:5000/obtenerProductos?tipo=${tipoProducto}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });
};

export const peticionEliminarProducto = async (tipoProducto, datos) => {
  return fetch("http://localhost:5000/eliminarProducto", {
    method: "POST",
    crossDomain: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000",
    },
    body: JSON.stringify({ tipo: tipoProducto, datos: datos }),
  });
};

export const peticionSuspensionProducto = async (tipoProducto, datos) => {
  return fetch("http://localhost:5000/suspensionProducto", {
    method: "POST",
    crossDomain: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000",
    },
    body: JSON.stringify({ tipo: tipoProducto, datos: datos }),
  });
};

export const peticionAgregacionMasivaProducto = async (tipoProducto, datos) => {
  return fetch("http://localhost:5000/agregacionMasivaProducto", {
    method: "POST",
    crossDomain: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000",
    },
    body: JSON.stringify({ tipo: tipoProducto, datos: datos }),
  });
}

export const chequearSesion = async () => {
  return fetch("http://localhost:5000/comprobar-sesion", {
    method: "GET",
    crossDomain: true,
    credentials:"include",
    headers: {
      "Content-Type": "application/json"
    },
  })
}

export const iniciarSesion = async (body) => {
  return fetch("http://localhost:5000/iniciar-sesion", {
    method: "POST",
    credentials:"include",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000"
    },
    body: JSON.stringify(body),
  })
}

export const cerrarSesion = async () => {
  return fetch("http://localhost:5000/cerrar-sesion", {
    method: "GET",
    crossDomain: true,
    credentials:"include",
    headers: {
      "Content-Type": "application/json"
    },
  })
}
