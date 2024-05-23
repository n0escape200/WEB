import React, { useEffect, useRef, useState } from "react";
import Auth from "./Auth.jsx";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faCartArrowDown,
  faComments,
  faPerson,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "../CSS/Navbar.css";

const Navbar = () => {
  const authRef = useRef(null);
  const [authPanel, setAuthPanel] = useState(0);

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const handleClick = (event) => {
      if (authRef.current && !authRef.current.contains(event.target)) {
        setAuthPanel(0);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [authPanel]);

  useEffect(() => {
    const token = Cookies.get("User");
    if (token) {
      const data = jwtDecode(token).findUser;
      console.log(data);
      setUser(data);
    }
  }, [authPanel]);

  return (
    <div className="navbarMain">
      <div className="navbarContent">
        <div className="left">
          <span style={{ fontSize: 32 }}>Automoto</span>
        </div>
        <div style={{ fontSize: 23 }} className="right">
          <span>Dealers</span>
          <span>Sellers</span>
          {user == undefined && (
            <div>
              <span
                onClick={() => {
                  if (authPanel != 1) {
                    setAuthPanel(1);
                  } else {
                    setAuthPanel(0);
                  }
                }}
                className="authButton"
              >
                Sign up{" "}
              </span>
              or
              <span
                onClick={() => {
                  if (authPanel != 2) {
                    setAuthPanel(2);
                  } else {
                    setAuthPanel(0);
                  }
                }}
                className="authButton"
              >
                {" "}
                Sign in
              </span>
            </div>
          )}
          <span className="postButton">Post ad</span>
          <FontAwesomeIcon icon={faComments} />
          <div style={{ position: "relative" }}>
            <FontAwesomeIcon color={user && "#1c448e"} icon={faUser} />
            <FontAwesomeIcon color={user && "#1c448e"} icon={faCaretUp} />
          </div>
        </div>
      </div>
      {authPanel == 2 ? (
        <Auth authRef={authRef} setAuthPanel={setAuthPanel} setUser={setUser} />
      ) : authPanel == 1 ? (
        <Auth type="register" authRef={authRef} setAuthPanel={setAuthPanel} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
