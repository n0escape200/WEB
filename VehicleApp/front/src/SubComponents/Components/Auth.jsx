import "../CSS/Auth.css";
import { useRef, useState } from "react";
import axios from "axios";

const Auth = ({ type = "login", authRef, setAuthPanel }) => {
  const [loginPayload, setLoginPayload] = useState({
    username: "",
    password: "",
  });

  const [registerPayload, setEegisterPayload] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });

  const login = async () => {
    axios
      .post("http://localhost:3000/api/user/login", loginPayload, {
        withCredentials: true,
      })
      .then((res) => {
        setAuthPanel(0);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="authMain">
      <div className="authBackground"></div>
      <div ref={authRef} className="authContent">
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="body"
        >
          {type == "login" ? (
            <>
              <span style={{ fontSize: 36, fontWeight: 700 }}>
                Welcome back
              </span>
              <span style={{ fontWeight: 700, color: "rgba(0,0,0,0.55)" }}>
                Please enter your details
              </span>
              <div className="label">
                <span>Username</span>
                <input
                  onChange={(event) => {
                    setLoginPayload({
                      ...loginPayload,
                      username: event.target.value,
                    });
                  }}
                  type="text"
                  placeholder="yourAllias"
                />
              </div>
              <div className="label">
                <span>Password</span>
                <input
                  onChange={(event) => {
                    setLoginPayload({
                      ...loginPayload,
                      password: event.target.value,
                    });
                  }}
                  type="password"
                  placeholder="********"
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <input type="checkbox" name="" id="" />
                  <span>Remember me</span>
                </div>
                <span style={{ textDecoration: "underline" }}>
                  Forgot password
                </span>
              </div>
              <span
                style={{
                  textAlign: "center",
                  backgroundColor: "#1c448e",
                  color: "white",
                  borderRadius: 5,
                  padding: 5,
                  fontSize: 25,
                }}
                onClick={() => {
                  login();
                }}
              >
                Sign in
              </span>
            </>
          ) : (
            <>
              <span style={{ fontSize: 36, fontWeight: 700 }}>
                Sign up to cotinue
              </span>
              <span style={{ fontWeight: 700, color: "rgba(0,0,0,0.55)" }}>
                Please enter your details
              </span>
              <div className="label">
                <span>Username</span>
                <input type="text" placeholder="yourAllias" />
              </div>
              <div className="label">
                <span>First name</span>
                <input type="text" placeholder="John" />
              </div>
              <div className="label">
                <span>Last name</span>
                <input type="text" placeholder="Smith" />
              </div>
              <div className="label">
                <span>Email</span>
                <input type="text" placeholder="yourName@domain.com" />
              </div>
              <div className="label">
                <span>Phone</span>
                <input type="number" placeholder="076424512" />
              </div>
              <div className="label">
                <span>Password</span>
                <input type="password" placeholder="********" />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <input type="checkbox" name="" id="" />
                  <span>Remember me</span>
                </div>
                <span style={{ textDecoration: "underline" }}>
                  Forgot password
                </span>
              </div>
              <span
                style={{
                  textAlign: "center",
                  backgroundColor: "#1c448e",
                  color: "white",
                  borderRadius: 5,
                  padding: 5,
                  fontSize: 25,
                }}
              >
                Sign up
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
