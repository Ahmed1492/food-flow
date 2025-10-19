import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
const Navbar = ({ setIsLogin }) => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const { cartItems, token, setToken } = useContext(StoreContext);
  return (
    <div className="flex items-center  text-[#49557e] justify-between px-[8%] py-5">
      <img
        onClick={() => navigate("/")}
        className="w-[80px] sm:w-[150px] cursor-pointer"
        src={assets.logo}
        alt="logo"
      />
      <div className="hidden md:flex flex-wrapa items-center text-[17px] duration-500 gap-4 lg:gap-8 ">
        <Link
          onClick={() => setMenu("home")}
          className={`${
            menu == "home" ? "border-b-[2px] border-[#49557e] " : "pb-[2px]"
          }`}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={`${
            menu == "menu" ? "border-b-[2px] border-[#49557e] " : "pb-[2px]"
          }`}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={`${
            menu == "mobile-app"
              ? "border-b-[2px] border-[#49557e] "
              : "pb-[2px]"
          }`}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact us")}
          className={`${
            menu == "contact us"
              ? "border-b-[2px] border-[#49557e] "
              : "pb-[2px]"
          }`}
        >
          contact us
        </a>
      </div>
      <div className="flex items-center gap-4 sm:gap-8">
        <img
          className="cursor-pointer w-4  sm:w-5 lg:w-6"
          src={assets.search_icon}
          alt="search_icon}"
        />
        <Link to="/cart" className="relative">
          <img
            className="cursor-pointer w-4  sm:w-5 lg:w-6"
            src={assets.basket_icon}
            alt="basket_icon}"
          />
          {Object.keys(cartItems).length !== 0 && (
            <span className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-red-400 -top-2 -right-2 rounded-full"></span>
          )}
        </Link>
        {token ? (
          <div className="relative ">
            <img
              className="cursor-pointer w-4  sm:w-5"
              src={assets.profile_icon}
              alt="profile_icon}"
            />
            <ul className="absolute w-[10rem] p-3 rounded-md bg-red-200 flex flex-col gap-3 -left-20 -bottom-[6rem] z-50">
              <li className="flex items-center gap-3 cursor-pointer hover:text-red-400">
                <img
                  className="cursor-pointer w-4  sm:w-5"
                  src={assets.bag_icon}
                  alt="profile_icon}"
                />
                <p>profile</p>
              </li>
              <hr className="border-red-300" />
              <li className="flex items-center gap-3 cursor-pointer hover:text-red-400">
                <img
                  className="cursor-pointer w-4  sm:w-5"
                  src={assets.logout_icon}
                  alt="profile_icon}"
                />
                <p>logout</p>
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => setIsLogin(true)}
            className="border border-gray-400 text-sm md:text-base rounded-full px-[18px] lg:px-[28px] py-2 cursor-pointer hover:bg-[#fff4f2] duration-300"
          >
            sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
