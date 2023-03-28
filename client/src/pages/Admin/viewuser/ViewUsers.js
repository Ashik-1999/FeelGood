import { getListSubheaderUtilityClass } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../components/Admin/adminNavbar/AdminNavbar'
import ViewUserTable from '../../../components/Admin/usertable/ViewUserTable'

function ViewUsers() {

    


  return (
    <div>
        
        <div>
            
            <ViewUserTable/>
        </div>
    </div>
  )
}

export default ViewUsers
