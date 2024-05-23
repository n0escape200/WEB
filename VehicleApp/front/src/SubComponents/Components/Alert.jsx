import React from "react";

const Alert = ({ msg = "Error" }) => {
  return (
    <div className="alertMain">
      <div className="alertContent">{msg}</div>
    </div>
  );
};

export default Alert;
