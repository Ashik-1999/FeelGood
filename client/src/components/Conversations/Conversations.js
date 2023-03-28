import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './conversations.css'

function Conversations({conversation,currentUser,counselor,fun}) {
  console.log(fun,"current userrr")

  const [user,setUser] = useState(null)

  useEffect(()=>{

    const id = conversation.members.find((cId) => cId !== currentUser._id)
    const getUser = async () =>{
      try{
      const {data} = counselor ? await axios(`/users/getUser/${id}`) : await axios(`/users/getCounselor/${id}`)
      
       setUser(data)
       
      }catch(err){
        console.log(err)
      }
    }
    getUser()
    
  },[currentUser,conversation])

 
 
 
  return (
    <div>
      

       {

       user &&
                   
              
                    <div className='conversation'>
                      <img src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" className='conversationImg' alt="" />
                        <span className='conversationName'>{user.fullname}</span>
                    </div>
                       
              
          
       }
       <hr />
    </div>
  )
}

export default Conversations
