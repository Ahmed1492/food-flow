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
          headers: { token },
        }
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

  return (
    <div className="flex items-center  text-[#49557e] justify-between px-[8%] py-5 sticky top-1 bg-white z-50 ">
      <img
        onClick={() => navigate("/")}
        className="w-[80px] sm:w-[150px] cursor-pointer"
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
                className="cursor-pointer w-[49px] h-[49px] object-cover rounded-full "
                src={`${url}/images/${userData?.image}`}
                alt="profile_icon}"
              />
            ) : (
              <img
                onClick={() => setIsOpenMenu((prev) => !prev)}
                className="cursor-pointer  w-[49px] h-[49px] bordear rounded-full border-blue-100  object-cover  "
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
                          if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                            updateUserImage();
                          }
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
