import React, { useEffect } from "react";
import upload_area from "../assets/upload_area.png";
import { useLocation } from "react-router-dom";

const AddItems = ({ setCurrentPage }) => {
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
    <div className="p-[3rem]">
      <div className="flex flex-col gap-3">
        <p className="text-gray-600">Upload Image</p>
        <img
          src={upload_area}
          alt="upload_area"
          className="w-[8rem] cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-1 mt-5">
        {/* Product name */}
        <label className="text-gray-600" htmlFor="">
          Product name
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="rounded-md w-[25rem] py-2 px-3 border border-slate-300 outline-none text-[15px]"
        />

        {/*   Product description */}

        <label className="text-gray-600 mt-4" htmlFor="">
          Product description
        </label>
        <textarea
          placeholder="Write content here"
          rows={8}
          className="rounded-md w-[25rem] py-2 px-3 border border-slate-300 text-[15px] outline-none"
        />

        {/*   Product Category & Product Price */}
        <div className="flex items-center gap-8 mt-4">
          {/*   Product Category */}
          <div>
            <label className="text-gray-600 block" htmlFor="">
              Product category
            </label>
            <select
              type="text"
              placeholder="Type here"
              className="rounded-sm  w-[7rem] mt-2 py-2 px-3 border border-slate-300 outline-none text-[15px]"
            >
              <option value="test1">test1</option>
              <option value="test2">test2</option>
              <option value="test3">test3</option>
            </select>
          </div>
          {/*   Product Price */}

          <div>
            <label className="text-gray-600 block" htmlFor="">
              Product Price
            </label>
            <input
              type="number"
              placeholder="$20"
              className="rounded-sm  w-[7rem] mt-2 py-2 px-3 border border-slate-300 outline-none text-[15px]"
            />
          </div>
        </div>

        <button className="w-[7rem] py-3 text-white bg-black mt-4 text-sm rounded-sm">
          ADD
        </button>
      </div>
    </div>
  );
};

export default AddItems;
