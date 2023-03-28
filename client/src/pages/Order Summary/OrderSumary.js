import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/Userdata'
import jwt_decode from "jwt-decode";
import moment from 'moment'
import SubmitRequest from '../../components/Consultant/Requests/SubmitRequest';
import SessionBooked from '../../components/BookedSuccess/SessionBooked';




function OrderSumary() {

    const { state } = useLocation()
    
    const [data, setData] = useState()
    const [booked, setBooked] = useState(false)
    const [values, setValues] = useState({ patientName: "", patientMobile: "" });
    const [details,setDetails] = useState({userId:'',counselorId:''})
    // const tomorrow = moment().add(1, 'days').format('MMMM Do YYYY');
    const navigate = useNavigate()

    const { auth } = useContext(AuthContext)
    console.log(auth, "authh")
    if (auth.jwt) {
        var decoded = jwt_decode(auth?.jwt);

    }

    useEffect(() => {
        setData(state)
    }, [data])

    const bookSession = () => {
        decoded && axios.post('/users/book-session', {
            counselor: data.counselor,
            time: data.date,
            plan: data.planDetails,
            date: data.bookedDate,
            user: decoded.user,
            patientDetails: values
        }).then(async(response) => {
            let {data} = await axios.post('/conversations',response.data)
            console.log(details,"detailsss")
            navigate('/session-booked')
        })
    }

    const initPayment = (data) => {
        const options = {
            key: "rzp_test_khKmZVOsrKJQDv",
            amount: data.amount,
            currency: data.currency,
            name: 'feelgood.com',
            description: "Book sessions",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const { data } = await axios.post('/users/verify-payment', response)
                    console.log(data)
                    bookSession()
                } catch (err) {
                    console.log(err)
                }
            },
            theme: {
                color: '#3399cc'
            },

        }
        const rzp1 = new window.Razorpay(options)
        rzp1.open()
    }

    const makePayment = (e) => {
        e.preventDefault()
        try {
            axios.post('/users/confirm-appointment').then((data) => {
                console.log(data)
                initPayment(data.data)
            })
        } catch (err) {
            console.log(err)
        }


    }


    return (

        <>
            {data && <div class={`py-14  px-4 md:px-6 2xl:px-20 2xl:container relative 2xl:mx-auto `}>

                <div class={`flex justify-start item-start space-y-2 flex-col ${booked ? 'blur-sm' : 'blur-none'}`}>
                    <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 text-blue-900 text-center lg:leading-9 ">Order Summary</h1>
                </div>
                <div class="mt-10 flex flex-col xl:flex-row   jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div class="flex flex-col justify-start  items-start w-full space-y-4 md:space-y-6 xl:space-y-8">


                        <div class="flex justify-center relative flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div class={`flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-200 dark:bg-gray-800 space-y-6 ${booked ? 'blur-sm' : 'blur-none'}`}>
                                <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Counselor Details</h3>
                                <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    <div class="flex justify-between w-full">
                                        <p class="text-2xl font-bold text-blue-900">{data.counselor.fullname}</p>
                                    </div>
                                    <div class="flex justify-between items-center w-full">
                                        <p class="text-base dark:text-white leading-4 text-gray-800">{data.counselor.qualification}</p>

                                    </div>
                                    <div class="flex justify-between items-center w-full">
                                        <p class="text-base dark:text-white leading-4 text-gray-800">{data.counselor.experience} years experience</p>
                                    </div>
                                </div>

                            </div>
                            
                            <div class={`flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-200 dark:bg-gray-800 space-y-6 ${booked ? 'blur-sm' : 'blur-none'}`}>
                                <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">{data.planDetails.name}</h3>
                                <h1 className='text-2xl font-bold text-blue-900'>{data.planDetails.plan}</h1>
                                <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">TIme and Date</h3>
                                <h1 className='text-2xl font-bold text-blue-900'>{data.bookedDate} , {data.date}</h1>
                                <div class="flex justify-between items-start w-full">

                                </div>
                                <p>{data.planDetails.description}</p>
                            </div>

                        </div>
                    </div>

                    {booked && <div className={`absolute grid grid-cols-1 justify-center ${booked ? 'blur-none' : 'blur-sm'}`}>
                                <SessionBooked className='' />
                            </div>}

                    <div class={`bg-gray-200 relative  dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4  md:p-6 xl:p-8 flex-col ${booked ? 'blur-sm' : 'blur-none'}`}>
                        <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Patient Details</h3>
                        <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">

                            <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                <form action="">
                                    <input type="text" name='patientName' id="helper-text" onChange={(e) =>
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                    } aria-describedby="helper-text-explanation" class="bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Patient name..." />

                                    <input type="text" name='patientMobile' id="helper-text" onChange={(e) =>
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                    } aria-describedby="helper-text-explanation" class="bg-gray-50 border mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mobile number..." />

                                    <div class="flex w-full mt-5 justify-center items-center md:justify-start md:items-start">
                                        <button onClick={makePayment} type='submit' class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">Make Payment</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>


                <div className={`${booked ? 'blur-sm' : 'blur-none'}`}>
                    <h1 className='text-2xl font-bold mt-5'>Key Features</h1>
                    <ul className='marker:text-orange-600 list-outside list-disc'>
                        <li className='text-xl mt-7 ml-10'>
                            Choosing the medium to talk is completely up to you. Chat sessions, Video sessions and Audio sessions <br /> are available, it’s completely depends on your convenience.
                        </li>
                        <li className='text-xl mt-7 ml-10'>
                            Whatever the medium, the counsellers will be there for you with complete dedication according
                            to your time slot.
                        </li>
                        <li className='text-xl mt-7 ml-10'>
                            You can cancel the session absolutely 24 hours before your actual session and you can postpone the session. After the deadline, you will not be able to cancel the session.
                        </li>

                    </ul>
                </div>




            </div>}


        </>


    )
}

export default OrderSumary
