import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

import {GrClose} from 'react-icons/gr'

function Viewspecs(props) {

  console.log(props)
  const [allSpecs,setAllSpecs] = useState([])


  useEffect(()=>{
    axios.get('/admin/get-specs').then((response)=>{      
      setAllSpecs(response.data.specs)      
    })
},[props.data])

const location = useLocation()
const [imageView,setImageView] = useState()
 
const viewImage = (filename) =>{
  setImageView(filename)
}

  return (
    <div className="flex flex-col relative">

    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
        <div className="overflow-hidden">
          <table className="min-w-full  relative">
            <thead className="border-b">
              <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  #
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  First
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Last
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Handle
                </th>
              </tr>
            </thead>
            <tbody>
              {
               allSpecs && allSpecs.map((element,i)=>(
                  <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i+1}</td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                   {element.Specialization}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {element.Specialization}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <div className="h-[100px] w-[100px]">
                        <img src={element.imageUrl} x alt="waitng" className='object-cover h-[100px] w-[100px]' onMouseEnter={()=>viewImage(element.imageUrl)} />
                    </div>
                    
                  </td>
                </tr>
                ))
              }
              
            </tbody>   
          </table>
          
        </div>
      </div>
    </div>
    {  
     imageView &&   <div className='absolute flex self-center'>
          <div className=''>
             <GrClose onClick={() => { setImageView('') }} size={30} className="cursor-pointer">&times;</GrClose>
            <img src={imageView} className='object-cover h-[450px] w-[450px]'  onMouseEnter={()=>setImageView('')}  alt=""  />  
          </div>
            
        </div>
  } 
  </div>

  
  )
}

export default Viewspecs
