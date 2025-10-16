import React from "react";
import logo from "../assets/logo.png";
import facebook_icon from "../assets/facebook_icon.png";
import twitter_icon from "../assets/twitter_icon.png";
import linkedin_icon from "../assets/linkedin_icon.png";

const Footer = () => {
  return (
    <div
      id="footer"
      className="bg-[#313131] text-white pt-[4rem] pb-[1rem]  mt-[3rem] "
    >
      <div className=" flex flex-col text-sm md:text-base gap-y-8 md:flex-row items-center text-center md:text-left md:items-start  justify-center md:justify-around">
        {/* LEFT */}
        <div className="flex justify-center items-center md:justify-start md:items-start flex-col gap-y-8 gap-3.5">
          <img src={logo} alt="logo" className="w-[7rem] md:w-[10rem]" />
          <p className=" max-w-[90%] sm:max-w-[30rem] ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
            repudiandae quisquam corporis recusandae deleniti velit porro
            exercitationem, ipsam ratione dolor et. Omnis consequuntur vero
            illo? Dolor illo mollitia ipsum quo!
          </p>
          <div className="flex items-center gap-3">
            <img
              src={facebook_icon}
              alt="facebook_icon"
              className="w-10 cursor-pointer"
            />
            <img
              src={twitter_icon}
              alt="twitter_icon"
              className="w-10 cursor-pointer"
            />
            <img
              src={linkedin_icon}
              alt="linkedin_icon"
              className="w-10 cursor-pointer"
            />
          </div>
        </div>
        {/* CENTER */}
        <div className="flex flex-col  gap-2">
          <h2 className="text-2xl font-bold">COMPANY</h2>
          <p>Home</p>
          <p>About us</p>
          <p>Delivery</p>
          <p>Privacy Policy</p>
        </div>
        {/* RIGHT */}
        <div className="flex flex-col  gap-2">
          <h2 className="text-2xl font-bold">GET IN TOUCH</h2>
          <p>+1-212-456-7890</p>
          <p>contact@test.com</p>
        </div>
      </div>
      <hr className="my-[2rem] bg-[#e2e2e2]  h-[1px] w-[80%] m-auto border-none " />
      <p className="text-center text-sm md:text-base text-[#e2e2e2]">
        Copyright 2025 @Tomato.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
