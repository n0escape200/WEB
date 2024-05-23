import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Components/Home.jsx";
import Results from "./Routes/Components/Results.jsx";
import Item from "./Routes/Components/Item.jsx";
import Add from "./Routes/Components/Add.jsx";
import User from "./Routes/Components/User.jsx";
import Settings from "./Routes/Components/Settings.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/add" element={<Add />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/settings/:id" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
