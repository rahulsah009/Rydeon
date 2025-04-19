import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <div className=" ">
        <h3 className="text-2xl font-semibold mb-3">Choose a Vehicle </h3>
        <h5
          onClick={() => {
            props.setVehiclePanel(false);
          }}
          className="absolute top-0 right-3  text-2xl"
        >
          <i className="ri-arrow-down-wide-fill"></i>
        </h5>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehicleType("car");
        }}
        className="flex flex-row mb-2 p-3 items-center justify-between rounded-lg active:border-2 shadow-md bg-gray-100 h-22"
      >
        <img
          className="h-15"
          src="https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            Mini{" "}
            <span>
              <i className="ri-user-fill"></i>4
            </span>{" "}
          </h4>
          <h5 className="font-medium text-sm">
            {parseInt(props.distanceTime.duration / 60)} mins away{" "}
          </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{parseInt(props.fare.car)}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehicleType("moto");
        }}
        className="flex flex-row mb-2 p-3 items-center justify-between rounded-lg active:border-2 shadow-md bg-gray-100  h-22"
      >
        <img
          className="h-17"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            MotoGo{" "}
            <span>
              <i className="ri-user-fill"></i>1
            </span>{" "}
          </h4>
          <h5 className="font-medium text-sm">
            {parseInt(props.distanceTime.duration / 60)} mins away{" "}
          </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, motocycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{parseInt(props.fare.moto)}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehicleType("auto");
        }}
        className="flex flex-row mb-2 p-3 items-center justify-between rounded-lg active:border-2 shadow-md bg-gray-100 h-22"
      >
        <img
          className="h-15"
          src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            Mini{" "}
            <span>
              <i className="ri-user-fill"></i>3
            </span>{" "}
          </h4>
          <h5 className="font-medium text-sm">
            {parseInt(props.distanceTime.duration / 60)} mins away{" "}
          </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹{parseInt(props.fare.auto)}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
