import React, { useContext } from 'react'
import { Link , useLocation, useNavigate} from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const ride = location.state.ride
    const {socket}  = useContext(SocketContext)
    const navigate = useNavigate()
    socket.on('ride-ended', (ride) => {
        console.log(ride)
        navigate('/home', )
      })
    return (
        <div className='h-screen'>
            <Link to={'/home'} className="fixed w-10 right-2 top-2 h-10 bg-white items-center flex justify-center rounded-full z-10">
            <i className="ri-home-4-line text-lg font-semibold"></i>
            </Link>
            <div className='h-1/2'>
            <LiveTracking/>
            </div>
            <div className='h-1/2'>
                <div className='flex items-center justify-between px-5 py-3'>
                    <img className='h-10 ' 
                    src={ride.captain.vehicle.vehicleType === 'car' ? 'https://i.pinimg.com/originals/93/c1/05/93c105244c0a3de81267a89cb13386f7.png' : ride.captain.vehicle.vehicleType === 'auto' ? 'https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png' : 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png'}
                    alt="" />
                    <div className='flex flex-col items-end '>
                        <h2 className='text-lg font-medium'>{ride.captain.fullname.firstname + " " +ride.captain.fullname.lastname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>{ride.captain.vehicle.color+" "+ride.captain.vehicle.vehicleType}</p>
                    </div>
                </div>
                <div className=' flex flex-col'>
                    <div className='w-full border-t-1 border-gray-300 '>
                        <div className='flex items-center px-5 pt-2 '>
                            <i className="ri-map-pin-range-fill text-xl mr-4"></i>
                            <div className='border-b-1 border-gray-300 pb-2 w-full'>
                                <h3 className='text-xl font-bold'>Destination</h3>
                                <p className='text-sm'>{ride.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center px-5 pb-2 pt-1'>
                            <i className="ri-bank-card-2-fill text-lg mr-4"></i>                        <div>
                                <h3 className='text-xl font-bold'>₹{ride.fare}</h3>
                                <p className='text-sm'>Cash Cash</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center w-full mt-6'>
                        <button className='py-2 bg-green-500 w-[90%] rounded-lg text-white  '>Make Payment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Riding