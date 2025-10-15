import React, { useState } from "react";
import Header from "../components/Header";
import ExploreMenu from "../components/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay";
import Footer from "../components/Footer";
import MobileApp from "../components/MobileApp";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="px-[8%] py-7">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />

      <MobileApp />
    </div>
  );
};

export default Home;
