import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import SelectYear from "../../SubComponents/Components/SelectYear.jsx";
import SelectPrice from "./SelectPrice.jsx";
import "../CSS/Filter.css";
import axios from "axios";
const Filter = () => {
  const brandRef = useRef(null);
  const modelRef = useRef(null);

  const [yearPanel, setYearPanel] = useState(false);
  const [pricePanel, setPricePanel] = useState(false);
  const [brandPanel, setBrandPanel] = useState(false);
  const [modelPanel, setModelPanel] = useState(false);

  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("2024");

  const [fromPrice, setFromPrice] = useState("");
  const [toPrice, setToPrice] = useState("");

  const [data, setData] = useState();

  const [brandArray, setBrandArray] = useState([]);
  const [filterBrand, setFilterBrand] = useState([]);
  const [brand, setBrand] = useState("");

  const [modelArray, setModelArray] = useState([]);
  const [filterModel, setFilterModel] = useState([]);
  const [model, setModel] = useState("");

  const getData = async () => {
    await axios
      .get("http://localhost:3000/api/data/getData")
      .then((res) => {
        setData(res.data[0].data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const array = [];
    if (data) {
      data.map((item) => {
        array.push(item.brand);
      });
      setBrandArray(array);
    }
  }, [data]);

  useEffect(() => {
    if (brand && data) {
      const filteredArray = data.filter((item) => {
        const value = item.brand.toUpperCase();
        return value.includes(brand.toUpperCase());
      });
      setFilterBrand(filteredArray);

      data.map((item) => {
        if (item.brand.toUpperCase() == brand.toUpperCase()) {
          setModelArray(item.models);
        }
      });

      if (model.length != 0) {
        setModel("");
      }
    }
  }, [brand]);

  useEffect(() => {
    if (model) {
      const filteredArray = modelArray.filter((item) => {
        const value = item.toUpperCase();
        return value.includes(model.toUpperCase());
      });
      setFilterModel(filteredArray);
    }
  }, [model]);

  useEffect(() => {
    const handleClick = (event) => {
      if (brandRef.current && !brandRef.current.contains(event.target)) {
        setBrandPanel(false);
      }
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        setModelPanel(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [brandRef]);

  return (
    <div className="filterMain">
      <div className="filterContent">
        <div ref={brandRef} style={{ position: "relative" }} className="label">
          <input
            placeholder=" "
            className="labelField"
            type="text"
            value={brand}
            onChange={(event) => {
              setBrand(event.target.value);
            }}
            onFocus={() => {
              setBrandPanel(true);
            }}
          />
          <span className="labelText">Brand</span>
          {brandPanel && (
            <div
              style={{
                position: "absolute",
                backgroundColor: "white",
                border: "1px solid black",
                top: 65,
                left: -20,
                padding: "0px 10px 0px 10px",
              }}
            >
              {brandArray && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxHeight: 200,
                    width: "fit-content",
                    overflow: "scroll",
                    overflowX: "hidden",
                    padding: 10,
                  }}
                >
                  {brand.length == 0 ? (
                    <>
                      {brandArray.map((item, index) => (
                        <option
                          onClick={(event) => {
                            setBrand(event.target.value);
                            setBrandPanel(false);
                          }}
                          key={index}
                        >
                          {item}
                        </option>
                      ))}
                    </>
                  ) : (
                    <>
                      {filterBrand.map((item, index) => (
                        <option
                          onClick={(event) => {
                            setBrand(event.target.value);
                            setBrandPanel(false);
                          }}
                          key={index}
                        >
                          {item.brand}
                        </option>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          <div style={{ top: "50%", right: -20 }} className="column"></div>
        </div>

        <div ref={modelRef} style={{ position: "relative" }} className="label">
          <input
            placeholder=" "
            className="labelField"
            type="text"
            value={model}
            onChange={(event) => {
              setModel(event.target.value);
            }}
            disabled={modelArray.length == 0 ? true : false}
            onFocus={() => {
              setModelPanel(true);
            }}
          />
          <span className="labelText">Model </span>
          {modelPanel && (
            <div
              style={{
                position: "absolute",
                backgroundColor: "white",
                border: "1px solid black",
                top: 65,
                left: -20,
                padding: "0px 10px 0px 10px",
                maxHeight: 200,
                overflow: "scroll",
                overflowX: "hidden",
              }}
            >
              {model.length == 0 ? (
                <>
                  {modelArray.map((item, index) => {
                    return (
                      <option
                        onClick={(event) => {
                          setModel(event.target.value);
                          setModelPanel(false);
                        }}
                        key={index}
                      >
                        {item}
                      </option>
                    );
                  })}
                </>
              ) : (
                <>
                  {filterModel.map((item, index) => {
                    return (
                      <option
                        onClick={(event) => {
                          setModel(event.target.value);
                          setModelPanel(false);
                        }}
                        key={index}
                      >
                        {item}
                      </option>
                    );
                  })}
                </>
              )}
            </div>
          )}
          <div style={{ top: "50%", right: -20 }} className="column"></div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
          className="label"
        >
          <span>Year </span>
          <FontAwesomeIcon
            onClick={() => setYearPanel(!yearPanel)}
            size="xs"
            icon={faChevronDown}
            className="yearDropdown"
          />

          {yearPanel && (
            <SelectYear
              fromYear={fromYear}
              setFromYear={setFromYear}
              toYear={toYear}
              setToYear={setToYear}
              setYearPanel={setYearPanel}
            />
          )}
          <div
            style={{
              position: "absolute",
              display: "flex",
              top: 35,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 19,
              borderTop: "1px solid black",
              alignItems: "center",
            }}
          >
            <span>{fromYear}</span>
            {fromYear != "" && <FontAwesomeIcon icon={faArrowRightLong} />}
            <span>{toYear}</span>
          </div>
          <div style={{ top: "50%", right: -30 }} className="column"></div>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
          className="label"
        >
          <span>Price </span>
          <FontAwesomeIcon
            className="yearDropdown"
            size="xs"
            icon={faChevronDown}
            onClick={() => {
              setPricePanel(!pricePanel);
            }}
          />
          {pricePanel && (
            <SelectPrice
              fromPrice={fromPrice}
              setFromPrice={setFromPrice}
              toPrice={toPrice}
              setToPrice={setToPrice}
              setPricePanel={setPricePanel}
            />
          )}
          <div style={{ top: "50%", right: -20 }} className="column"></div>
        </div>
        <span className="submitBtn">SUBMIT</span>
      </div>
    </div>
  );
};

export default Filter;
