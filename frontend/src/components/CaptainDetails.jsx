import React,{useContext } from 'react'
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainDetails = () => {
    const { captain , setCaptain} = useContext(CaptainDataContext)
    return (
        <div>
            <div className='flex justify-between px-2 py-1 mb-2 border-b-1 border-gray-300'>
                <div className='flex items-center gap-2'>
                    <img className='h-15 p-2 bg-gray-100 rounded-full  ' src="https://th.bing.com/th/id/OIP.qSzcbkUC_fFYizN0IpcT8wHaK_?rs=1&pid=ImgDetMain" alt="" />
                    <h4 className='text-xl font-medium'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
                </div>

                <div>
                    <h4 className='text-xl font-semibold'>₹295.2</h4>
                    <p className='font-medium'>Earned</p>
                </div>
            </div>
            <div className='flex p-3 bg-gray-200 rounded-xl justify-between items-center text-center'>
                <div className=''>
                    <i className="ri-time-line text-3xl font-thin "></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div>
                    <i className="ri-speed-up-line text-3xl font-thin "></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div>
                    <i className="ri-booklet-line text-3xl font-thin "></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails