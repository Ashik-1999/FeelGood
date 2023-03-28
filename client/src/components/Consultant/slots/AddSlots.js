import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import CounselorAuthContext from '../../../context/CounselorContext';
import jwt_decode from "jwt-decode";
import Calender from '../Calender/Calender';
import Button from '../../button/Button';
import {FcLeave} from 'react-icons/fc'
import {MdDelete} from 'react-icons/md'



function AddSlots(props) {


    const [timeSlot, SetTimeSlot] = useState([])
    const [month,setMonth] = useState()
    const [selectedSlot,setSelectedSlot] = useState([])
    const [boolean,setBoolean] = useState(false)
    const [selectLeaveDate,setSelectLeaveDate] = useState(false)
    const [leave,setLeave] = useState({leaveDate:''})
    const [leaveDates, setLeaveDates] = useState([])
    
    
    let id = "secret"
    let slots
    const { counselorAuth } = useContext(CounselorAuthContext)
      

    let morning = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"]
    let afternoon = ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"]
    let evening = ["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"]
    // const [data,setData] = useState({
    //     id:props.id,
    //     details:[]
    // })

    
    useEffect(()=>{
        if (counselorAuth.jwt) {
            var decoded = jwt_decode(counselorAuth?.jwt);
            axios.get(`/counselor/get-counselor/${decoded.user._id}`).then(({data})=>{
                setSelectedSlot(data.slots)
                setLeaveDates(data.leaveDate)
            })
       }
    },[boolean])

    

    useEffect(() => {
        const currentDate = new Date();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemper', 'October', 'November', 'December'];
        const currentMonth = monthNames[currentDate.getMonth()];
        setMonth(currentMonth);
    }, []);

    const submitSlots = (e) => {
        e.preventDefault()
        axios.post('/counselor/add-slots',
           [timeSlot,{id:props.id}] ,{withCredentials:true}
        ).then(() => {
            setBoolean(boolean ? false : true)
            toast.success(`Successfully added timeslot.`, {
                toastId: id,
                theme: "light"
              });
        })
    }
    let selectLeave = async(e) =>{
        let {data} = await axios.post('/counselor/add-leave',
        [leave,{id:props.id}])
        setSelectLeaveDate(false)
        setLeave(null)
        toast.success(`Successfully added leave date.`, {
            toastId: id,
            theme: "light"
          });
          setBoolean(boolean ? false : true)       
    }

    const removeSlots = async(time) => {
       await axios.patch('/counselor/delete-slots',
        {time:time,id:props.id})
        setBoolean(boolean ? false : true)
    }

    return (
        <div>
            <div id="alert-border-1" class="flex flex-row justify-between  p-4 mb-4 text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800" role="alert">
                <div>
                    <svg  class="m-0 w-5 h-10  inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                    <p class="ml-2 m-0  inline-block font-semibold text-2xl text-center">
                        This is the time slot for <u>{month}</u> month
                    </p>
                </div>
                
                    <div>
                        <h5 className="mb-2 inline-block  items-end text-xl font-bold text-blue-700 tracking-tight  dark:text-white">Plan to take leave</h5><FcLeave className='inline-block ml-2' size={30}/>
                        <Calender class = 'inline-block ml-2' 
                        
                        onChange = {(e)=>{
                        setSelectLeaveDate(true)
                        setLeave({[e.target.name]: e.target.value })}} name = "leaveDate"/>

                        {selectLeaveDate && <button onClick={selectLeave}  className="max-w-md px-4 py-2 ml-2 tracking-wide inline-block text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Done
                        </button>   }
                    </div>
            </div>

            <div>
                <h5 className="mb-2 mt-4 text-xl font-bold text-green-500 tracking-tight text-gray-900 dark:text-white">Your selected time slots</h5>
                    <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                       {
                        selectedSlot.map((slot) => (
                            <li class="w-[150px] border-b border-green-500  sm:border dark:border-gray-600">
                            <div class="flex flex-row justify-center items-center justify-around">
                                <label for="vue-checkbox-list" class="py-3  text-sm font-medium text-gray-900 text-center dark:text-gray-300 inline-block">{slot.time}</label>
                                <MdDelete size={25} className='cursor-pointer' onClick={()=>removeSlots(slot.time)}/>
                            </div>
                        </li>
                        ))
                       }
                    </ul>                                    
            </div>

            <div>
                <h5 className="mb-2 mt-4 text-xl font-bold text-green-500 tracking-tight text-gray-900 dark:text-white">Your leave dates</h5>
                    <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                       {
                        leaveDates.map((leaveDate) => (
                            <li class="w-[150px] border-b border-green-500  sm:border dark:border-gray-600">
                            <div class="flex flex-row justify-center items-center justify-around">
                                <label for="vue-checkbox-list" class="py-3 text-sm font-medium text-gray-900 dark:text-gray-300">{leaveDate.leaveDate}</label>
                                <MdDelete size={25} className='cursor-pointer'/>
                            </div>
                        </li>
                        ))
                       }
                    </ul>                                    
            </div>
                       
          
            <div href="#" className="block max-w-full mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Time Slot</h5> */}

                <form onSubmit={(e)=>submitSlots(e)}>
                <h5 className="mb-2 mt-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Morning</h5>
                    <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                       {
                        morning.map((time) => (
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <input id="vue-checkbox-list" type="checkbox" value={time} name='slot' class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    onChange={(e) => e.target.checked ? SetTimeSlot([...timeSlot, { time: e.target.value, status: true }]) :
                                        SetTimeSlot(timeSlot.filter((element) => {
                                            if (element.time == e.target.value) {
                                                return
                                            }
                                            return element
                                        }))}
                                />
                                <label for="vue-checkbox-list" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{time}</label>
                            </div>
                        </li>
                        ))
                       }
                    </ul>
                    <h5 className="mb-2 mt-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Afternoon</h5>
                    <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {
                        afternoon.map((time) => (
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <input id="react-checkbox-list" type="checkbox" value={time} name='slot' class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    onChange={(e) => e.target.checked ? SetTimeSlot([...timeSlot, { time: e.target.value, status: true }]) :
                                        SetTimeSlot(timeSlot.filter((element) => {
                                            if (element.time == e.target.value) {
                                                return
                                            }
                                            return element

                                        }))}
                                />
                                <label for="react-checkbox-list" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{time}</label>
                            </div>
                        </li>
                        ))
                    }
                    </ul>
                    <h5 className="mb-2 mt-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Evening</h5>
                    <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {
                        evening.map((time) => (
                            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div class="flex items-center pl-3">
                                <input id="react-checkbox-list" type="checkbox" value={time} name='slot' class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    onChange={(e) => e.target.checked ? SetTimeSlot([...timeSlot, { time: e.target.value, status: true }]) :
                                        SetTimeSlot(timeSlot.filter((element) => {
                                            if (element.time == e.target.value) {
                                                return
                                            }
                                            return element

                                        }))}
                                />
                                <label for="react-checkbox-list" class="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">{time}</label>
                            </div>
                        </li>
                        ))
                    }
                    </ul>
                    {/* <input type="text" value={counselor.auth.data._id} hidden 
                    onChange={(e)=>
                    /> */}

                    <div className="mt-6 flex mx-auto justify-center">
                        <button type='submit' className="max-w-md px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
            
        <ToastContainer />

        </div>
    )
}

export default AddSlots
