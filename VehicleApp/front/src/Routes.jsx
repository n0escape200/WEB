import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/home.jsx";

const HomeRoute = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const Routes = () => {
  return (
    <>
      <RouterProvider router={HomeRoute} />
    </>
  );
};

export default Routes;
