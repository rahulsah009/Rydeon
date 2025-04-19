import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { Link , useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

  const location = useLocation()
  const ride = location.state.ride

  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)

  useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef .current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])

  return (
    <div className='h-screen'>
      <div className='fixed p-3 top-0 flex items-center justify-between w-full z-10'>
        <img className='w-16 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber_logo" />
        <Link to={'/captain-home'} className=" w-10 h-10 bg-white items-center flex justify-center rounded-full">
          <i className="ri-logout-box-line text-lg font-semibold"></i>
        </Link>
      </div>
      <div className='h-4/5'>
      <LiveTracking/>
      </div>
      <div onClick={()=>{
        setFinishRidePanel(true)
      }}
       className='h-1/5 p-6 bg-yellow-400 flex justify-between items-center relative'>
        <h5
          onClick={() => {

          }}
          className='absolute top-0 right-3  text-2xl w-[93%] text-center '>
          <i className="ri-arrow-up-wide-fill "></i>
        </h5>
        <h4 className='text-xl font-semibold'>{ride.distance} KM away</h4>
        <button onClick={() => {

        }} className='bg-green-500 py-2 px-10 rounded-lg mt-2 '>Complete Ride</button>
      </div>
      <div ref={finishRidePanelRef} className='fixed w-full  z-10 bottom-0 translate-y-full  px-2 py-8 bg-white '>
        <FinishRide 
        setFinishRidePanel={setFinishRidePanel} 
        ride={ride}
        />
      </div>
    </div>
  )
}

export default CaptainRiding