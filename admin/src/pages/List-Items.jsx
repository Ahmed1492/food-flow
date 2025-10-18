import React, { useEffect } from "react";

import food_1 from "../assets/food_1.png";
import { food_list } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const ListItems = ({ setCurrentPage }) => {
  console.log("food_list", food_list);

  const location = useLocation();
  let path = location.pathname;
  console.log(location.pathname);

  useEffect(() => {
    if (path === "/list") {
      setCurrentPage("list-items");
    } else if (path === "/orders") {
      setCurrentPage("orders");
    } else {
      setCurrentPage("add-items");
    }
  }, [location]);
  return (
    <div className="w-[70%]  mt-[3rem] ms-[3rem]   ">
      <p className="text-gray-500 text-xl mb-5 ms-1">All Food List</p>
      <div className=" border border-gray-200 ">
        <div className="">
          {/* Header Row */}
          <div className="flex items-center justify-between border border-gray-300  text-gray-500 px-5 py-3 bg-gray-100 ">
            <p className="w-14">Items</p>
            <p className="w-32  text-center">Title</p>
            <p className="w-32  text-center">Price</p>
            <p className="w-32  text-center">Quantity</p>
            <p className="w-32  text-center">Total</p>
            <p className="w-32  text-center">Remove</p>
          </div>

          <hr className="my-2 border-gray-200 border-t-0" />

          {/* Items */}
          <div className="flex flex-col gap-3">
            {food_list.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="flex items-center px-5 justify-between">
                    <img
                      src={item.image}
                      alt={food_1}
                      className="w-14 rounded-md"
                    />
                    <p className="w-32  text-[15px] text-center">{item.name}</p>
                    <p className="w-32  text-center">${item.price}</p>
                    <p className="w-32  text-center">{2}</p>
                    <p className="w-32  text-center">${1}</p>
                    <button className="w-28  text-center text-red-500 cursor-pointer hover:text-red-700">
                      ×
                    </button>
                  </div>

                  <hr className="border-gray-200" />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItems;
