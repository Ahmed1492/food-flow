import React, { useContext } from "react";
import add_icon_white from "../assets/add_icon_white.png";
import rating_stars from "../assets/rating_starts.png";
import add_icon_green from "../assets/add_icon_green.png";
import remove_icon_red from "../assets/remove_icon_red.png";
import { StoreContext } from "../context/StoreContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Food_Item = ({ item, url }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <>
      {}
      <div className="relative">
        <img
          src={`${url}/images/${item.image}`}
          className=" w-[17rem] sm:w-[20rem] md:w-[17rem] lg:w-[19rem] rounded-t-lg"
          alt="itemImage"
        />
        {!cartItems?.[item._id] ? (
          <img
            onClick={() => addToCart(item._id)}
            src={add_icon_white}
            className="w-10 absolute bottom-2 right-3 cursor-pointer transition-transform hover:scale-110"
            alt="Add to cart"
          />
        ) : (
          <div className="flex items-center gap-3 bg-white p-2 rounded-full absolute bottom-3 right-4 shadow-md">
            <img
              onClick={() => removeFromCart(item._id)}
              src={remove_icon_red}
              className="w-8 cursor-pointer transition-transform hover:scale-110"
              alt="Remove item"
            />
            <span className="text-black font-semibold w-6 text-center select-none">
              {cartItems[item._id]}
            </span>
            <img
              onClick={() => addToCart(item._id)}
              src={add_icon_green}
              className="w-8 cursor-pointer transition-transform hover:scale-110"
              alt="Add item"
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between px-3 pt-3">
        <p className=" text-lg  font-semibold">{item.name}</p>
        <img src={rating_stars} className="w-20 " alt="rating_stars" />
      </div>
      <div className="w-full px-3 pb-3 ">
        <p className="max-w-64 text-gray-600">{item.description}</p>
        <p className="text-[tomato] text-2xl font-semibold">${item.price}</p>
      </div>
    </>
  );
};

export default Food_Item;
