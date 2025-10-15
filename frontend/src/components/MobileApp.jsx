import React from "react";
import play_store from "../assets/play_store.png";
import app_store from "../assets/app_store.png";
const MobileApp = () => {
  return (
    <div className="w-full flex flex-col gap-8  text-center items-center justify-center mt-[8rem] mb-[3rem]">
      <h2 className="text-5xl  font-semibold leading-16">
        For Better Experience Download <br /> Tomato App
      </h2>
      <div className="flex items-center gap-7">
        <img
          src={play_store}
          alt="play_store"
          className="w-[12rem] cursor-pointer"
        />
        <img
          src={app_store}
          alt="play_store"
          className="w-[11rem] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MobileApp;
