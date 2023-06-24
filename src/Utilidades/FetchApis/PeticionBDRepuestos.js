
/**
 * hace una peticion para que se almacene un nuevo producto en la base de datos
 * body recibe JSON.stringify({ tipo: tipoProducto, form: estadoForm })
 */
export const registrarProducto = async (body) => {
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
