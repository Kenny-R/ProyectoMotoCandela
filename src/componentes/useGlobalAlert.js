import { useContext } from "react"
import { AlertContext } from "./AlertProvider"

export const useGlobalAlert = () => {
    return useContext(AlertContext);
}