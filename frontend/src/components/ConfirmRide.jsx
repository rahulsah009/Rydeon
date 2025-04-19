import React from 'react'
import axios from 'axios'

const ConfirmRide = ({ setConfirmRidePanel, setVehicleFound, createRide, pickup, destination, vehicleType, fare }) => {
    const handleConfirm = async () => {
        setVehicleFound(true);
        setConfirmRidePanel(false);
        createRide();   
    }

    return (
        <div className='h-[69vh]'>
            <h5
                onClick={() => setConfirmRidePanel(false)}
                className='absolute top-0 right-3 text-2xl cursor-pointer'>
                <i className="ri-arrow-down-wide-fill"></i>
            </h5>
            <h3 className='text-2xl font-semibold mb-3 px-4'>Confirm your Ride</h3>
            <div className='flex justify-between items-center flex-col'>
                <img 
                    className='h-30 mb-3' 

                    src={vehicleType === 'car' ? 'https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png' : vehicleType === 'moto' ? 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png' : 'https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png'}
                    alt="vehicle" 
                />
                <div className='w-full border-t-1 border-gray-300'>
                    <div className='flex items-center px-5 pt-2'>
                        <i className="ri-map-pin-range-fill text-xl mr-4"></i>
                        <div>
                            <h3 className='text-xl font-bold'>Pickup Location</h3>
                            <p className='text-sm'>{pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center px-5 py-2'>
                        <i className="ri-square-fill text-lg mr-4"></i>
                        <div className='border-y-1 py-2 border-gray-300'>
                            <h3 className='text-xl font-bold'>Destination</h3>
                            <p className='text-sm'>{destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center px-5 pb-2'>
                        <i className="ri-bank-card-2-fill text-lg mr-4"></i>
                        <div>
                            <h3 className='text-xl font-bold'>₹{parseInt(fare[vehicleType])}</h3>
                            <p className='text-sm'>Cash Payment</p>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={handleConfirm}
                    className='bg-green-500 text-white py-2 w-[90%] rounded-lg mt-5 hover:bg-green-600 transition-colors'>
                    Confirm
                </button>
            </div>
        </div>
    )
}

export default ConfirmRide