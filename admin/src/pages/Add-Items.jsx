import React, { useEffect, useState } from "react";
import upload_area from "../assets/upload_area.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddItems = ({ setCurrentPage, url }) => {
  const location = useLocation();
  let path = location.pathname;
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "salad",
    price: "",
  });

  const collectData = (e) => {
    let keys = e.target.name;
    let values = e.target.value;
    let newObj = { ...data };
    newObj[keys] = values;
    setData(newObj);
    console.log("data ", newObj);
    console.log("image ", image);
    // setData((data) => ({ ...data, [keys]: values }));
  };

  const addNewItem = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      let myResponse = await axios.post(`${url}/api/food/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(myResponse.data);

      if (myResponse.data.succeeded) {
        toast.success("Item added successfully!");
        // setData({ name: "", description: "", price: "", category: "salad" });
        setImage(false);
      } else {
        toast.error(myResponse.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding item!");
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

  return (
    <div className="p-[3rem]">
      <label className="flex flex-col gap-3 cursor-pointer">
        <p className="text-gray-600">Upload Image</p>
        <img
          src={image ? URL.createObjectURL(image) : upload_area}
          alt="upload_area"
          className="w-[8rem] rounded-sm"
        />
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          className="hidden"
        />
      </label>

      <form className="flex flex-col gap-1 mt-5">
        {/* Product name */}
        <label className="text-gray-600" htmlFor="">
          Product name
        </label>
        <input
          onChange={collectData}
          type="text"
          name="name"
          value={data.name}
          placeholder="Type here"
          className="rounded-md w-[25rem] py-2 px-3 border border-slate-300 outline-none text-[15px]"
        />

        {/*   Product description */}

        <label className="text-gray-600 mt-4" htmlFor="">
          Product description
        </label>
        <textarea
          value={data.description}
          name="description"
          onChange={collectData}
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
              onChange={collectData}
              type="text"
              name="category"
              placeholder="Type here"
              className="rounded-sm  w-[7rem] mt-2 py-2 px-3 border border-slate-300 outline-none text-[15px]"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure-Veg ">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          {/*   Product Price */}

          <div>
            <label className="text-gray-600 block" htmlFor="">
              Product Price
            </label>
            <input
              value={data.price}
              onChange={collectData}
              name="price"
              type="number"
              placeholder="$20"
              className="rounded-sm  w-[7rem] mt-2 py-2 px-3 border border-slate-300 outline-none text-[15px]"
            />
          </div>
        </div>

        <button
          onClick={addNewItem}
          className="w-[7rem] py-3 text-white bg-black mt-4 text-sm rounded-sm cursor-pointer"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddItems;
