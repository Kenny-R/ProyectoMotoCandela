import { useContext } from "react"
import { AlertContext } from "../contextos/AlertProvider"

export const useGlobalAlert = () => {
    return useContext(AlertContext);
}