import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Orders = ({ setCurrentPage }) => {
  const location = useLocation();
  let path = location.pathname;
  console.log(location.pathname);

  useEffect(() => {
    if (path === "/list") {
      setCurrentPage("list-items");
    } else if (path === "/orders") {
      setCurrentPage("orders");
    } else {
      setCurrentPage("add-items");
    }
  }, [location]);
  return <div className="">Orders</div>;
};

export default Orders;
