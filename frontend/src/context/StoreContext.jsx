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

  // --------------------------- clinet --------------------------------
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await addToCartServer(itemId);
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await removeFromCartServer(itemId);
    }
  };
  const cartTotal = () => {
    let totalAmount = 0;
    if (cartItems) {
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = data.find((i) => i._id === item);
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
      return totalAmount;
    }
  };

  // --------------------------- clinet --------------------------------

  // --------------------------- server --------------------------------
  const getFoods = async () => {
    try {
      let myResponse = await axios.get(`${url}/api/food/get`);
      // console.log(myResponse.data.food);
      setData(myResponse.data.food);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCartServer = async (itemId) => {
    try {
      let myResponse = await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        {
          headers: {
            token: token,
          },
        }
      );
      await fetchCardData();
      // console.log(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCartServer = async (itemId) => {
    try {
      let myResponse = await axios.put(
        `${url}/api/cart/remove`,
        { itemId },
        {
          headers: {
            token: token,
          },
        }
      );
      await fetchCardData();
      // console.log(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCardData = async () => {
    try {
      let myResponse = await axios.get(`${url}/api/cart/get`, {
        headers: {
          token: token,
        },
      });
      // console.log("cart items ", myResponse.data.userCart);
      setCartItems(myResponse?.data?.userCart);
      // console.log("cart ", cartItems);
    } catch (error) {
      console.log(error);
    }
  };
  // --------------------------- server --------------------------------

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
    addToCartServer,
    removeFromCartServer,
  };

  useEffect(() => {
    getFoods();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("food_flow_token")) {
      setToken(localStorage.getItem("food_flow_token"));
      fetchCardData();
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
