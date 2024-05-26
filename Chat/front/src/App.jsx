import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/home.jsx";
import "./App.css";

const home = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <div className="appContent">
      <RouterProvider router={home} />
    </div>
  );
}

export default App;
