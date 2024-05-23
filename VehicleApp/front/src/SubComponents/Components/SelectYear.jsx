import { useEffect, useRef, useState } from "react";
import "../CSS/SelectYear.css";

const SelectYear = ({
  fromYear,
  setFromYear,
  toYear,
  setToYear,
  setYearPanel,
}) => {
  const yearRef = useRef(null);

  useEffect(() => {
    const handleYearPanel = (event) => {
      if (yearRef.current && !yearRef.current.contains(event.target)) {
        setYearPanel(false);
      }
    };
    document.addEventListener("mousedown", handleYearPanel);

    return () => {
      document.removeEventListener("mousedown", handleYearPanel);
    };
  }, [yearRef]);

  return (
    <div ref={yearRef} className="yearMain">
      <div className="yearContent">
        <div className="label">
          <span style={{ fontSize: 21 }}>From:</span>
          <input
            type="text"
            onChange={(event) => {
              const input = event.target.value.replace(/\D/g, "");
              setFromYear(input);
            }}
            value={fromYear}
            maxLength={4}
          />
        </div>
        <div className="label">
          <span style={{ fontSize: 21 }}>To:</span>
          <input
            type="text"
            onChange={(event) => {
              const input = event.target.value.replace(/\D/g, "");
              setToYear(input);
            }}
            value={toYear}
            maxLength={4}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectYear;
