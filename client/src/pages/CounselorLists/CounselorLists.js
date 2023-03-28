import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar';
import SearchBar from '../../components/SearchBar/SearchBar';

function CounselorLists({Allcounselors,searchedItems}) {
   
    const [counselors, setCounselors] = useState([])
    const navigate = useNavigate();
    
    // const findCounselors = async () => {
    //     let {data} = await axios.get('/users/counselor-list'); 
            
    //         setCounselors(data.counselor)        
    // }

    // useEffect(() => {
    //     findCounselors();
    // }, [])

    const counselorProfile = (id) => {
        console.log(id);
        navigate(`/counselor-details/${id}`)
     }
    
    return  (
    <>
    
            <div className='grid md:grid-cols-2 mt-16'>

            {
                searchedItems.length > 0 ?
                searchedItems.map((element, index) => (

                    <div className="ml-24 max-w-2xl p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                        <img src={element.imageUrl} className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                        <div className="space-y-4 text-center">
                            <div className="my-2 space-y-1">
                                <h2 className="text-4xl font-semibold sm:text-2xl uppercase">{element.fullname}</h2>
                                <p className='text-amber-700'>{element.qualification}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-lg">Specialization - <span className='text-md font-normal'>{element.Specialization}</span></p>
                                <h2 className='font-semibold text-lg'>Languages - <span className='text-md font-normal'>{element.languages}</span></h2>
                            </div>

                            <div className='flex justify-center items-center'>
                            <button className='mt-3 mr-10 bg-blue-900 hover:bg-indigo-600 py-2.5 px-8 rounded-full text-white'>Book Sessions</button>
                            <button className='mt-3 ml-10 bg-zinc-500 hover:bg-zinc-800 py-2.5 px-8 rounded-full text-white'
                             onClick={() => counselorProfile(element._id)}>View Profile</button>
                            </div>

                        </div>
                    </div>
                )) :
                Allcounselors.map((element, index) => (

                    <div className="ml-24 max-w-2xl p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                        <img src={element.imageUrl} className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                        <div className="space-y-4 text-center">
                            <div className="my-2 space-y-1">
                                <h2 className="text-4xl font-semibold sm:text-2xl uppercase">{element.fullname}</h2>
                                <p className='text-amber-700'>{element.qualification}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-lg">Specialization - <span className='text-md font-normal'>{element.Specialization}</span></p>
                                <h2 className='font-semibold text-lg'>Languages - <span className='text-md font-normal'>{element.languages}</span></h2>
                            </div>

                            <div className='flex justify-center items-center'>
                            <button className='mt-3 mr-10 bg-blue-900 hover:bg-indigo-600 py-2.5 px-8 rounded-full text-white'>Book Sessions</button>
                            <button className='mt-3 ml-10 bg-zinc-500 hover:bg-zinc-800 py-2.5 px-8 rounded-full text-white'
                             onClick={() => counselorProfile(element._id)}>View Profile</button>
                            </div>

                        </div>
                    </div>
                ))
            }

        </div>
    </>
    )
}

export default CounselorLists