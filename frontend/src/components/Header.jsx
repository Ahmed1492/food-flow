const Header = () => {
  return (
    <div className="bg-header w-full h-[50vh] md:h-[74vh] test2 md:test1 ">
      <div className="flex flex-col gap-7 ps-[1rem] md:ps-[6rem] pb-[2rem] md:pb-[4rem] justify-end w-full h-full ">
        <h2 className="text-2xl font-bold md:font-semibold md:text-6xl md:leading-20 ">
          Order Your <br /> favourite food here
        </h2>
        <p className="max-w-2xl text-sm md:text-base font-medium">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button className="bg-white text-[#747474] rounded-full text-sm  md:text-base px-[1rem] md:px-[2rem] py-2 cursor-pointer w-max">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
