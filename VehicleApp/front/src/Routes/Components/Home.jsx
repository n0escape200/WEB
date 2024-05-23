import React, { useEffect, useState } from "react";
import Navbar from "../../SubComponents/Components/Navbar.jsx";
import Filter from "../../SubComponents/Components/Filter.jsx";
import Listing from "../../SubComponents/Components/Listing.jsx";

import "../CSS/Home.css";

import "../CSS/Home.css";
import axios from "axios";

const Home = () => {
  const [todayData, setTodayData] = useState([]);

  const getTodayCars = async () => {
    axios
      .get("http://localhost:3000/api/car/getTodayCars")
      .then((res) => {
        setTodayData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTodayCars();
  }, []);

  return (
    <div className="homeMain">
      <Navbar />
      <div className="homeContent">
        <div className="homeTop">
          <div className="cover">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "white",
                position: "absolute",
                top: 120,
                left: 150,
                fontWeight: 700,
                textShadow: "0px 0px 5px #FFFFFF",
              }}
            >
              <span style={{ fontSize: 52 }}>Welcome to Automoto</span>
              <span style={{ fontSize: 60 }}>
                Start driving your dreams today!
              </span>
            </div>
          </div>
          <div className="filter">
            <Filter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
