import React, { useContext, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

// import profile_icon from "../assets/noAvatar2.png";
const Navbar = ({ setIsLogin }) => {
  const [menu, setMenu] = useState("home");
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const {
    cartItems,
    token,
    setToken,
    setCartItems,
    userData,
    url,
    fetchUserData,
  } = useContext(StoreContext);
  const fileInputRef = useRef(null);
  const logout = () => {
    setToken("");
    setIsOpenMenu(false);
    setImage(false);
    if (localStorage.getItem("food_flow_token")) {
      localStorage.removeItem("food_flow_token");
    }
    setCartItems({});
    navigate("/");
  };

  const updateUserImage = async () => {
    try {
      const formData = new FormData();

      // Only append image if it exists
      if (image) {
        formData.append("image", image);
      }

      const myResponse = await axios.post(
        `${url}/api/auth/add-image`,
        formData,
        {
          headers: { token  , "ngrok-skip-browser-warning": "true",  },
        },
      );
      toast.success(myResponse.data.message);
      console.log(image ? `URL :${url}/images/${myResponse.data.image}` : "");
      console.log(image ? "update image" : "removed  ", myResponse.data);
      await fetchUserData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpenMenu(false);
      setImage(false);
    }
  };

  const removeUserImage = async () => {
    try {
      const myResponse = await axios.delete(`${url}/api/auth/remove-image`, {
        headers: { token  , "ngrok-skip-browser-warning": "true", },
      });
      console.log(myResponse.data);

      toast.success(myResponse.data.message);
      await fetchUserData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpenMenu(false);
      setImage(false);
    }
  };

  return (
    <div className="flex items-center  text-[#49557e] justify-between px-[8%] py-5 sticky top-1 bg-white z-50 ">
      <img
        onClick={() => navigate("/")}
        className="w-[120px] sm:w-[150px] cursor-pointer"
        src={assets.logo}
        alt="logo"
      />
      <div className="hidden md:flex items-center text-[17px] gap-6 lg:gap-10">
        {[
          { name: "home", href: "#" },
          { name: "menu", href: "#explore-menu" },
          { name: "mobile-app", href: "#app-download" },
          { name: "contact us", href: "#footer" },
        ].map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => setMenu(item.name)}
            className={`capitalize relative pb-[2px] transition-all duration-300 
        ${
          menu === item.name
            ? "text-[#49557e] after:w-full"
            : "text-gray-700 hover:text-[#49557e] after:w-0 hover:after:w-full"
        }
        after:absolute after:left-0 after:bottom-0 after:h-[2px] 
        after:bg-[#49557e] after:transition-all after:duration-300
      `}
          >
            {item.name}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-3 items-center-safe ">
        <img
          className="cursor-pointer "
          src={assets.search_icon}
          alt="search_icon"
        />
        <Link to="/cart" className="relative">
          <img
            className="cursor-pointer  "
            src={assets.basket_icon}
            alt="basket_icon}"
          />
          {cartItems && Object?.keys(cartItems).length !== 0 && (
            <span className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-red-400 -top-2 right-3 rounded-full"></span>
          )}
        </Link>
        {token ? (
          <div className="relative ">
            {userData?.image ? (
              <img
                onClick={() => setIsOpenMenu((prev) => !prev)}
                className="cursor-pointer w-[40px] h-[40px] md:w-[49px] md:h-[49px] object-cover rounded-full "
                src={`${userData?.image}`}
                alt="profile_icon"
              />
            ) : (
              <img
                onClick={() => setIsOpenMenu((prev) => !prev)}
                className="cursor-pointer  w-[49px] h-[49px] bordear rounded-full border-blue-100  object-cover  "
                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                alt="profile_icon"
              />
            )}

            {isOpenMenu && (
              <ul className="absolute w-[12rem] p-3 rounded-md bg-red-100 flex flex-col gap-3  -left-35 md:-left-20 top-12  md:-bottom-[14rem] text-black z-10">
                <li className="flex flex-col items-center gap-3 cursor-pointer">
                  <div className="flex flex-col gap-2 items-center relative">
                    <label className="cursor-pointer flex flex-col items-center gap-2">
                      <img
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : userData?.image
                              ? `${userData.image}`
                              : ` https://cdn-icons-png.flaticon.com/512/847/847969.png`
                        }
                        alt="profile"
                        className={`${"w-[4rem] h-[4rem]"} rounded-full object-cover`}
                      />
                      {!image && (
                        <p className="text-gray-600 hover:text-red-400 hover:underline transition-all duration-200 cursor-pointer">
                          {userData?.image ? "Update" : "Add Image"}
                        </p>
                      )}

                      <input
                        ref={fileInputRef}
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        className="hidden"
                      />
                    </label>

                    {!image && userData?.image && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setImage(null);
                          removeUserImage();
                        }}
                        className="text-red-600 cursor-pointer inline-block hover:text-red-700 hover:underline transition-all duration-200"
                      >
                        Remove
                      </button>
                    )}

                    {image && (
                      <div className="w-full flex gap-4">
                        <button
                          onClick={updateUserImage}
                          className="bg-red-400 w-full cursor-pointer py-[2px] px-2 rounded-md text-white hover:bg-red-500 hover:scale-[1.02] transition-all duration-300"
                        >
                          update
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setImage(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                          className="bg-red-400 font-bold text-sm p-2 rounded-full w-5 h-5 flex items-center justify-center text-white absolute top-0 -right-1 cursor-pointer hover:bg-red-500 hover:scale-110 transition-all duration-300"
                        >
                          X
                        </button>
                      </div>
                    )}
                  </div>
                </li>

                <hr className="border-red-300" />

                <li
                  onClick={() => navigate("/my-orders")}
                  className="flex items-center gap-3 cursor-pointer hover:text-red-400"
                >
                  <img className="w-5" src={assets.bag_icon} alt="bag_icon" />
                  <p>Orders</p>
                </li>

                <hr className="border-red-300" />

                <li
                  onClick={logout}
                  className="flex items-center gap-3 cursor-pointer hover:text-red-400"
                >
                  <img
                    className="w-5"
                    src={assets.logout_icon}
                    alt="logout_icon"
                  />
                  <p>Logout</p>
                </li>
              </ul>
            )}
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
