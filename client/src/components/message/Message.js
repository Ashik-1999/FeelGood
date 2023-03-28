import React from 'react'
import './message.css'
import TimeAgo from 'react-timeago'
function Message({message,own}) {
  return (
    <div className={own ? 'message own' : 'message'}>
        <div className="messageTop">
            <img className='messageImg' src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png" alt="" />
            <p className='messageText'>{message.text}</p>
        </div> 
        <div className="messageBottom">
          <TimeAgo date = {new Date(message.createdAt).getTime()}/>
        </div>

      
    </div>
  )
}

export default Message
