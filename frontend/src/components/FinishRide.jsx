import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const FinishRide = (props) => {

    const navigate = useNavigate()

    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

            rideId: props.ride._id


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }
    }

    return (
    <div>

        <div
            className='flex justify-center mb-4'
            onClick={() => props.setFinishRidePanel(false)}
        >
            <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
        </div>

        <h3 className='text-2xl font-semibold mb-6'>
            Finish Ride
        </h3>

        <div className='flex items-center justify-between p-4 bg-gray-100 rounded-2xl'>

            <div className='flex items-center gap-3'>

                <img
                    className='h-12 w-12 rounded-full object-cover'
                    src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
                    alt=""
                />

                <div>
                    <h2 className='text-lg font-semibold'>
                        {props.ride?.user?.fullname?.firstname}{' '}
                        {props.ride?.user?.fullname?.lastname}
                    </h2>

                    <p className='text-sm text-gray-500'>
                        Passenger
                    </p>
                </div>

            </div>

            <span className='font-semibold'>
                2.2 KM
            </span>

        </div>

        <div className='mt-5'>

            <div className='p-4 border-b'>
                <div className='flex gap-4'>
                    <i className="text-xl ri-map-pin-user-fill"></i>

                    <div className='min-w-0'>
                        <p className='text-xs text-gray-500'>
                            Pickup
                        </p>

                        <p className='text-sm break-words'>
                            {props.ride?.pickup}
                        </p>
                    </div>
                </div>
            </div>

            <div className='p-4 border-b'>
                <div className='flex gap-4'>
                    <i className="text-xl ri-map-pin-2-fill"></i>

                    <div className='min-w-0'>
                        <p className='text-xs text-gray-500'>
                            Destination
                        </p>

                        <p className='text-sm break-words'>
                            {props.ride?.destination}
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-between p-4'>
                <div className='flex items-center gap-4'>
                    <i className="text-xl ri-currency-line"></i>

                    <div>
                        <p className='text-xs text-gray-500'>
                            Fare
                        </p>

                        <p className='text-xl font-semibold'>
                            ₹{props.ride?.fare}
                        </p>
                    </div>
                </div>

                <span className='text-sm text-gray-600'>
                    Cash
                </span>
            </div>

        </div>

        <button
            onClick={endRide}
            className='w-full mt-6 bg-green-600 text-white text-lg font-semibold py-3 rounded-xl active:scale-95 transition'
        >
            Finish Ride
        </button>

    </div>
)
}

export default FinishRide