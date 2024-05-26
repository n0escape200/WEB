import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home/home.jsx"


const home = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  }
])

function App() {
  const [count, setCount] = useState(0)

  return <>
  <RouterProvider router={home}/>
  </>
}

export default App
