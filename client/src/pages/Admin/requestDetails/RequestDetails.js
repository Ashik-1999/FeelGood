import Button from '../../../components/button/Button'
import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import ReusedRequestDetails from '../../../components/Admin/ReusedComponents/ReusedRequestDetails'
import Navbar from '../../../components/navbar/Navbar'
import axios from 'axios'
import Requestdetails from '../../../components/Admin/RequestDetails/RequestDetails'
import AdminNavbar from '../../../components/Admin/adminNavbar/AdminNavbar'

function RequestDetails() {
    const counselorId = useParams()
    console.log(counselorId)
  return (
    <div>
    <div className=''>
        <AdminNavbar/>
            <Requestdetails params = {counselorId}/>
      </div>
    </div>
  )
}

export default RequestDetails
