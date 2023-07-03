import { Alert, Fade } from "@mui/material";
import { useGlobalAlert } from "../hooks/useGlobalAlert";

const GlobalAlert = () => {
  const { alert } = useGlobalAlert();

  return Object.keys(alert).length === 0 ? (
    <></>
  ) : (
    <Fade in={alert.fade}>
      <Alert
        severity={alert.severity}
        style={{ position: "fixed", zIndex: 2000 }}
      >
        {alert.text}
      </Alert>
    </Fade>
  );
};

export default GlobalAlert;
