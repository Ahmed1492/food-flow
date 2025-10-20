import React, { useContext, useEffect } from "react";
import axios from "axios";
import StoreContextProvider, { StoreContext } from "../context/StoreContext";
import Food_Item from "./Food_Item";
const FoodDisplay = ({ category }) => {
  const {   url , data ,setData } = useContext(StoreContext);
  // console.log("food_list ", food_list);
  const getFoods = async () => {
    try {
      let myResponse = await axios.get(`${url}/api/food/get`);
      console.log(myResponse.data.food);
      setData(myResponse.data.food);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFoods();
  }, []);
  return (
    <div id="food-display">
      <h2 className="text-3xl font-semibold">Top dishes near you</h2>

      <div className="flex items-center  mt-[2rem] gap-y-[4rem] gap-x-[2rem] justify-center  md:justify-between flex-wrap">
        {data.map((item, index) => {
          if (category === "All" || category === item.category)
            return (
              <div
                className="flex  fadeIn flex-col gap-3  shadow-sm cursor-pointer relative"
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
