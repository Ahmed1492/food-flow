import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:4000";
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const cartTotal = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = data.find((i) => i._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const getFoods = async () => {
    try {
      let myResponse = await axios.get(`${url}/api/food/get`);
      console.log(myResponse.data.food);
      setData(myResponse.data.food);
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue = {
    food_list,
    addToCart,
    removeFromCart,
    cartItems,
    setCartItems,
    cartTotal,
    url,
    token,
    setToken,
    data,
    setData,
  };

  useEffect(() => {
    getFoods();
  }, []);

  useEffect(() => {
    // console.log("cartItems ", cartItems);
    cartTotal();
  }, [cartItems]);

  useEffect(() => {
    if (localStorage.getItem("food_flow_token")) {
      setToken(localStorage.getItem("food_flow_token"));
    }
    // console.log("token ", token);
  }, [token]);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
