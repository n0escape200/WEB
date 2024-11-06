import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.tsx"
import Auth from "./Pages/Login/Auth.tsx";
import PostCar from "./Pages/PostCar/PostCar.tsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = "/auth:login" element={<Auth type={true}/>}/>
            <Route path = "/auth:register" element={<Auth type={false}/>} />
            <Route path = "/addpost" element={<PostCar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
