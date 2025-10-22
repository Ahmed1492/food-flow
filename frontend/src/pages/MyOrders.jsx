import React from "react";
import axios from "axios";
import parcel_icon from "../assets/parcel_icon.png";
import { StoreContext } from "../context/StoreContext";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [userOrders, setUserOrders] = useState([]);
  const getUserOrders = async () => {
    try {
      let myResponse = await axios.get(`${url}/api/order/user-orders`, {
        headers: { token },
      });
      console.log(myResponse.data.orders);
      setUserOrders(myResponse.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      getUserOrders();
      // console.log("token ", token);
    }
  }, [token]);

  return (
    <div className="min-h-[50vh] flex flex-col gap-9 items-center  justify-center px-[8%]">
      <h2 className=" text-2xl font-bold mt-[3rem] self-start">My Orders</h2>
      {userOrders.map((order, index) => (
        <div
          key={index}
          className="flex items-start gap-4 border border-gray-500 rounded-sm text-gray-700  p-4 h-max w-full "
        >
          <img src={parcel_icon} alt="parcel_icon" className="w-14" />
          <div className="flex items-start justify-between w-full">
            <div className="w-[18rem] flex flex-wrap">
              <p className="">
                {order.items.map((i) => `${i.name} x${i.quantity}`).join(", ")}
              </p>
            </div>
            <p>
              <span className="font-semibold">$</span>
              {order.amount}.00
            </p>
            <p>Items :{order.items.length || 0}</p>
            <p className="flex items-center text-gray-700 font-semibold gap-2">
              <span className="w-2 h-2 bg-[tomato]   rounded-full"></span>
              {order.status}
            </p>
            <button
              onClick={() => {
                getUserOrders;
                toast.info("Your orders is being tracked!");
              }}
              className="bg-red-200 px-6 text-gray-700 py-3 cursor-pointer rounded-md 
             hover:bg-red-400 hover:text-white transition-all duration-300"
            >
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
