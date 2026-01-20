import React, { useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const LoginPop = ({ setIsLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [loginState, setLoginState] = useState("login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const collectData = (e) => {
    let keys = e.target.name;
    let values = e.target.value;
    setData((data) => ({ ...data, [keys]: values }));
    // console.log(data);
  };

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return toast.error("please fill all data");
    }
    try {
      let myResponse = await axios.post(
        `${url}/api/auth/${loginState == "login" ? "login" : "register"}`,
        data,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      );
      console.log(myResponse.data);
      if (myResponse.data.success) {
        setToken(myResponse.data.token);
        toast.success(myResponse.data.message);
        // save token to local storage
        localStorage.setItem("food_flow_token", myResponse.data.token);
        setIsLogin(false);
      } else {
        toast.error(myResponse.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed left-0 right-0 top-0 fadeIn  bottom-0 bg-black-light flex  items-center justify-center z-50 ">
      <form className="bg-white px-4 pt-4 pb-5  w-max rounded-lg" action="">
        <div className="flex items-center justify-between my-4">
          <h2 className="text-2xl  font-bold">
            {loginState !== "login" ? "Sign Up" : "Login"}
          </h2>

          <span
            onClick={() => setIsLogin(false)}
            className="font-semibold text-2xl cursor-pointer text-gray-500"
          >
            x
          </span>
        </div>
        <div className="flex flex-col gap-5 items-center w-[24rem] mt-[2rem]">
          {loginState !== "login" && (
            <input
              className="bg-transparent border border-gray-300 outline-0 rounded-lg py-2 px-3 w-full"
              type="text"
              placeholder="Your name"
              name="name"
              value={data.name}
              onChange={collectData}
            />
          )}
          <input
            className="bg-transparent border border-gray-300 outline-0 rounded-lg py-2 px-3 w-full"
            type="text"
            placeholder="Your email"
            name="email"
            value={data.email}
            onChange={collectData}
          />
          <input
            className="bg-transparent border border-gray-300 outline-0 rounded-lg py-2 px-3 w-full"
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={collectData}
          />

          <button
            onClick={handleAuth}
            className="bg-[tomato] hover:bg-red-500 transition-all duration-300 ease-in-out py-2 text-white rounded-lg w-full cursor-pointer shadow-md hover:shadow-lg hover:scale-[1.02]"
          >
            {loginState !== "login" ? "Create account" : "Login"}
          </button>

          <div className="flex justify-start items-start w-full   gap-2">
            <input className="mt-1" type="checkbox" />
            <p className="text-[15px] text-gray-500 items-start ">
              By continuing, I agree to the terms of use & <br /> privacy
              policy.
            </p>
          </div>
        </div>
        {loginState === "login" ? (
          <p className="text-gray-600 mt-[1rem] text-[14px]">
            Create new account?
            <span
              onClick={() => setLoginState("sign-up")}
              className="text-[tomato] ms-2 cursor-pointer font-semibold"
            >
              sign up here
            </span>
          </p>
        ) : (
          <p className="text-gray-600 mt-[1rem] text-[14px]">
            Already have an account?
            <span
              onClick={() => setLoginState("login")}
              className="text-[tomato] ms-2 cursor-pointer font-semibold"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPop;
