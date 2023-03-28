import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ViewUserTable({details}) {
    
    
    const [boolean,setBoolean] = useState(false)
    const [users,setUsers] = useState([])

    useEffect(()=>{
        const getUsers = async()=>{
            const {data} = await axios.get('/admin/get-users')
            setUsers(data)
        }
        getUsers()
    },[boolean])
    
    
    const blockUser = async(userId)=>{
        const {data} = await axios.put(`/admin/block-user/${userId}`)
        boolean? setBoolean(false):setBoolean(true)
        console.log(data)
        
    }

    const unblockUser = async(userId) =>{

        const {data} = await axios.put(`/admin/unblock-user/${userId}`)
        boolean? setBoolean(false):setBoolean(true)

        console.log(data)
        
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
                    Status
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-4 py-4 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>

                
                 {
                  users.map((element,i)=>(
                    <tr className="border-b hover:bg-blue-100" key={element._id}>
              
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
                    <td className="text-sm text-gray-900 font-light  py-4 whitespace-nowrap">
                      <span>{element.status}</span>
                    </td>
                    
                    <td className="">
                   { 
                   
                     element.status == "Active" ? <button onClick={() => {if(window.confirm('Are you sure, do you want to block?')){blockUser(element._id)}}}  className="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-red-700 border-white hover:border-transparent hover:text-white hover:bg-red-400 mt-4 lg:mt-0 ml-3">
                            block
                        </button> :
                        <button onClick={() => {if(window.confirm('Are you sure, do you want to unblock?')){unblockUser(element._id)}}}  className="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-green-700 border-white hover:border-transparent hover:text-white hover:bg-green-400 mt-4 lg:mt-0 ml-3">
                            Unblock
                        </button> 
                   
                    }
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

export default ViewUserTable
