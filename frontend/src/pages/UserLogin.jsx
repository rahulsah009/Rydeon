import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/usercontext";
import axios from "axios";

const UserLogin = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userData
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
    setEmail("");
    setPassword("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="h-screen flex justify-between flex-col bg-[#eeeeee]">
      <form onSubmit={handleUserSubmit}>
        <div className="  flex flex-col  pt-8 ">
          <img
            className=" w-16 ml-8 bg-transparent"
            src="./src/assets/rydeon.png"
            alt="logo"
          />
          <div className=" pb-7 py-3 px-4 ">
            <h2 className="text-2xl font-bold ">Get Started with Rydeon</h2>
            <input
              className="w-full bg-gray-100 py-3 px-2 rounded mt-5"
              type="text"
              placeholder="Email"
              required
              onChange={handleEmailChange}
              value={email}
            />
            <input
              className="w-full bg-gray-100 py-3 px-2 rounded mt-5"
              type="password"
              placeholder="Password"
              required
              onChange={handlePasswordChange}
              value={password}
            />
            <button className="w-full flex justify-center items-center bg-neutral-900 text-white py-3 rounded-lg mt-5 hover:bg-neutral-950 mb-2">
              Login
            </button>
            <p>
              New here ?{" "}
              <Link to={"/signup"} className="text-blue-600">
                create New Account
              </Link>
            </p>
          </div>
        </div>
      </form>
      <div className="py-3 px-4 pb-5">
        <Link
          to={"/captain-login"}
          className="w-full flex justify-center items-center bg-yellow-400 text-white py-3 rounded-lg mt-5 hover:bg-neutral-950 mb-2"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
