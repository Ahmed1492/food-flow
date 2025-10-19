import React, { useEffect, useState } from "react";

import food_1 from "../assets/food_1.png";
// import { food_list } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ListItems = ({ setCurrentPage  , url}) => {
  const location = useLocation();
  let path = location.pathname;

  const [data, setData] = useState([]);

  const getAllFoodItems = async () => {
    try {
      let myResponse = await axios.get(`${url}/api/food/get`);
      console.log(myResponse.data.food);

      setData(myResponse.data.food);
    } catch (error) {
      console.log(error);
    }
  };
  const removeItem = async (itemId) => {
    try {
      let myResponse = await axios.delete(`${url}/api/food/remove`, {
        data: { id: itemId },
      });

      console.log(myResponse.data);
      await getAllFoodItems();

      if (myResponse.data.success === true) {
        toast.success(myResponse.data.message || "Item deleted successfully");
      } else {
        toast.error(myResponse.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (path === "/list") {
      setCurrentPage("list-items");
    } else if (path === "/orders") {
      setCurrentPage("orders");
    } else {
      setCurrentPage("add-items");
    }
  }, [location]);

  useEffect(() => {
    getAllFoodItems();
  }, []);
  return (
    <div className="w-[70%]  mt-[3rem] ms-[3rem]   text-slate-500  ">
      <p className="text-gray-500 text-xl mb-5 ms-1">All Food List</p>
      <div className=" border border-gray-200  ">
        <div className="">
          {/* Header Row */}
          <div className="flex items-center justify-between border border-gray-300  text-gray-500 px-5 py-3 bg-gray-100 ">
            <p className="w-14">Items</p>
            <p className="w-40  ">Name</p>
            <p className="w-28  ">Category</p>
            <p className="w-20  ">Price</p>
            <p className="w-20  ">Action</p>
          </div>

          <hr className="my-2 border-gray-200 border-t-0" />

          {/* Items */}
          <div className="flex flex-col gap-3">
            {data.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="flex items-center px-5 justify-between">
                    <img
                      src={`${url}/images/${item.image}`}
                      alt={food_1}
                      className="w-14 rounded-md"
                    />
                    <p className="w-40  text-[15px]">{item.name}</p>
                    <p className="w-28  ">{item.category}</p>
                    <p className="w-20  ">${item.price}</p>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="w-20 text-start text-red-500 cursor-pointer hover:text-red-700"
                    >
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
