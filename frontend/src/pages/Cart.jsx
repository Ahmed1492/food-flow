import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Cart = () => {
  const { cartItems, removeFromCart, cartTotal, data, url } =
    useContext(StoreContext);
  // console.log("food_list ,", food_list);
  console.log("cart items ,", cartItems);
  let total = cartTotal();
  let deliveryFee = total > 0 ? 2 : 0;

  const navigate = useNavigate();

  return (
    <div className="px-[7%] md:px-[12%] pt-8 min-h-[43vh] text-sm lg:text-base">
      {/* Header Row */}
      <div className="flex items-center justify-between text-gray-500 text-sm md:text-lg">
        <p className="w-16">Items</p>
        <p className="w-28  text-center">Title</p>
        <p className="w-28  text-center">Price</p>
        <p className="w-28  text-center">Quantity</p>
        <p className="w-28  text-center">Total</p>
        <p className="w-28  text-center">Remove</p>
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Items */}
      <div className="flex flex-col gap-3">
        {cartItems ? (
          data.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <React.Fragment key={item._id || index}>
                  <div className="flex items-center justify-between">
                    <img
                      src={`${url}/images/${item.image}`}
                      alt={item.name}
                      className="w-16 rounded-md"
                    />
                    <p className="w-28  text-center">{item.name}</p>
                    <p className="w-28  text-center">${item.price}</p>
                    <p className="w-28  text-center">{cartItems[item._id]}</p>
                    <p className="w-28  text-center">
                      ${item.price * (cartItems[item._id] || 1)}
                    </p>
                    <button
                      className="w-28  text-center text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => removeFromCart(item._id)}
                    >
                      ×
                    </button>
                  </div>

                  <hr className="border-gray-200" />
                </React.Fragment>
              );
            }
          })
        ) : (
          <Loading />
        )}
      </div>

      <div className="mt-[3rem] flex flex-col-reverse gap-y-[3rem] justify-center items-center md:flex-row md:items-center md:justify-between text-sm lg:text-base">
        {/* LEFT */}
        <div className=" w-[80%] md:w-[40%] ">
          <h2 className="text-2xl font-semibold">Cart Total</h2>
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
              onClick={() => navigate("/order")}
              className="bg-red-400  text-white px-[2rem] cursor-pointer  py-[11px] rounded-lg mt-2 hover:bg-red-500
hover:shadow-lg
hover:scale-[1.02] duration-300"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-[90%] md:w-[45%]  flex flex-col  gap-4">
          <p className="text-gray-500">
            If you have a promo Code, Enter it here.
          </p>
          <div className="felx relative">
            <input
              type="text"
              placeholder="promo Code"
              className="py-[11px] px-5 rounded-s-lg bg-slate-200 w-[100%] outline-0"
            />
            <button className="bg-black text-white  md:w-[30%] cursor-pointer lg:w-[20%] px-[20px] py-[11px] rounded-lg absolute right-0 ">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
