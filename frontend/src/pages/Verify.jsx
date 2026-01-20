import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext.jsx";
import axios from "axios";
const Verify = () => {
  const { url } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  // const location = useLocation();
  // let url = location.search.split("?")[1];
  // let success = url.split("&")[0].split("=")[1];
  // let orderId = url.split("&")[1].split("=")[1];

  // console.log("sucess ", success);
  // console.log("orderId ", orderId);

  const verifyPayment = async () => {
    try {
      let myResponse = await axios.post(
        `${url}/api/order/verify`,
        {
          orderId,
          success,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      );
      if (myResponse.data.success) {
        navigate("/my-orders");
      } else {
        navigate("/");
      }
      // console.log(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="spinner "></div>
    </div>
  );
};

export default Verify;
