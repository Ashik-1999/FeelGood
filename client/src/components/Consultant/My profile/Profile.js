import React, { useContext, useEffect, useState } from 'react'
import CounselorAuthContext from '../../../context/CounselorContext';
import jwt_decode from "jwt-decode";
import { AiFillCamera,  } from 'react-icons/ai'
import axios from 'axios';
import {RiDeleteBin6Line} from 'react-icons/ri'
import Spinner from '../../spinner/Spinner';

function Profile() {

  
    const { counselorAuth } = useContext(CounselorAuthContext)
    const [values,setValues] = useState({
        fullname:'',
        email:'',
        number:'',
        Specialization:'',
        experience:'',
        about:'',
        languages:''
    })
    const [profileImage,setprofileImage] = useState({image:''})
    const [counselorData,setCounselorData] = useState({})
    const [boolean,setBoolean] = useState(false)
    const [loading,setLoading] = useState(true)



    if (counselorAuth.jwt) {
        var decoded = jwt_decode(counselorAuth?.jwt);
    }

    useEffect(()=>{
        const getDetails = async() =>{
            setLoading(true)
            const {data} = await axios.get(`/counselor/get-counselor/${decoded.user._id}`)
            setCounselorData(data)
            setLoading(false)
        }
        getDetails()
    },[boolean])

    


    const handleSubmit = async(e) =>{ 
        console.log("values")    
    }

    const submitImage = async(e) =>{
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append("image",profileImage.image) 
        const {data} = await axios.post(`/counselor/add-image/${decoded.user._id}`,formData)
        boolean? setBoolean(false):setBoolean(true)
        setLoading(false)
        setprofileImage({})

    }

    const deleteImage = async() =>{
        setLoading(true)
        const {data} = await axios.delete(`/counselor/delete-image/${decoded.user._id}`)
        boolean? setBoolean(false):setBoolean(true)
        setLoading(false)
    }


    return (
        <>

            {decoded && <div class="">
            
                {!loading ? <div class=" bg-white shadow">

               
                        <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-3 shadow-lg">
                            <form onSubmit={submitImage}>
                                <div className="flex items-center justify-between">
                                    <span className="text-emerald-400">
                                        { 
                                          counselorData.imageUrl ? <RiDeleteBin6Line className='cursor-pointer' onClick={deleteImage} size={25}/> :  <label htmlFor="addImage" className='cursor-pointer'> <AiFillCamera size={25}/></label>
                                        }
                                        <input type="file" id='addImage' name='image' className='hidden' onChange={(e) =>
                                        setprofileImage({ ...profileImage, [e.target.name]: e.target.files[0] })} />
                                    </span>
                                    {profileImage.image && <button className='bg-emerald-400 p-1 text-sm border rounded-lg' type='submit'>Submit</button>}
                                </div>
                                <div className="mt-2 w-fit mx-auto object-cover">
                                    <img src={counselorData.imageUrl} className=" h-[10rem] w-[12rem]" alt="profile picture" srcSet />
                                </div>
                                <div className="mt-4 ">
                                    <h2 className="text-white text-center font-bold text-2xl tracking-wide">{decoded.user.fullname}</h2>
                                </div>
                            </form>                                          
                        </section>
                    

                        <div class=" text-left flex justify-center mx-auto border-b pb-12">
                        <form className="mt-6" onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label
                                    for="fullname"
                                    className="block text-sm font-medium text-gray-800"
                                >
                                    Full Name
                                </label>
                                <input
                                defaultValue={counselorData.fullname}
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    name='fullname'
                                    onChange={(e) =>
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                      }
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    for="email"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Email
                                </label>
                                <input
                                    defaultValue={counselorData.email}
                                    type="email"
                                    name='email'
                                    onChange={(e) =>
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                      }
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    for="phone"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Phone
                                </label>
                                <input
                                    defaultValue={counselorData.number}
                                    type="tel"
                                    name='number'
                                    onChange={(e) =>
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                      }
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    for="specs"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Specializations
                                </label>
                                <input
                                    defaultValue={counselorData.Specialization}
                                    type="text"
                                    
                                    onChange={(e) =>
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                      }
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    name='Specialization'
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    for="experience"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Experience
                                </label>
                                <input
                                    defaultValue={counselorData.experience}
                                    type="text"
                                    onChange={(e) =>
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                      }
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    name='experience'
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    for="languages"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    Languages
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                      }
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    name='languages'
                                />
                            </div>
                            <div className="mb-2">
                                <label
                                    for="about"
                                    className="block text-sm font-semibold text-gray-800"
                                >
                                    About
                                </label>
                                <textarea
                                    defaultValue={counselorData.about}
                                    name='about'
                                    type="text"
                                    onChange={(e) =>
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                      }
                                    className="block w-[300px] px-4 py-2 mt-2 text-blue-900 bg-white border rounded-md focus:border-blue-900 focus:ring-blue-900 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mt-6">
                                <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                        
                    </div>
               
                   
                </div> : <Spinner/>  }
            </div>}
        </>

    )
}

export default Profile
