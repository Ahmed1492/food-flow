import React, { useContext } from "react";
import StoreContextProvider, { StoreContext } from "../context/StoreContext";
import Food_Item from "./Food_Item";
import SkeletonLoader from "./SkeletonCard";

const FoodDisplay = ({ category }) => {
  const { data, url, foodLoading } = useContext(StoreContext);
  // console.log("food_list ", food_list);
  if (foodLoading) {
    return (
      <>
        <SkeletonLoader />;
        <SkeletonLoader />;
        <SkeletonLoader />;
      </>
    );
  }

  return (
    <div id="food-display">
      <h2 className="text-3xl font-semibold mb-9">Top dishes near you</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  gap-7">
        {data.map((item, index) => {
          if (category === "All" || category === item.category)
            return (
              <div
                className="flex fadeIn flex-col gap-3 shadow-sm cursor-pointer relative rounded-xl transition-all duration-300 hover:bg-gray-100"
                key={index}
              >
                <Food_Item item={item} url={url} />
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
