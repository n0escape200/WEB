import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Listing.css";
import axios from "axios";

const Listing = ({
  id,
  type,
  brand,
  model,
  km,
  cc,
  year,
  fuel,
  price,
  currency,
  photo = "",
}) => {
  const navigate = useNavigate();
  return (
    <div className="listingMain">
      <div className="listingContent">
        {type == "portrait" ? (
          <div className="portraitMain">
            <div
              onClick={() => {
                navigate(`/item/${id}`);
              }}
              className="portraitContent"
            >
              <img src={photo} />
              <span>{brand}</span>
              <span>{model}</span>
              <span>{year}</span>
              <span>
                {price}
                {currency}
              </span>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              navigate(`/item/${id}`);
            }}
            className="landscape"
          >
            <img src={photo} alt="Car" />
            <div className="right">
              <span>{brand}</span>
              <span>{model}</span>
              <span>{year}</span>
              <span>{cc}</span>
              <span>{km}</span>
              <span>{fuel}</span>
              <span>
                {price}
                {currency}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listing;
