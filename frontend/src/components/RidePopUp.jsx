import React from "react";

const RidePopUp = (props) => {
  return (
    <div className="">
      <h5
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
        className="absolute top-0 right-3  text-2xl "
      >
        <i className="ri-arrow-down-wide-fill "></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-3 px-4">New Ride Available!</h3>
      <div className="px-4 flex items-center justify-between mb-3 bg-yellow-400 rounded-lg py-2">
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
            <i className="ri-bank-card-2-fill text-lg mr-4"></i>
            <div>
              <h3 className="text-xl font-bold">
                ₹{(props.ride?.fare ?? 0).toFixed(2)}
              </h3>
              <p className="text-sm">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="flex justify-around w-full">
          <button
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
            className="bg-gray-300 text-gray-700 py-2 px-10 rounded-lg mt-2 "
          >
            Ignore
          </button>
          <button
            onClick={() => {
              props.acceptRide();
            }}
            className="bg-green-500 py-2 px-10 rounded-lg mt-2 "
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
