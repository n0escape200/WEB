import React from "react";
import "./Message.css";

const Message = ({ side, message }) => {
  return (
    <div className={`messageContainer  ${side == "right" ? "floatRight" : ""}`}>
      <div className="content">
        {side == "left" ? (
          <div className="left">{message}</div>
        ) : (
          <div className="right">{message}</div>
        )}
      </div>
    </div>
  );
};

export default Message;
