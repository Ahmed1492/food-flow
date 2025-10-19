import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import AddItems from "./pages/Add-Items";
import Sidebar from "./components/Sidebar";
import ListItems from "./pages/List-Items";
import Orders from "./pages/Orders";
import { ToastContainer } from "react-toastify";

const App = () => {
  const url = "http://localhost:4000";

  const [currenPage, setCurrentPage] = useState("add-items");

  return (
    <div className="pb-7">
      <ToastContainer />
      <Navbar />
      <div className="flex gap-7 w-full">
        <Sidebar currenPage={currenPage} setCurrentPage={setCurrentPage} />
        <Routes>
          <Route
            path="/"
            element={
              <AddItems
                url={url}
                currenPage={currenPage}
                setCurrentPage={setCurrentPage}
              />
            }
          />
          <Route
            path="/list"
            element={
              <ListItems
                url={url}
                urrenPage={currenPage}
                setCurrentPage={setCurrentPage}
              />
            }
          />
          <Route
            path="/orders"
            url={url}
            element={
              <Orders urrenPage={currenPage} setCurrentPage={setCurrentPage} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
