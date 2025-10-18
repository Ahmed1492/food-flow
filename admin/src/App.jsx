import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import AddItems from "./pages/Add-Items";
import Sidebar from "./components/Sidebar";
import ListItems from "./pages/List-Items";
import Orders from "./pages/Orders";

const App = () => {
  const [currenPage, setCurrentPage] = useState("add-items");

  return (
    <div className="">
      <Navbar />
      <div className="flex gap-7 w-full">
        <Sidebar currenPage={currenPage} setCurrentPage={setCurrentPage} />
        <Routes>
          <Route path="/" element={<AddItems urrenPage={currenPage} setCurrentPage={setCurrentPage} />} />
          <Route path="/list" element={<ListItems urrenPage={currenPage} setCurrentPage={setCurrentPage} />} />
          <Route path="/orders" element={<Orders urrenPage={currenPage} setCurrentPage={setCurrentPage} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
