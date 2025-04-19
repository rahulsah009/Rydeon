import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const Captainlogin = () => {
  const navigate = useNavigate();

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const captainData = { email, password };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        captainData
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        console.log(data);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signup failed:", error.response?.data);
      alert(error.response?.data?.errors[0].msg);
    }
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
              minLength={6}
              required
              onChange={handlePasswordChange}
              value={password}
            />
            <button className="w-full flex justify-center items-center bg-yellow-400 text-white py-3 rounded-lg mt-5 hover:bg-neutral-950 mb-2">
              Login
            </button>
            <p>
              Join the fleet by{" "}
              <Link to={"/captain-signup"} className="text-blue-600">
                create New Account as Captain
              </Link>
            </p>
          </div>
        </div>
      </form>
      <div className="py-3 px-4 pb-5">
        <Link
          to={"/login"}
          className="w-full flex justify-center items-center bg-neutral-900 text-white py-3 rounded-lg mt-5 hover:bg-neutral-950 mb-2"
        >
          Sign in as User{" "}
        </Link>
      </div>
    </div>
  );
};

export default Captainlogin;
