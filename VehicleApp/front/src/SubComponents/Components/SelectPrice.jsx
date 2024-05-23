import { useEffect, useRef } from "react";
import "../CSS/SelectPrice.css";

const SelectPrice = ({
  fromPrice,
  setFromPrice,
  toPrice,
  setToPrice,
  setPricePanel,
}) => {
  const priceRef = useRef(null);

  useEffect(() => {
    const handlePriceClick = (event) => {
      if (priceRef.current && !priceRef.current.contains(event.target)) {
        setPricePanel(false);
      }
    };
    document.addEventListener("mousedown", handlePriceClick);
    return () => {
      document.removeEventListener("mousedown", handlePriceClick);
    };
  }, [priceRef]);

  return (
    <div ref={priceRef} className="priceMain">
      <div className="priceContent">
        <div className="label">
          <span>From:</span>
          <input
            value={fromPrice}
            onChange={(event) => {
              setFromPrice(event.target.value);
            }}
            type="number"
            name=""
            id=""
          />
        </div>
        <div className="label">
          <span>To:</span>
          <input
            value={toPrice}
            onChange={(event) => {
              setToPrice(event.target.value);
            }}
            type="number"
            name=""
            id=""
          />
        </div>
      </div>
    </div>
  );
};

export default SelectPrice;
