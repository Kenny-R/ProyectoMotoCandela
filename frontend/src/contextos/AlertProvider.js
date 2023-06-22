import { createContext, useRef, useState } from "react";

// msg: "", severity: "", type: ""
export const AlertContext = createContext({});

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({});
  let timeOutID = useRef(undefined);

  const popAlert = (text, severity) => {
    if (timeOutID.current !== undefined) clearTimeout(timeOutID.current);

    setAlert({ text: text, severity: severity, fade: true });

    timeOutID.current = setTimeout(() => {
      setAlert({});
    }, 4000);
  };

  return (
    <AlertContext.Provider value={{ alert, popAlert }}>
      {children}
    </AlertContext.Provider>
  );
};