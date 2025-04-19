import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className=''>
      <h5
        onClick={() => {
          props.setWaitingForDriver(false)
        }}
        className='absolute top-0 right-3  text-2xl '>
        <i className="ri-arrow-down-wide-fill "></i>
      </h5>
      <h4 className='absolute top-1 left-2 text-2xl font-semibold animate-bounce text-slate-600'>{props.ride?.otp}</h4>
      <div className='flex items-center justify-between p-5'>
        <img className='h-10 ' src="https://www.asaproadworthys.com.au/wp-content/uploads/2021/11/Select-768x431.jpeg" alt="" />
        <div className='flex flex-col items-end '>
          <h2 className='text-lg font-medium'>{props.ride?.captain.fullname.firstname +" "+ props.ride?.captain.fullname.lastname }</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-600'>{props.ride?.captain.vehicle.color + " "+props.ride?.captain.vehicle.vehicleType}</p>
        </div>
      </div>
      <div className=' flex justify-between items-center flex-col'>

        <div className='w-full border-t-1 border-gray-300 '>
          <div className='flex  items-center px-5 pt-2 '>
            <i className="ri-map-pin-range-fill text-xl mr-4"></i>
            <div>
              <h3 className='text-xl font-bold'>Pickup</h3>
              <p className='text-sm'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center px-5 py-2 '>
            <i className="ri-square-fill text-lg mr-4"></i>
            <div className='border-y-1 py-2 border-gray-300'>
              <h3 className='text-xl font-bold'>Destination</h3>
              <p className='text-sm'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center px-5 pb-2'>
            <i className="ri-bank-card-2-fill text-lg mr-4"></i>                        <div>
              <h3 className='text-xl font-bold'>₹{props.ride?.fare}</h3>
              <p className='text-sm'>Cash Cash</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver