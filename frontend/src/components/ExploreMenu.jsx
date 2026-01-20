import React from "react";
import { menu_list } from "../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div id="explore-menu" className="mt-[3rem]">
      <div className="flex flex-col gap-6">
        <h2 className="text-4xl">Explore our menu</h2>
        <p className="max-w-2xl font-medium">
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
      </div>
<div className="flex gap-6 justify-between mt-12 overflow-x-auto hide-scrollbar px-2">
  {menu_list.map((item, index) => {
    const isActive = category === item.menu_name;

    return (
      <div
        key={index}
        onClick={() =>
          setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))
        }
        className="flex flex-col shrink-0 items-center gap-2 cursor-pointer transition-transform hover:scale-105"
      >
        <img
          src={item.menu_image}
          alt={item.menu_name}
          className={`w-26 lg:w-28 rounded-full border-4 ${
            isActive
              ? "border-[tomato] shadow-[0_0_10px_rgba(255,99,71,0.6)]"
              : "border-transparent"
          }`}
        />
        <p
          className={`text-sm font-medium ${
            isActive ? "text-[tomato]" : "text-gray-700"
          }`}
        >
          {item.menu_name}
        </p>
      </div>
    );
  })}
</div>


      <hr className="my-[2rem] bg-[#e2e2e2]  h-[2px] border-none " />
    </div>
  );
};

export default ExploreMenu;
