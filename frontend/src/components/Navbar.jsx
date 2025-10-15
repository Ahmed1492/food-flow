import React, { useState } from "react";
import { assets } from "../assets/assets";
const Navbar = () => {
  const [menu, setMenu] = useState("home");
  return (
    <div className="flex items-center text-[#49557e] justify-between px-[8%] py-5">
      <img className="w-[150px]" src={assets.logo} alt="logo" />
      <ul className="flex items-center text-[17px] duration-500  gap-4">
        <li
          onClick={() => setMenu("home")}
          className={`${menu == "home" ? "border-b-[2px] border-[#49557e] " : "pb-[2px]"}`}
        >
          <a href="#">home</a>
        </li>
        <li
          onClick={() => setMenu("menu")}
          className={`${menu == "menu" ? "border-b-[2px] border-[#49557e] " : "pb-[2px]"}`}
        >
          <a href="#">menu</a>
        </li>
        <li
          onClick={() => setMenu("mobile-app")}
          className={`${menu == "mobile-app" ? "border-b-[2px] border-[#49557e] " : "pb-[2px]"}`}
        >
          <a href="#">mobile-app</a>
        </li>
        <li
          onClick={() => setMenu("contact us")}
          className={`${menu == "contact us" ? "border-b-[2px] border-[#49557e] " : "pb-[2px]"}`}
        >
          <a href="#">contact us</a>
        </li>
      </ul>
      <div className="flex items-center gap-8">
        <img
          className="cursor-pointer  w-6"
          src={assets.search_icon}
          alt="search_icon}"
        />
        <div className="relative">
          <img
            className="cursor-pointer w-6"
            src={assets.basket_icon}
            alt="basket_icon}"
          />
          <span className="absolute w-3 h-3 bg-red-400 -top-2 -right-2 rounded-full"></span>
        </div>
        <button className="border border-gray-400 rounded-full px-[28px] py-2 cursor-pointer hover:bg-[#fff4f2] duration-300">
          sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
