import React, { useEffect, useState } from "react";
import "../CSS/Settings.css";
import Navbar from "../../SubComponents/Components/Navbar";
import axios from "axios";
import { useParams } from "react-router";

const Settings = () => {
  const params = useParams();
  const [user, setUser] = useState();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phone, setPhone] = useState();

  const getData = async () => {
    await axios
      .get(`http://localhost:3000/api/user/findUser/${params.id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const updateData = async (data) => {
    await axios
      .post(`http://localhost:3000/api/user/updateUser/${params.id}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    getData();
  };

  return (
    <div className="settingsMain">
      <Navbar />
      {user && (
        <div className="settingsContent">
          <div className="label">
            <h3>Chnage the name:</h3>
            <span>First name</span>
            <input
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              placeholder={user.firstname}
              type="text"
              name=""
              id="firstName"
            />
            <span>Last name</span>
            <input
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              placeholder={user.lastname}
              type="text"
              name=""
              id="lastName"
            />
            <span
              onClick={() =>
                updateData({ firstname: firstName, lastname: lastName })
              }
              className="submit"
            >
              Submit
            </span>
          </div>
          <div className="label">
            <h3>Change the email:</h3>
            <span>Email:</span>
            <input
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              placeholder={user.email}
              type="email"
              name=""
              id="email"
            />
            <span
              onClick={() => updateData({ email: email })}
              className="submit"
            >
              Submit
            </span>
          </div>
          <div className="label">
            <h3>Change the password</h3>
            <span>Password:</span>
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="****"
              type="password"
              name=""
              id="password"
            />
            <span>Confirm:</span>
            <input
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              placeholder="****"
              type="password"
              name=""
              id="confirmPassword"
            />
            <span
              onClick={() => updateData({ password: password })}
              className="submit"
            >
              Submit
            </span>
          </div>
          <div className="label">
            <h3>Change the phone number:</h3>
            <span>Phone:</span>
            <input
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              placeholder={user.phone}
              type="text"
              name=""
              id="phone"
            />
            <span
              onClick={() => updateData({ phone: phone })}
              className="submit"
            >
              Submit
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
