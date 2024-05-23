import React, { useEffect, useState } from "react";
import Navbar from "../../SubComponents/Components/Navbar.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../CSS/Item.css";
import User from "../../../../back/Models/User.js";
const Item = () => {
  const params = useParams();
  const [data, setData] = useState();
  const [user, setUser] = useState();

  const fetchData = async () => {
    await axios
      .get(`http://localhost:3000/api/car/findById/${params.id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchUser = async () => {
    await axios
      .get(`http://localhost:3000/api/user/findUser/${data.owner}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [imageArray, setImageArray] = useState(undefined);
  const [currentImg, setCurrentImg] = useState(undefined);

  useEffect(() => {
    if (data) {
      setImageArray(data.photos);
      if (imageArray) {
        setCurrentImg(imageArray[0]);
      }
      fetchUser();
    }
  }, [data]);

  return (
    <div className="itemMain">
      <Navbar />
      {data && user && (
        <div className="itemContent">
          <div className="middle">
            <div className="gallery">
              <div className="mainphoto">
                <img src={`../../../photos/${currentImg}`} alt="car img" />
              </div>
              <div className="photos">
                {imageArray.map((value, index) => (
                  <img
                    onClick={() => setCurrentImg(value)}
                    src={`../../../photos/${value}`}
                    alt="car image"
                    key={index}
                  />
                ))}
              </div>
            </div>
            <div className="information">
              <span>{data.brand}</span>
              <span>{data.model}</span>
              <span>
                {data.price}
                {data.currency}
              </span>
              <span>{data.condition}</span>
              <span>
                {user.firstname} {user.lastname}
              </span>
              <span>
                {data.country},{data.county},{data.city}
              </span>
              <span></span>
              <span>{user.phone}</span>
            </div>
          </div>
          <div className="bottom">
            <span>Post description:</span>
            <p>{data.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
