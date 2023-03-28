import React, { useEffect,useContext, useState } from 'react'
import {useCookies} from 'react-cookie'
import { Outlet } from 'react-router-dom';
import AuthContext from '../../context/Userdata'

function CheckToken() {
    const [cookies] = useCookies([]);
      const {auth,setAuth} = useContext(AuthContext)
      const [loading,SetLoading] = useState(true)
      console.log(auth,'auth is comingg')

    useEffect(()=>{
      const checkAuth = () =>{
        try{
            setAuth(cookies)
        }catch(err){
            console.log(err)
        }finally{
            SetLoading(false)
        }
        
      }  
      !auth ?.jwt ? checkAuth() : SetLoading(false)
    },[])

    return(
       <>
       {
            loading ? 
            <p>Loading ....</p> :
            <Outlet/>
       }
       </>

        
    )
}

export default CheckToken
