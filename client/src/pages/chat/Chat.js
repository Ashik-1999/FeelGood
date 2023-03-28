import React , {useContext, useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversations from '../../components/Conversations/Conversations'
import Message from '../../components/message/Message'
import Navbar from '../../components/navbar/Navbar'
import AuthContext from '../../context/Userdata'
import './Chats.css'
import jwt_decode from "jwt-decode";
import axios from 'axios'
import CounselorAuthContext from '../../context/CounselorContext';
import {io, Socket} from 'socket.io-client'
import {AiFillVideoCamera} from 'react-icons/ai'
import {AiFillCloseCircle} from 'react-icons/ai'
import {MdSend} from 'react-icons/md'
import InputEmoji from "react-input-emoji";



function Chat() {

  const {auth} = useContext(AuthContext)
  const {counselorAuth} = useContext(CounselorAuthContext)
  if(auth.jwt){
    var decoded = jwt_decode(auth?.jwt);
  }


    if(counselorAuth.jwt){
        var counselorDecoded = jwt_decode(counselorAuth?.jwt);
        var counselorId = counselorDecoded.user._id
    }


  
  const scrollRef = useRef()
  const navigate = useNavigate()
  const userId = decoded &&  decoded.user._id
  const [conversations,setConversations] = useState([])
  const [currentChat,setCurrentChat] = useState(null)
  const [messages,setMessages] = useState([])
  const [newMessage,setNewMessage] = useState('')
  const [arrivalMessage,setarrivalMessage] = useState(null)
  const [onlineUsers,setOnlineUsers] = useState([])
  const [videoCall,setVideoCall] = useState(false)
  const [counselorName,setCounselorName] = useState([])
  const [roomId,setRoomId] = useState('')
  
 
 
  const socket = useRef()
  const id =  counselorId ? counselorId : userId

   
  const startVideoCall = () =>{
   
    navigate(`/video-call/${roomId}`)
    }

   
   const getDataFromChild = (data) =>{
    console.log(data,"woekddd")
        setCounselorName(data)
   }

   
    
    useEffect(()=>{
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage",data =>{
            setarrivalMessage({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now()
            })
        })
    },[])

    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
        setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat])


    useEffect(()=>{
        
         socket.current.emit("addUser",id)
         socket.current.on("getUsers",users =>{
            const user = decoded.user
            
           
            setOnlineUsers(user.counselor.filter((counselor)=>users.some(u =>u.userId===counselor.counselorId 
                
                )))
        })
    },[])
    

   useEffect(()=>{  
    const getConversations = async() =>{
               
        try{
            const {data} =  await axios.get(`/conversations/${id}`)
                    
           setConversations(data) 
           console.log(conversations,"conversations")
        }   catch(err){ 
            console.log(err)
        }
    }
    if(counselorId || decoded)
    counselorId  && getConversations()
      getConversations()
      
  },[userId,counselorId])

  useEffect(()=>{
    const getMessages = async () =>{
        try{
            const {data} = currentChat &&  await axios.get(`/messages/${currentChat._id}`)
 
            setMessages(data)
        }catch(err){
            console.log(err)
        }
    }
    getMessages()
  },[currentChat])

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const message = {
        sender: id,
        text: newMessage,
        conversationId : currentChat._id
    }

    const receiverId = currentChat.members.find(member=> member !== id)
    

    socket.current.emit("sendMessage",{
        senderId: id,
        receiverId,
        text: newMessage,
    })

    try{
       const {data} = await axios.post('/messages',message)
       setMessages([...messages,data])
       setNewMessage('')
    }catch(err){
        console.log(err)
    }
  }



  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior : "smooth"})

  },[messages])

  const handleChange = (newMessage) =>{
    setNewMessage(newMessage)
  }

  return (
    <div>
        <Navbar/>
      {     <div className='messenger'>
            <div className='chatMenu'>
                <div className="chatMenuWrapper">
                    <input type="text" placeholder='search' className='chatMenuInput ' />
                    <section class="flex flex-col justify-center antialiased bg-gray-50 h-full text-gray-600 py-5">
                        <div class="h-full">
                        <h3 class="text-lg font-semibold uppercase text-black mb-1">Chats</h3>
                            <div class="relative w-full  bg-gray-50 shadow-lg rounded-lg">
                                <div class="py-3 px-5">
                                       
                                            {
                                                conversations.map((element)=>(
                                                    <div onClick={()=>setCurrentChat(element)}>
                                                    
                                                        
                                                        {counselorDecoded ? <Conversations conversation = {element} counselor={true} currentUser = {counselorDecoded && counselorDecoded.user}/> :
                                                        <Conversations fun = {getDataFromChild} conversation = {element} currentUser = {decoded && decoded.user} />
                                                        }
                                                                                    
                                                            
                                                    </div>
                                                ))
                                            }
                                </div>
                            </div>    
                        </div>
                    </section>
                </div>
            </div>
            <div className='chatBox'>
                <div className="chatBoxWrapper">
                    {
                        currentChat ?
                    <>
                        <nav className="w-full h-[100px] bg-blue-600 rounded-tr rounded-tl flex justify-between items-center">
                            <div className="flex justify-center items-center"> <i className="mdi mdi-arrow-left font-normal text-gray-300 ml-1" /> <img src="https://i.imgur.com/IAgGUYF.jpg" className="rounded-full ml-1" width={30} height={30} /> <span className="text-xl font-medium text-gray-300 ml-1">Alex cairo</span> </div>
                            <div className="flex items-center"> <AiFillVideoCamera color='white' onClick={() =>setVideoCall(true)} size={24} className='mr-5'/>  </div>
                        </nav>
                    <div className="chatBoxTop">
                         
                        {
                            messages.map((element)=>(
                                <div ref={scrollRef}>
                                    <Message message = {element} own={element.sender === id}/>          
                                </div>
                            ))
                        }
                    </div>
                    <div className="chatBoxBottom">
                        {
                            videoCall ?

                            <> <input type="text" className='roomIdInput' onChange={(e)=>setRoomId(e.target.value)} placeholder='enter the room id'/><AiFillCloseCircle onClick={()=>setVideoCall(false)} size={25}/>
                            <button className='chatSubmitButton' onClick={startVideoCall}>Start</button>  </>:
                            <>
                             <InputEmoji 
                                
                                className='chatMessageInput'
                                placeholder='type something' 
                                value={newMessage} 
                                onChange={handleChange}>
                             </InputEmoji>
                           { newMessage  && <div className='  border rounded-lg h-[30px] w-[40px] flex justify-center hover:bg-blue-700 items-center'> <MdSend className='cursor-pointer text-blue-900 hover:text-white' size={25} onClick={handleSubmit}>Send</MdSend> </div>  }
                            </>
                           
                        }
                        
                    </div> </> : <span className='noConversationText'>Open a conversation to start a chat</span>}
                </div>
            </div>
            <div className='chatOnline'>
                <div className="chatOnlineWrapper">
                   
                    {counselorDecoded ? <ChatOnline onlineUsers = {onlineUsers} counselor={true} currentUser = {counselorDecoded && counselorDecoded.user} setCurrentChat={setCurrentChat}/> :
                                 <ChatOnline onlineUsers = {onlineUsers} currentUser = {decoded && decoded.user} setCurrentChat={setCurrentChat}/>
                                  }
                </div>
            </div>
        </div> }
    </div>
    
  )
}

export default Chat
