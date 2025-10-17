import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const PlaceOrder = () => {
  const { food_list, cartItems, cartTotal } = useContext(StoreContext);
  console.log("food_list ,", food_list);
  console.log("cart items ,", cartItems);
  let total = cartTotal();
  let deliveryFee = total > 0 ? 2 : 0;
  return (
    <div className="px-[7%] flex flex-col gap-y-[3rem] md:flex-row items-center justify-between min-h-[70vh] ">
      {/* LEFT */}
      <div className="flex flex-col gap-4 w-[90%] md:w-[50%] lg:w-[36%]">
        <h2 className=" text-xl md:text-3xl font-semibold my-[1rem] md:my-[2rem]">
          Delivery Information
        </h2>
        <div className="flex items-center gap-3 w-full">
          <input
            type="text"
            placeholder="First name"
            className="py-2 px-3 rounded-md w-full border border-gray-300"
          />
          <input
            type="text"
            placeholder="Last name"
            className="py-2 px-3 rounded-md w-full border border-gray-300"
          />
        </div>
        <input
          type="text"
          placeholder="Email Address"
          className="py-2 px-3 rounded-md w-full border border-gray-300"
        />
        <input
          type="text"
          placeholder="Streat"
          className="py-2 px-3 rounded-md w-full border border-gray-300"
        />
        <div className="flex items-center gap-3 w-full">
          <input
            type="text"
            placeholder="City"
            className="py-2 px-3 rounded-md w-full border border-gray-300"
          />
          <input
            type="text"
            placeholder="State"
            className="py-2 px-3 rounded-md w-full border border-gray-300"
          />
        </div>
        <div className="flex items-center gap-3 w-full">
          <input
            type="text"
            placeholder="Zip Code "
            className="py-2 px-3 rounded-md w-full border border-gray-300"
          />
          <input
            type="text"
            placeholder="Country"
            className="py-2 px-3 rounded-md w-full border border-gray-300"
          />
        </div>
        <input
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
          <button className="bg-red-400  text-white px-[2rem]  cursor-pointer py-[11px] rounded-lg mt-2">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
