import React,{useContext} from 'react'
import  {useParams,useNavigate} from 'react-router-dom'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import AuthContext from '../../context/Userdata'
import CounselorAuthContext from '../../context/CounselorContext';
import jwt_decode from 'jwt-decode'

function VideoCall() {
    const {roomId} = useParams()
    const navigate = useNavigate()
    const {auth} = useContext(AuthContext)
    const {counselorAuth} = useContext(CounselorAuthContext)
    if(auth.jwt){
      var decoded = jwt_decode(auth?.jwt);
    }
  
    
      if(counselorAuth.jwt){
          var counselorDecoded = jwt_decode(counselorAuth?.jwt);
          var counselorId = counselorDecoded.user._id
      }

      console.log(decoded,counselorDecoded,"videoooo")
    
    const myMeeting = async (element) =>{
        const appID = 685571359;
        const serverSecret = "1663a38333b17bdf4da39f63c655a95a";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomId,Date.now().toString(),  "david raphi")
        const zc = ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container:element,
            sharedLinks:[
                {
                    name:'Copy Link',
                    url:`http://localhost:3000/video-call/${roomId}`
                    
                }
            ],
            scenario:{
                mode: ZegoUIKitPrebuilt.OneONoneCall
            },
            
            
        })
    }
  return (
    <div>
        <div ref={myMeeting}/>
        <button className='flex justify-center text-white bg-blue-600 h-[50px] w-[100px] md:ml-20 border rounded-lg items-center' onClick={()=>navigate('/my-chats')}>back</button>
    </div>
  )
}

export default VideoCall
