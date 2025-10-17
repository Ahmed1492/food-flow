import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Footer from "./components/Footer";
import LoginPop from "./components/LoginPop";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="">
      <Navbar setIsLogin={setIsLogin} />
      {isLogin && <LoginPop setIsLogin={setIsLogin} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route
          path="*"
          element={
            <div className=" text-3xl py-3  min-h-[41vh] px-[7%]  ">
              <h2 className="mt-[3rem] ">404 Not Found Page</h2>
            </div>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
