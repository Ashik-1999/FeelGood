import { ConstructionOutlined } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './chatOnline.css'

function ChatOnline({onlineUsers,currentUser,setCurrentChat}) {

  console.log(onlineUsers,"online userss")

  const [counselors,setCounselors] = useState([])
  const [onlineCounselors,setonlineCounselors] = useState([])
  
  // useEffect(()=>{
  //   const getCounselor = async() =>{
  //     const {data} = await axios.get(`/users/online-counselors/${currentUser._id}`)
  //     setCounselors(data)
  //     console.log(counselors,"counselorss")
  //   }

  //   getCounselor()
  // },[currentUser])

  // useEffect(()=>{
  //   setonlineCounselors(counselors.filter((counselor)=>onlineUsers.includes(counselor._id)))
  //   console.log(onlineCounselors,"online counselors")
  // },[counselors,onlineUsers])
  return (
    <div className='chatOnline'>
      {
        onlineCounselors.map((online)=>(
          <div className='chatOnlineFriend'>
          <div className="chatOnlineImgContainer">
              <img className='chatOnlineImg' src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png" alt="" />
              <div className="chatOnlineBadge">
  
              </div>
          </div>
          <span className="chatOnlineName">safna  M S</span>
        </div>
        ))
      }     
    </div>
  )
}

export default ChatOnline
