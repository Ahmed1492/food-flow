import React from "react";
import logo from "../assets/logo.png";
import profile_image from "../assets/profile_image.png";
const Navbar = () => {
  return (
    <div className=" py-3]">
      <div className="px-[3%] flex items-center justify-between">
        <img src={logo} alt="logo" className="w-[10rem]" />
        <img
          src={profile_image}
          alt="profile_image"
          className="w-[42px] rounded-full"
        />
      </div>
      <hr className="mt-4 border-0 bg-slate-300 h-[2px]" />
    </div>
  );
};

export default Navbar;
