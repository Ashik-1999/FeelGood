import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Button from '../../../components/button/Button'
import { useNavigate } from 'react-router-dom'

function Requests() {

  const [requests,setRequests] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get('/admin/get-requests').then((response)=>{
      const {data} = response 
      setRequests(data)
    })
  },[])


  return (

    <div className="flex flex-col relative">

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
          <div className="overflow-hidden">
            <table className="min-w-full  relative">
              <thead className="border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Sl.No
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Full Name
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Mobile
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Email
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900  py-4 text-left">
                    Register No.
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900  py-4 text-left">
                    Status
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>

                
                 {
                  requests.map((element,i)=>(
                    <tr className="border-b hover:bg-blue-100">
              
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i+1}</td>
                    <td className="text-sm text-gray-900 font-light px-9 py-4 whitespace-nowrap">
                      <span>{element.fullname}</span>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                     <span>{element.number}</span> 
                    </td>
                    <td className="text-sm text-gray-900 font-light  py-4 whitespace-nowrap">
                      <span>{element.email}</span>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-5 py-4 whitespace-nowrap">
                      <span>{element.regNumber}</span>
                    </td>
                    <td className={`text-sm   ${element.status == "pending" ? "text-black font-bold " : element.status == "approved" ? "text-green-600 font-medium" : "text-red-600 font-medium"}  font-light py-4 whitespace-nowrap`}>
                      <span>{element.status}</span>
                    </td>
                    <td className="">
                    <button onClick={()=>navigate(`/admin-view-request-details/${element._id}`)}  className="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-blue-900 border-white hover:border-transparent hover:text-white hover:bg-blue-400 mt-4 lg:mt-0 ml-3">
                      View
                    </button> 
                    </td>
                  </tr>
                  ))                   
                 }
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>

  )
}

export default Requests
