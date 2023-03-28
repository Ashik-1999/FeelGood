import React, { useEffect,useContext,useState } from 'react'
import {useCookies} from 'react-cookie'
import { Outlet } from 'react-router-dom';
import CounselorAuthContext from '../../context/CounselorContext'

function CounselorCheckToken() {
    const [cookies] = useCookies([]);
      const {counselorAuth,setcounselorAuth} = useContext(CounselorAuthContext)
      const [loading,SetLoading] = useState(true)

      useEffect(()=>{
        const checkAuth = () =>{
          try{
            setcounselorAuth(cookies)
          }catch(err){
              console.log(err)
          }finally{
              SetLoading(false)
          }
          
        }  
        !counselorAuth ?.jwt ? checkAuth() : SetLoading(false)
      },[])


    console.log(counselorAuth,"cokkiiessss")

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

export default CounselorCheckToken
