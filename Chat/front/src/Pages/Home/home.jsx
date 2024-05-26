import React, { useEffect, useRef, useState } from "react";
import Message from "../../Components/Message.jsx";
import axios from "axios";
import io from "socket.io-client";
import "./home.css";

const home = () => {
  const socket = io("http://localhost:3000");

  const textRef = useRef();
  const [curretMsg, setCurrentMsg] = useState("");

  const [chatHistory, setChatHistory] = useState([]);

  const getChatHistory = async () => {
    await axios
      .get("http://localhost:3000/whatsapp/getChat")
      .then((res) => {
        if (res.data) {
          res.data.map((value, index) => {
            if (value.number != 40754634204) {
              setChatHistory((prevData) => [
                { side: "right", message: value.message },
                ...prevData,
              ]);
            } else {
              setChatHistory((prevData) => [
                { side: "left", message: value.message },
                ...prevData,
              ]);
            }
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getChatHistory();
  }, []);

  const sendMsg = async () => {
    await axios.post("http://localhost:3000/whatsapp/send", {
      to: 40754634204,
      message: curretMsg,
    });
    setChatHistory((prevData) => [
      { side: "right", message: curretMsg },
      ...prevData,
    ]);
  };

  useEffect(() => {
    socket.on("whatsappMessage", (message) => {
      setChatHistory((prevData) => [
        { side: "left", message: message },
        ...prevData,
      ]);
    });
  }, []);

  return (
    <div className="homeContainer">
      <div className="content">
        <div className="chatHistory">
          {chatHistory.map((data, index) => (
            <Message key={index} side={data.side} message={data.message} />
          ))}
        </div>
        <div className="textInput">
          <input
            onChange={(e) => {
              setCurrentMsg(e.target.value);
            }}
            type="text"
            ref={textRef}
          />
          <span
            onClick={() => {
              if (curretMsg != "") {
                console.log("sent");
                sendMsg();
                textRef.current.value = "";
                setCurrentMsg("");
              }
            }}
          >
            Send
          </span>
        </div>
      </div>
    </div>
  );
};

export default home;
