import React, { useContext, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import profile_icon from "../assets/noAvatar2.png";
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
          headers: { token },
        }
      );

      console.log(image ? "add" : "remove", myResponse.data);
      await fetchUserData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpenMenu(false);
      setImage(false);
    }
  };

  return (
    <div className="flex items-center  text-[#49557e] justify-between px-[8%] py-5 ">
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
          {cartItems && Object?.keys(cartItems).length !== 0 && (
            <span className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-red-400 -top-2 -right-2 rounded-full"></span>
          )}
        </Link>
        {token ? (
          <div className="relative ">
            {userData?.image ? (
              <img
                onClick={() => setIsOpenMenu((prev) => !prev)}
                className="cursor-pointer w-[47px] h-[47px] object-cover rounded-full "
                src={`${url}/images/${userData?.image}`}
                alt="profile_icon}"
              />
            ) : (
              <img
                onClick={() => setIsOpenMenu((prev) => !prev)}
                className="cursor-pointer  w-[47px] h-[47px] bordear rounded-full border-blue-100  object-cover  "
                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                alt="profile_icon}"
              />
            )}

            {isOpenMenu && (
              <ul className="absolute w-[12rem] p-3 rounded-md bg-red-100 flex flex-col gap-3 -left-20 -bottom-[14rem] text-black z-10">
                <li className="flex flex-col items-center gap-3 cursor-pointer">
                  <div className="flex flex-col gap-2 items-center relative">
                    <label className="cursor-pointer flex flex-col items-center gap-2">
                      <img
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : userData?.image
                            ? `${url}/images/${userData.image}`
                            : `https://scontent.fcai19-4.fna.fbcdn.net/v/t39.30808-6/486448890_1048083287349494_8994250106993526605_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=tgufuLS7YwoQ7kNvwGlUBzH&_nc_oc=AdkMYT95aqSTMcBpL9H35sfI3XVjborwhQGFlt9oOFCCo4etUixlfBHvzSZC33MEO-0&_nc_zt=23&_nc_ht=scontent.fcai19-4.fna&_nc_gid=D4B1adMeiDlfcFirG-f5Mg&oh=00_AfdWsfhrTQFrHSU3BSnQVDsD5QxnvCWdIop2h5ZZ51VHow&oe=68FE933C`
                        }
                        alt="profile"
                        className={`${"w-[4rem] h-[4rem]"} rounded-full object-cover`}
                      />
                      {!image && (
                        <p className="text-gray-600">
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
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                            updateUserImage();
                          }
                        }}
                        className="text-red-600 cursor-pointer inline-block"
                      >
                        Remove
                      </button>
                    )}

                    {image && (
                      <div className="w-full flex gap-4">
                        <button
                          onClick={updateUserImage}
                          className="bg-red-400 w-full py-[2px] px-2 rounded-md text-white"
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
                          className="bg-red-400 font-bold text-sm p-2 rounded-full w-5 h-5 flex items-center justify-center text-white absolute top-0 -right-1 cursor-pointer"
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
