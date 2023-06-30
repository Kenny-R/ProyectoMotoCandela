import { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { chequearSesion } from "../../Utilidades/FetchApis/PeticionesBD";

/**
 * Components that makes a route only available for admin users.
 * The way this works is that everytime an user tries to access an
 * admin protected route, it does a health check of the admin cookie
 * and checks if it is present and valid.
 */
const RequiereAutorizacion = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [inicioSesion, setInicioSesion] = useState(false);
    useEffect(() => {
        console.log("compobando si existe la sesion del usuario...");
        const chequeoDeSesion = async () => {
            try {
                const resp = await chequearSesion();
                if (!resp.ok) {
                    navigate("/", {
                        state: { from: location },
                        replace: true,
                    });
                    return;
                }

                setInicioSesion(true);
            } catch (error) {}
        };

        chequeoDeSesion();
    });

    
    try {
        return inicioSesion ? <Outlet /> : <>Cargando...</>;
    } catch (e) {
        return (
            <Navigate
                to={"/no-autorizado"}
                state={{ from: location }}
                replace
            />
        );
    }
};

export default RequiereAutorizacion;
