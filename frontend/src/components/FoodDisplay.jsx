import React, { useContext } from "react";
import StoreContextProvider, { StoreContext } from "../context/StoreContext";
import Food_Item from "./Food_Item";
const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  // console.log("food_list ", food_list);

  return (
    <div id="food-display">
      <h2 className="text-3xl font-semibold">Top dishes near you</h2>

      <div className="flex  items-center  mt-[2rem] gap-y-[4rem] gap-x-[2rem] justify-between flex-wrap">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category)
            return (
              <div
                className="flex  fadeIn flex-col gap-3  shadow-sm cursor-pointer relative"
                key={index}
              >
                <Food_Item item={item} />
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
