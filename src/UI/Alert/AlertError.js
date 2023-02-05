import React from "react";
import { Alert } from "@mui/material";

const AlertError = ({ error, ...props }) => {
    if(!error) return null;
    
    return (
        <Alert {...props} severity="error">{error}</Alert>
    );
}

export default AlertError;