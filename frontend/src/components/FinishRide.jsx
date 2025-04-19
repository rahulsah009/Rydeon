import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const FinishRide = (props) => {
  const navigate = useNavigate();
  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      navigate("/captain-home");
    } else {
      console.log("error");
    }
  }

  return (
    <div>
      <div>
        <h5
          onClick={() => {
            props.setFinishRidePanel(false);
          }}
          className="absolute top-0 right-3  text-2xl "
        >
          <i className="ri-arrow-down-wide-fill"></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-3 px-4">Finish this Ride</h3>
      </div>
      <div className="px-4 flex items-center justify-between mb-3 border-yellow-400 border-2 rounded-lg py-2">
        <div className="flex items-center gap-3">
          <img
            className="h-15  rounded-full p-2 bg-gray-300"
            src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
            alt=""
          />
          <h2 className="text-xl font-medium ">
            {props.ride.user.fullname.firstname +
              " " +
              props.ride.user.fullname.firstname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">{props.ride.distance}Km</h5>
      </div>
      <div className=" flex justify-between items-center flex-col">
        <div className="w-full border-t-1 border-gray-300 ">
          <div className="flex  items-center px-5 pt-2 ">
            <i className="ri-map-pin-range-fill text-xl mr-4"></i>
            <div>
              <h3 className="text-xl font-bold">Pickup</h3>
              <p className="text-sm">{props.ride.pickup}</p>
            </div>
          </div>
          <div className="flex items-center px-5 py-2 ">
            <i className="ri-square-fill text-lg mr-4"></i>
            <div className="border-y-1 py-2 border-gray-300">
              <h3 className="text-xl font-bold">Destination</h3>
              <p className="text-sm">{props.ride.destination}</p>
            </div>
          </div>
          <div className="flex items-center px-5 pb-2">
            <i className="ri-bank-card-2-fill text-lg mr-4"></i>{" "}
            <div>
              <h3 className="text-xl font-bold">₹{props.ride.fare}</h3>
              <p className="text-sm">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="w-full mt-5 flex flex-col text-center">
          <button
            onClick={() => {
              endRide();
            }}
            className="bg-green-500 py-2 w-[100%] rounded-lg mt-2 text-center text-lg "
          >
            Finish Ride
          </button>
          <p className="text-red-400 mt-5 text-sm">
            Click on finish ride button if you have completed the payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
