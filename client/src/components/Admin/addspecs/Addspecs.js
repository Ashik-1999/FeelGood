import axios from 'axios';
import React,{useRef, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

import { Button } from '@mui/material';


function Addspecs() {

  const [data,setData] = useState({
    Specialization:'',image:''
  })

  const ref = useRef()
  const imageRef = useRef()
  
  const id = 'secret'
  const navigate = useNavigate()
  
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    var formData = new FormData()
    formData.append("image",data.image)
    formData.append("spec",data.Specialization)
    

    try{
      const {data} = await axios.post('/admin/add-spec',formData)
      if(data){
       
       console.log(imageRef.current,"refff")
      //  ref.current.value = null
      //  console.log(imageRef.current.files[0].name)
      //  imageRef.current.value = null
        navigate('/admin-specialization')
        toast.success(`Successfully added ${data.Specialization} `, {
          toastId: id,
          theme: "light"
        });
        

        
      }
    }catch(err){
      console.log(err)
    }
    

  }

  return (
    <div>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-1 items-center">
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Specialization</label>
            <input type="text" ref={ref} name='Specialization'  id="first_name" value={data.Specialization} onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
          </div>
          {/* <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
          </div> */}
          <div>
            <label htmlFor="last_name" value={data.image} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
            <input type="file" id="last_name" ref={imageRef} name='image' onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.files[0] })
            } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
          </div>
        </div>
        
        <Button type="submit"  class="cursor-pointer py-3 px-8 bg-blue-500 text-md pt-3 px-4 py-2 leading-none border rounded-lg text-white border-none hover:border-transparent h-[40px] hover:text-white hover:bg-blue-900 display-flex w-[100px] ml-auto">Submit</Button>
        
        
      </form>
      <ToastContainer/>
      
    </div>
  )
}

export default Addspecs
