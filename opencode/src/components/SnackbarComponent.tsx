import React from "react";
import { Snackbar } from "@mui/material";

interface IPropsSnackbar {
  open: boolean;
  onClose: () => void;
  message: string;
}

const SnackbarComponent: React.FC<IPropsSnackbar> = ({
  open,
  onClose,
  message,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      message={message}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    />
  );
};

export default SnackbarComponent;
