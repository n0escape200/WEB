import React from "react";
import "../CSS/Option.css";

const Option = () => {
  return (
    <div className="optionMain">
      <div className="optionContent">
        <img src="https://i.imgur.com/2a4RyCx.jpeg" alt="car image" />
        <div className="middle">
          <span>Mathew</span>
          <span>Private seller</span>
          <span>Account made 3y ago</span>
        </div>
        <div className="right">
          <span>12 000 EUR</span>
          <span>Non nogiciable</span>
          <span>Used</span>
          <span>Suceava, Radauti</span>
        </div>
      </div>
    </div>
  );
};

export default Option;
