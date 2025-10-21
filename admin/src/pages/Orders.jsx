import { useLocation } from "react-router-dom";
import axios from "axios";
import parcel_icon from "../assets/parcel_icon.png";
import { useState, useEffect } from "react";
const Orders = ({ setCurrentPage, url }) => {
  const location = useLocation();
  let path = location.pathname;
  // console.log(location.pathname);
  const [userOrders, setUserOrders] = useState([]);

  const getUserOrders = async () => {
    try {
      let myResponse = await axios.get(`${url}/api/order/orders`);
      console.log(myResponse.data.orders[0]);
      setUserOrders(myResponse.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    // console.log(orderId, status);
    try {
      let myResponse = await axios.put(`${url}/api/order/update-status`, {
        orderId,
        status,
      });
      console.log(myResponse.data);
      await getUserOrders();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserOrders();
  }, []);
  useEffect(() => {
    if (path === "/list") {
      setCurrentPage("list-items");
    } else if (path === "/orders") {
      setCurrentPage("orders");
    } else {
      setCurrentPage("add-items");
    }
  }, [location]);

  return (
    <div className="w-full">
      <div className="min-h-[50vh] flex flex-col gap-9 items-center  justify-center w-[93%] text-sm ">
        <h2 className=" text-2xl font-bold mt-[3rem] self-start text-gray-700">
          Orders Page
        </h2>
        {userOrders.map((order, index) => (
          <div
            key={index}
            className="flex items-start gap-4 border border-gray-500 rounded-sm text-gray-600  p-4 h-max w-full "
          >
            <img src={parcel_icon} alt="parcel_icon" className="w-14" />
            <div className="flex items-centera justify-between w-full">
              <div className="w-[19rem]  flex flex-wrap">
                <div className="flex flex-col ">
                  <p className="">
                    {order.items
                      .map((i) => `${i.name} x${i.quantity}`)
                      .join(", ")}
                  </p>
                  <div className="mt-[4rem] flex flex-col gap-[2px]">
                    <p className="font-semibold">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-gray-600">{order.address.street}, </p>
                    <p className="text-gray-600">
                      {order.address.city}, {order.address.state},{" "}
                      {order.address.country}, {order.address.zipCode}
                    </p>
                    <p className="text-gray-600">{order.address.phone} </p>
                  </div>
                </div>
              </div>
              <p>
                <span className="font-semibold">$</span>
                {order.amount}.00
              </p>
              <p>Items : {order.items.length || 0}</p>
              <select
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                className="px-4 outline-none py-4 border border-red-300 bg-red-100 rounded-md h-max"
                defaultValue={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
