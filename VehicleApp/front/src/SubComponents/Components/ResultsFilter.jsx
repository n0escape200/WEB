import React, { useState } from "react";
import "../CSS/ResultsFilter.css";

const ResultsFilter = () => {
  const [selected, setSelected] = useState("Cars");
  return (
    <div className="resultsfilterMain">
      <div className="resultsfilterContent">
        <div className="top">
          <span
            className={selected == "Cars" ? " option Cars" : "option"}
            onClick={() => setSelected("Cars")}
          >
            Cars
          </span>
          <span
            className={
              selected == "Motorcycles" ? " option Motorcycles" : "option"
            }
            onClick={() => setSelected("Motorcycles")}
          >
            Motorcycles
          </span>
          <span
            className={selected == "Trucks" ? " option Trucks" : "option"}
            onClick={() => setSelected("Trucks")}
          >
            Trucks
          </span>
          <span
            className={selected == "Parts" ? " option Parts" : "option"}
            onClick={() => setSelected("Parts")}
          >
            Parts
          </span>
        </div>
        <div className={`${selected} bottom`}>
          <select id="brand">
            <option value="#">Select a brand...</option>
          </select>
          <select id="brand">
            <option value="#">Select a brand...</option>
          </select>
          <select id="brand">
            <option value="#">Select a brand...</option>
          </select>
          <select id="brand">
            <option value="#">Select a brand...</option>
          </select>
          <select id="brand">
            <option value="#">Select a brand...</option>
          </select>
          <select id="brand">
            <option value="#">Select a brand...</option>
          </select>
          <select id="brand">
            <option value="#">Select a brand...</option>
          </select>
          <select id="brand">
            <option value="#">Select a brand...</option>
          </select>
          <select id="brand">
            <option value="#">Select a brand...</option>
          </select>
          <select id="brand">
            <option value="#">Select a brand...</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ResultsFilter;
