import React,{useContext} from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/Userdata'


    

function RequireAuth() {
    const { auth } = useContext(AuthContext)
    

  return (
    <div>
        {
            auth?.jwt ? <Outlet/> : <Navigate to='/login'/>
        }
    </div>
  )
}

export default RequireAuth
