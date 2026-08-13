import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const submitHander = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }
    }
    return (
        <div>
            <div
                className='flex justify-center mb-4 cursor-pointer'
                onClick={() => props.setRidePopupPanel(false)}
            >
                <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
            </div>

            <h3 className='text-2xl font-semibold mb-5'>
                New Ride Available
            </h3>

            <div className='flex items-center justify-between p-4 bg-yellow-400 rounded-2xl'>

                <div className='flex items-center gap-3 min-w-0'>

                    <img
                        className='h-12 w-12 rounded-full object-cover'
                        src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
                        alt=""
                    />

                    <h2 className='text-lg font-medium truncate'>
                        {props.ride?.user?.fullname?.firstname}{' '}
                        {props.ride?.user?.fullname?.lastname}
                    </h2>

                </div>

                <h5 className='text-lg font-semibold ml-3'>
                    2.2 KM
                </h5>

            </div>

            <div className='w-full mt-5'>

                <div className='flex items-start gap-4 p-4 border-b'>
                    <i className="text-xl ri-map-pin-user-fill"></i>

                    <div className='min-w-0'>
                        <h3 className='font-medium'>Pickup</h3>

                        <p className='text-sm text-gray-600 break-words'>
                            {props.ride?.pickup}
                        </p>
                    </div>
                </div>

                <div className='flex items-start gap-4 p-4 border-b'>
                    <i className="text-xl ri-map-pin-2-fill"></i>

                    <div className='min-w-0'>
                        <h3 className='font-medium'>Destination</h3>

                        <p className='text-sm text-gray-600 break-words'>
                            {props.ride?.destination}
                        </p>
                    </div>
                </div>

                <div className='flex items-center gap-4 p-4'>
                    <i className="text-xl ri-currency-line"></i>

                    <div>
                        <h3 className='font-medium'>
                            ₹{props.ride?.fare}
                        </h3>

                        <p className='text-sm text-gray-600'>
                            Cash
                        </p>
                    </div>
                </div>

            </div>

            <div className='flex gap-3 mt-4'>

                <button
                    onClick={() => {
                        props.setRidePopupPanel(false)
                    }}
                    className='w-1/3 bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl active:scale-95 transition'
                >
                    Ignore
                </button>

                <button
                    onClick={() => {
                        props.setConfirmRidePopupPanel(true)
                        props.confirmRide()
                    }}
                    className='flex-1 bg-green-600 text-white font-semibold py-3 rounded-xl active:scale-95 transition'
                >
                    Accept Ride
                </button>

            </div>

        </div>
    )
}

export default ConfirmRidePopUp