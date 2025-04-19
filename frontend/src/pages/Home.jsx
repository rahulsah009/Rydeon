import React, { useRef, useState, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/usercontext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const [distanceTime, setDistanceTime] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    // socket.on('join', {userType:'user',userId:user._id} )
    socket.emit("join", { userType: "user", userId: user._id });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
    console.log(ride);
  });

  socket.on("ride-started", (ride) => {
    console.log(ride);
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } }); // Updated navigate to include ride data
  });

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: "24",
          // opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: "0",
          // opacity:0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen, panelCloseRef]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  async function findTrip() {
    if (pickup && destination) {
      setVehiclePanel(true);
      setPanelOpen(false);
      const fare = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const distanceTime = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-distance-time`,
        {
          params: { origin: pickup, destination: destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(fare.data);
      setDistanceTime(distanceTime.data);
    }
  }

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  }
  return (
    <div className="h-screen relative overflow-hidden">
      <div className="h-screen w-screen ">
        <LiveTracking />
      </div>
      <div className="flex flex-col justify-end h-screen absolute  top-0 w-full">
        <div className="bg-white px-6 pb-2 pt-1 h-[30%] relative ">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute top-0 right-3 opacity-0 text-2xl"
          >
            <i className="ri-arrow-down-wide-fill"></i>
          </h5>
          <h4 className="font-bold text-2xl">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-12 w-1 top-[38%] bg-gray-800 rounded-2xl left-12"></div>
            <input
              onClick={() => {
                setActiveField("pickup");
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="w-full bg-gray-100 py-3 px-12 rounded-lg mt-1"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setActiveField("destination");
                setPanelOpen(true);
              }}
              className="w-full bg-gray-100 py-3 px-12 rounded-lg mt-3 "
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={handleDestinationChange}
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white py-2 rounded-lg mt-3 w-full"
          >
            find a trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white ">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            pickup={pickup}
            destination={destination}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full  z-10 bottom-0 translate-y-full px-2 py-8 bg-white "
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          fare={fare}
          distanceTime={distanceTime}
          setVehicleType={setVehicleType}
        />
      </div>
      <div
        ref={confirmedRidePanelRef}
        className="fixed w-full  z-10 bottom-0 translate-y-full pt-8 pb-8 bg-white "
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-7"
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          fare={fare}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full  z-10 bottom-0 py-6 pt-10 bg-white pb-10 "
      >
        <WaitingForDriver
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default Home;
