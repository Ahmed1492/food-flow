import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { cartItems, cartTotal, token, data, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const collectData = (e) => {
    e.preventDefault();
    let keys = e.target.name;
    let values = e.target.value;
    setUserInfo((userInfo) => ({ ...userInfo, [keys]: values }));
    // console.log(userInfo);
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];
    data.map((item) => {
      if (cartItems[item._id]) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: userInfo,
      items: orderItems,
      amount: cartTotal() + 2,
    };
    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });
      console.log("response ", response);

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // console.log("food_list ,", food_list);
  // console.log("cart items ,", cartItems);
  let total = cartTotal();
  let deliveryFee = total > 0 ? 2 : 0;

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (cartTotal() === 0) {
      navigate("/cart");
    }
  }, [token]);
  return (
    <form
      onSubmit={placeOrder}
      className="px-[7%] flex flex-col gap-y-[3rem] md:flex-row items-center justify-between min-h-[70vh] "
    >
      {/* LEFT */}
      <div className="flex flex-col gap-4 w-[90%] md:w-[50%] lg:w-[36%]">
        <h2 className=" text-xl md:text-3xl font-semibold my-[1rem] md:my-[2rem]">
          Delivery Information
        </h2>
        <div className="flex items-center gap-3 w-full">
          <input
            required
            onChange={collectData}
            name="firstName"
            value={userInfo.firstName}
            type="text"
            placeholder="First name"
            className="py-2 px-3 rounded-md w-full border border-gray-300"
          />
          <input
            required
            onChange={collectData}
            name="lastName"
            value={userInfo.lastName}
            type="text"
            placeholder="Last name"
            className="py-2 px-3 rounded-md w-full border border-gray-300"
          />
        </div>
        <input
          required
          onChange={collectData}
          name="email"
          value={userInfo.email}
          type="text"
          placeholder="Email Address"
          className="py-2 px-3 rounded-md w-full border border-gray-300"
        />
        <input
          required
          onChange={collectData}
          name="street"
          value={userInfo.street}
          type="text"
          placeholder="Streat"
          className="py-2 px-3 rounded-md w-full border border-gray-300"
        />
        <div className="flex items-center gap-3 w-full">
          <input
            required
            onChange={collectData}
            name="city"
            value={userInfo.city}
            type="text"
            placeholder="City"
            className="py-2 px-3 rounded-md w-full border border-gray-300"
          />
          <input
            required
            onChange={collectData}
            name="state"
            value={userInfo.state}
            type="text"
            placeholder="State"
            className="py-2 px-3 rounded-md w-full border border-gray-300"
          />
        </div>
        <div className="flex items-center gap-3 w-full">
          <input
            required
            onChange={collectData}
            name="zipCode"
            value={userInfo.zipCode}
            type="text"
            placeholder="Zip Code "
            className="py-2 px-3 rounded-md w-full border border-gray-300"
          />
          <input
            required
            onChange={collectData}
            name="country"
            value={userInfo.country}
            type="text"
            placeholder="Country"
            className="py-2 px-3 rounded-md w-full border border-gray-300"
          />
        </div>
        <input
          required
          onChange={collectData}
          name="phone"
          value={userInfo.phone}
          type="text"
          placeholder="Phone"
          className="py-2 px-3 rounded-md w-full border border-gray-300"
        />
      </div>
      {/* RIGHT */}
      <div className=" w-[80%] md:w-[40%] ">
        <h2 className=" text-xl md:text-2xl font-semibold">Cart Total</h2>
        <div className="flex items-center justify-between mt-[2rem]">
          <p className="text-gray-500">Subtotal</p>
          <p className="text-gray-500">${total}</p>
        </div>
        <hr className="my-4 border-gray-200" />
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Delivery Fee</p>
          <p className="text-gray-500">${deliveryFee}</p>
        </div>
        <hr className="my-4 border-gray-200" />
        <div className="flex items-center justify-between">
          <p className="text-gray-600 font-medium">Total</p>
          <p className="text-gray-600 font-medium">${total + deliveryFee}</p>
        </div>
        <hr className="my-4 border-gray-200" />
        <div className="flex items-center justify-center md:block">
          <button
            type="submit"
            className="bg-red-400  text-white px-[2rem]  cursor-pointer py-[11px] rounded-lg mt-2 hover:bg-red-500 duration-300
hover:shadow-lg
hover:scale-[1.02]"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
