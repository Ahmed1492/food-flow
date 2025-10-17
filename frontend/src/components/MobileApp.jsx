import React from "react";
import play_store from "../assets/play_store.png";
import app_store from "../assets/app_store.png";
const MobileApp = () => {
  return (
    <div
      id="app-download"
      className="w-full flex flex-col gap-8  text-center items-center justify-center mt-[8rem] mb-[3rem]"
    >
      <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl  font-semibold sm:leading-12 md:leading-16">
        For Better Experience Download <br /> Tomato App
      </h2>
      <div className="flex items-center gap-7">
        <img
          src={play_store}
          alt="play_store"
          className="w-[7rem] sm:w-[8rem] md:w-[12rem] cursor-pointer hover:scale-110 duration-300"
        />
        <img
          src={app_store}
          alt="play_store"
          className="w-[7rem] sm:w-[8rem] md:w-[12rem] cursor-pointer hover:scale-110 duration-300"
        />
      </div>
    </div>
  );
};

export default MobileApp;
