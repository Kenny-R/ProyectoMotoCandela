/**
 * hace una peticion para que se almacene un nuevo producto en la base de datos
 * body recibe JSON.stringify({ tipo: tipoProducto, form: estadoForm })
 */
export const peticionRegistrarProducto = async (body) => {
    return fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: body,
    });
};

export const peticionObtenerProductos = async (tipoProducto) => {
    return fetch(`http://localhost:5000/obtenerProductos?tipo=${tipoProducto}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });
};

export const peticionEliminarProducto = async (tipoProducto, datos) => {
    return fetch(
        "http://localhost:5000/eliminarProducto",
        {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({tipo: tipoProducto, datos: datos }),
        }
    );
}
