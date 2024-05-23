import { useEffect, useRef, useState } from "react";
import React from "react";
import Navbar from "../../SubComponents/Components/Navbar.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import "../CSS/Add.css";

const Add = () => {
  //Used for making custom file input
  const addPhotoRef = useRef();

  //Array that hold the added photos in the gallery
  const [photoArray, setPhotoArray] = useState([]);

  //Shows witch type on vehicle to add
  const [active, setActive] = useState("Cars");

  //The data from the API call
  const [data, setData] = useState(undefined);

  //For deleting photos and also display the delte button over
  //the hovered image
  const [deletePhoto, setDeletePhoto] = useState(undefined);

  const handleButtonClick = () => {
    addPhotoRef.current.click();
  };

  const handleAddPhoto = (event) => {
    let array = [];
    for (let i = 0; i < event.target.files.length; i++) {
      const element = event.target.files[i];
      array.push(element);
    }
    setPhotoArray([...photoArray, ...array]);
  };

  //Field for other input fields
  const [currentBrand, setCurrentBrand] = useState({
    brand: undefined,
    index: undefined,
  });
  const [currentModel, setCurrentModel] = useState("");
  const [km, setKM] = useState("");
  const [cc, setCC] = useState("");
  const [year, setYear] = useState(2024);
  const [fuel, setFuel] = useState("Diesel");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [condition, setCondition] = useState("");

  //Used for error handleing
  const [error, setError] = useState({ state: false, message: "...to add" });

  //On 200 status
  const [submit, setSubmit] = useState(false);

  //The API call witch gets the JSON from the database
  const getData = async () => {
    await axios
      .get("http://localhost:3000/api/data/getData")
      .then((res) => {
        setData(res.data[0].data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Getting the data from the API call
  useEffect(() => {
    getData();
  }, []);

  //Function for submitting the data
  const submitData = async () => {
    const token = Cookies.get("User");

    if (token) {
      const formData = new FormData();

      // Append form data fields
      formData.append("brand", currentBrand.brand);
      formData.append("model", currentModel);
      formData.append("KM", km);
      formData.append("CC", cc);
      formData.append("year", year);
      formData.append("price", price);
      formData.append("currency", currency);
      formData.append("description", description);
      formData.append("fuel", fuel);
      formData.append("owner", jwtDecode(token).findUser._id);
      formData.append("country", country);
      formData.append("county", state);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("condition", condition);
      photoArray.forEach((file) => {
        formData.append(`photos`, file);
      });

      await axios
        .post(
          `http://localhost:3000/api/car/create/${
            jwtDecode(token).findUser._id
          }`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          setSubmit(true);
          setTimeout(() => {
            setSubmit(false);
          }, 2000);
        })
        .catch((err) => {
          setError({ state: true, message: err.response.data.message });
          setTimeout(() => {
            setError({ error: false, message: "" });
          }, 2000);
        });
    } else {
      setError({ state: true, message: "Must login first" });
      setTimeout(() => {
        setError({ state: false, message: "" });
      }, 2000);
    }
  };

  const handleBrand = (event) => {
    setCurrentBrand((prevData) => ({ ...prevData, brand: event.target.value }));
    if (data) {
      data.map((item, i) => {
        if (item.brand == event.target.value) {
          setCurrentBrand(
            (prevData) =>
              //'index' is for pulling the models from the specific index inside 'data"
              setCurrentBrand({ ...prevData, index: i }),
            setCurrentModel(data[i].models[0])
          );
          return;
        }
      });
    }
  };

  return (
    <div className="addMain">
      <Navbar />
      <form
        onSubmit={(event) => event.preventDefault()}
        encType="multipart/form-data"
      >
        <div className="addContent">
          <div className="top">
            <span
              className={active == "Cars" ? "active fltBtn" : "fltBtn"}
              onClick={() => setActive("Cars")}
            >
              Cars
            </span>
            <span
              className={active == "Motorcycles" ? "active fltBtn" : "fltBtn"}
              onClick={() => setActive("Motorcycles")}
            >
              Motorcycles
            </span>
            <span
              className={active == "Trucks" ? "active fltBtn" : "fltBtn"}
              onClick={() => setActive("Trucks")}
            >
              Trucks
            </span>
            <span
              className={active == "Parts" ? "active fltBtn" : "fltBtn"}
              onClick={() => setActive("Parts")}
            >
              Parts
            </span>
          </div>
          <div className="middle">
            <div className="label">
              <span>Brand</span>
              <select onChange={handleBrand} id="Brand">
                <option value="">Select...</option>
                {data &&
                  data.map((item, index) => (
                    <option key={index} value={item.brand}>
                      {item.brand}
                    </option>
                  ))}
              </select>
            </div>
            <div className="label">
              <span>Model</span>
              <select
                onChange={(event) => {
                  setCurrentModel(event.target.value);
                }}
                id="Model"
                value={currentModel}
              >
                <option value="">Select...</option>
                {data &&
                  currentBrand &&
                  data[currentBrand.index] &&
                  data[currentBrand.index].models.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
              </select>
            </div>
            <div className="label">
              <span>Condition</span>
              <select
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
                name=""
                id=""
              >
                <option value="">Select...</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Unusable">Unusable</option>
              </select>
            </div>
            <div className="label">
              <span>KM</span>
              <input
                onChange={(event) => {
                  setKM(event.target.value);
                }}
                type="number"
                name=""
                id=""
              />
            </div>
            <div className="label">
              <span>Select CC</span>
              <input
                onChange={(event) => {
                  setCC(event.target.value);
                }}
                type="number"
                name=""
                id=""
              />
            </div>
            <div className="label">
              <span>Select Year</span>
              <select
                onChange={(event) => {
                  setYear(event.target.value);
                }}
                id="Year"
              >
                <option value="">Select...</option>
                <option value="2024">2024</option>
              </select>
            </div>
            <div className="label">
              <span>Select Fuel</span>
              <select
                onChange={(event) => {
                  setFuel(event.target.value);
                }}
                id="Fuel"
              >
                <option value="">Select...</option>
                <option value="Diesel">Diesel</option>
                <option value="Diesel">Gasoline</option>
              </select>
            </div>
            <div className="label">
              <span>Price:</span>
              <div className="currency">
                <input
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                  type="number"
                  name=""
                  id=""
                />
                <select
                  onChange={(event) => {
                    setCurrency(event.target.value);
                  }}
                  name="currency"
                  id=""
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
            <div className="label">
              <span>Country:</span>
              <select
                onChange={(event) => {
                  setCountry(event.target.value);
                }}
                name=""
                id=""
              >
                <option value="">Select...</option>
                <option value="Romania">Romania</option>
              </select>
            </div>
            <div className="label">
              <span>County/State:</span>
              <select
                onChange={(event) => {
                  setState(event.target.value);
                }}
                name=""
                id=""
              >
                <option value="">Select...</option>
                <option value="Suceava">Suceava</option>
              </select>
            </div>
            <div className="label">
              <span>City</span>
              <select
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                name=""
                id=""
              >
                <option value="">Select...</option>
                <option value="Radauti">Radauti</option>
              </select>
            </div>
            <div className="label">
              <span>Address:</span>
              <input
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                type="text"
              />
            </div>
            <div>
              <span>Add photos:</span>
              <input
                ref={addPhotoRef}
                onChange={handleAddPhoto}
                style={{ display: "none" }}
                type="file"
                multiple
              />
              <div className="photoInput">
                {photoArray.length == 0 ? (
                  <>
                    <div onClick={handleButtonClick} className="addPhotoBtn">
                      +
                    </div>
                  </>
                ) : (
                  <div className="imgGallery">
                    {photoArray.map((item, index) => {
                      return (
                        <div
                          onMouseEnter={() => {
                            setDeletePhoto(index);
                          }}
                          onMouseLeave={() => {
                            setDeletePhoto(undefined);
                          }}
                          className="imgContainer"
                          key={index}
                        >
                          <img
                            className="imgGalleryAdd"
                            src={URL.createObjectURL(item)}
                            value={index}
                            alt=""
                          />
                          {deletePhoto == index && (
                            <div
                              onClick={() => {
                                let aux = [];
                                for (let i = 0; i < photoArray.length; i++) {
                                  if (i != deletePhoto) {
                                    aux.push(photoArray[i]);
                                  }
                                }
                                setPhotoArray(aux);
                              }}
                              className="imgDel"
                            >
                              <FontAwesomeIcon
                                className="trashIcon"
                                icon={faTrash}
                                size="2xl"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <div className="galleryBtn" onClick={handleButtonClick}>
                      +
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="label description">
              <span>Description:</span>
              <textarea
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                name="description"
                id="description"
              ></textarea>
            </div>
          </div>
          <input
            onClick={() => {
              submitData();
            }}
            className="submit"
            type="submit"
            value="Submit"
          />

          {error.state && <div className="errorMsg">{error.message}</div>}
          {submit && <div className="submitMsg">Submision added</div>}
        </div>
      </form>
    </div>
  );
};

export default Add;
