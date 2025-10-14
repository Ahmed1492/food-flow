import React from "react";
import { menu_list } from "../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="mt-[3rem]">
      <div className="flex flex-col gap-6">
        <h2 className="text-4xl">Explore our menu</h2>
        <p className="max-w-2xl font-medium">
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
      </div>
      <div className="flex gap-6 justify-between mt-[3rem] overflow-x-auto hide-scrollbar ">
        {menu_list.map((item, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            className={`flex flex-col shrink-0 items-center gap-3 cursor-pointer`}
            key={index}
          >
            <img
              src={item.menu_image}
              alt="menu_image"
              className={`w-[8rem]  ${
                category === item.menu_name
                  ? "border-4 border-[tomato] p-[3px] rounded-full"
                  : ""
              }`}
            />
            <p className="text-gray-700">{item.menu_name}</p>
          </div>
        ))}
      </div>

      <hr className="my-[2rem] bg-[#e2e2e2]  h-[2px] border-none " />
    </div>
  );
};

export default ExploreMenu;
