import React from "react";

const Header = () => {
  return (
    <div className="bg-header">
      <div className="flex flex-col gap-7 ps-[6rem] pb-[4rem] justify-end w-full h-full ">
        <h2 className="text-6xl leading-20 font-semibold">
          Order Your <br /> favourite food here
        </h2>
        <p className="max-w-2xl font-medium">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button className="bg-white text-[#747474] rounded-full px-[2rem] cursor-pointer py-2 w-max">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
