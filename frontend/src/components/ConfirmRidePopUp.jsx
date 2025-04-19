import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: { rideId: props.ride._id, otp: otp },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      props.setConfirmRidePopupPanel(false);
      props.setRidePopupPanel(false);
      navigate("/captain-riding", { state: { ride: props.ride } });
    }
  };

  return (
    <div>
      <div>
        <h5
          onClick={() => {
            props.setConfirmRidePopupPanel(false);
          }}
          className="absolute top-0 right-3  text-2xl "
        >
          <i className="ri-arrow-down-wide-fill"></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-3 px-4">
          Confirm this ride to start
        </h3>
      </div>
      <div className="px-4 flex items-center justify-between mb-3 border-yellow-400 border-2 rounded-lg py-2">
        <div className="flex items-center gap-3">
          <img
            className="h-15  rounded-full p-2 bg-gray-300"
            src="https://i.pinimg.com/736x/20/57/2b/20572baabbf418db9cfb52c5026fdce1.jpg"
            alt=""
          />
          <h2 className="text-xl font-medium ">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">{props.ride?.distance}Km</h5>
      </div>
      <div className=" flex justify-between items-center flex-col">
        <div className="w-full border-t-1 border-gray-300 ">
          <div className="flex  items-center px-5 pt-2 ">
            <i className="ri-map-pin-range-fill text-xl mr-4"></i>
            <div>
              <h3 className="text-xl font-bold">Pickup</h3>
              <p className="text-sm">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center px-5 py-2 ">
            <i className="ri-square-fill text-lg mr-4"></i>
            <div className="border-y-1 py-2 border-gray-300">
              <h3 className="text-xl font-bold">Destination</h3>
              <p className="text-sm">{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center px-5 pb-2">
            <i className="ri-bank-card-2-fill text-lg mr-4"></i>{" "}
            <div>
              <h3 className="text-xl font-bold">₹{props.ride?.fare}</h3>
              <p className="text-sm">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="flex flex-col w-full p-2"
          >
            <input
              type="text"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              className="w-full bg-gray-100 py-3 px-12 rounded-lg mt-3 text-center font-mono font-semibold"
              placeholder="Enter OTP"
            />
            <button className="bg-green-500 py-2 text-lg rounded-lg mt-2 text-center ">
              Confirm
            </button>
            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
              className="bg-red-500 text-lg text-white py-2  rounded-lg mt-3 "
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
