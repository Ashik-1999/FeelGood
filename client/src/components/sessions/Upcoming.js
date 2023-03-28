import React, { useEffect, useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../context/Userdata'
import jwt_decode from 'jwt-decode'
import moment from 'moment'
import { AiOutlineConsoleSql } from 'react-icons/ai'
import swal from 'sweetalert';
import Spinner from '../spinner/Spinner'


function Upcoming(props) {

   
    
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    if (auth.jwt) {
        var decoded = jwt_decode(auth?.jwt);
    }  

    // useEffect(() => {
    //     setLoading(true)
    //     const viewSessions = async () => {
    //         const { data } = await axios.get(`/users/view-sessions/${userId}`)       
    //         setValues(data)     
    //         setLoading(false)      
    //     }
    //     viewSessions()
    // }, [boolean])

    
    

     function sweetAlert(sessionId){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async(willDelete) => {
            if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
              const {data} = await axios.delete(`/users/cancel-session/${sessionId}`)    
              props.func()
            } else {
              swal("Your imaginary file is safe!");
            }
          });
    }

    const cancelSession = (sessionId) => {
        sweetAlert(sessionId)
    }
  
    return (
        
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        {
                            props.data.length > 0 ?
                                <table className="min-w-full">
                                    <thead className="border-b">
                                        <tr>
                                            <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                                                SI No.
                                            </th>
                                            <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                                                Counselor
                                            </th>
                                            <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                                                Booked Date
                                            </th>
                                            <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                                                Session Date
                                            </th>
                                            <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                                                Session Time
                                            </th>
                                            <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                                                Patient Name
                                            </th>
                                            <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                                                Handle
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.data.map((element, i) => (

                                                
                                                <tr className="border-b">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i + 1}</td>
                                                    <td className="text-sm font-medium text-gray-900 px-6 py-4 whitespace-nowrap ">
                                                        {element.counselorName}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {element.date}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {element.time}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {element.patientName}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        { new Date() > new Date(element.date) ? 
                                                            <h1 className='text-red-600'>Session not attended</h1> : 
                                                            element.status == "cancelled" ? <h1 className='text-red-600'>Session cancelled</h1>  :
                                                            <>
                                                                <button class="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>cancelSession(element._id)}>Cancel</button>
                                                                <button onClick={()=>{
                                                                navigate('/my-chats')
                                                                 }} class="bg-blue-800 hover:bg-blue-500 text-white font-bold ml-2 py-2 px-4 rounded">Chat</button>
                                                            </>
                                                         }
                                                    </td>
                                                </tr>
                                            ))

                                        }
                                    </tbody>
                                </table> :
                                <div>
                                    <div className='flex justify-center'>
                                        <p className='text-2xl font-semibold'>You don't have any upcoming sessions</p>
                                    </div>
                                    <div className='flex justify-center mt-5'>
                                        <button class="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>navigate('/')}>Book Session</button>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upcoming
