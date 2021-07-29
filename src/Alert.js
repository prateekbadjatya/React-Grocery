import React, { useEffect } from "react";
import { timeout } from "q";

const Alert = ({ turnOffAlert, msg, type }) => {
  useEffect(() => {
    setTimeout(() => {
      turnOffAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
