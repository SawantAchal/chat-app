import React, { useState } from "react";
import assets from "../assets/assets";
import { login, signup } from "../config/firbase.js";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = (e) => {
    e.preventDefault();
    const { userName, email, password } = data;
    if (currentState === "Sign Up") {
      signup(userName, email, password);
    }else{
        login(email, password)
    }
    navigate('/chat')
  };

  return (
    <>
      <main
        className="min-h-[100vh] bg-no-repeat bg-cover flex items-center justify-evenly"
        style={{ backgroundImage: `url('/background.png')` }}
      >
        <img src={assets.logo_big} alt="chat logo" className="w-[max(20vw,200px)]" />
        <form onSubmit={onLogin} className="bg-white p-3 flex flex-col gap-5 rounded-xl">
          <h2 className="font-medium">{currentState}</h2>
          {currentState === "Sign Up" && (
            <input
              type="text"
              onChange={onChangeHandler}
              name="userName"
              placeholder="Username"
              className="pt-2 pb-2 pl-3 pr-3 border border-solid border-[#c9c9c9] rounded outline-blue-400"
              required
            />
          )}
          <input
            type="email"
            onChange={onChangeHandler}
            name="email"
            placeholder="Email Address"
            className="pt-2 pb-2 pl-3 pr-3 border border-solid border-[#c9c9c9] rounded outline-blue-400"
            required
          />
          <input
            type="password"
            onChange={onChangeHandler}
            name="password"
            placeholder="Password"
            className="pt-2 pb-2 pl-3 pr-3 border border-solid border-[#c9c9c9] rounded outline-blue-400"
            required
          />
          <button type="submit" className="bg-blue-600 text-white text-base rounded cursor-pointer p-3">
            {currentState === "Sign Up" ? "Create Account" : "Login"}
          </button>
          <div className="flex gap-1 text-sm text-gray-600">
            <input type="checkbox" />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>
          <div className="flex flex-col gap-1">
            {currentState === "Sign Up" ? (
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <span onClick={() => setCurrentState("Login")} className="font-medium text-blue-500 cursor-pointer">
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Create an Account{" "}
                <span onClick={() => setCurrentState("Sign Up")} className="font-medium text-blue-500 cursor-pointer">
                  Click here
                </span>
              </p>
            )}
          </div>
        </form>
      </main>
    </>
  );
};

export default LoginPage;
