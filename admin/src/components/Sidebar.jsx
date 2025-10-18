import add_icon from "../assets/add_icon.png";
import order_icon from "../assets/order_icon.png";
import { Link } from "react-router-dom";
const Sidebar = ({ currenPage, setCurrentPage }) => {
  return (
    <div className="border-r-2 min-h-[70vh] border-slate-300 ">
      <div className="pt-[3rem] ps-[3rem] flex flex-col gap-6">
        {/* Add Items */}
        <Link
          onClick={() => setCurrentPage("add-items")}
          to="/"
          className={`flex items-center gap-3  px-4 rounded-s-md border-2 cursor-pointer border-e-0 ${
            currenPage === "add-items"
              ? "bg-red-100 border-red-300 "
              : "border-slate-300"
          }  py-3 w-[15rem]`}
        >
          <img src={add_icon} alt="add_icon" className="w-7 cursor-pointer" />
          <button className="cursor-pointer text-gray-800">Add Items</button>
        </Link>
        {/* List Items */}
        <Link
          onClick={() => setCurrentPage("list-items")}
          to="/list"
          className={`flex items-center gap-3  px-4 rounded-s-md border-2 cursor-pointer border-e-0 ${
            currenPage === "list-items"
              ? "bg-red-100 border-red-300 "
              : "border-slate-300"
          }  py-3 w-[15rem]`}
        >
          <img
            src={order_icon}
            alt="ListItems"
            className="w-7 cursor-pointer"
          />
          <button className="cursor-pointer text-gray-800">List Items</button>
        </Link>
        {/* Orders */}

        <Link
          onClick={() => setCurrentPage("orders")}
          to="/orders"
          className={`flex items-center gap-3  px-4 rounded-s-md border-2 cursor-pointer border-e-0 ${
            currenPage === "orders"
              ? "bg-red-100 border-red-300 "
              : "border-slate-300"
          }  py-3 w-[15rem]`}
        >
          <img
            src={order_icon}
            alt="order_icon"
            className="w-7 cursor-pointer"
          />
          <button className="cursor-pointer text-gray-800">Orders</button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
