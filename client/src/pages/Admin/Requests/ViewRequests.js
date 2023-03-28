import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../components/Admin/adminNavbar/AdminNavbar'
import Requests from '../../../components/Admin/Tables/Requests'
import Navbar from '../../../components/navbar/Navbar'


function ViewRequests() {



  
  return (
    <div className=''>
      <AdminNavbar />
      <div className="flex flex-wrap ">
        <div className=" w-[1200px] flex-auto min-w-screen  ">
            <Requests/>
        </div>
      </div>
    </div>
  )
}

export default ViewRequests
