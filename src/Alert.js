import React, { useEffect } from "react";
import { timeout } from "q";

const Alert = ({ turnOffAlert, msg, type, list }) => {
  useEffect(() => {
    setTimeout(() => {
      turnOffAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
