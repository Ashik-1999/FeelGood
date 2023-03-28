import React,{useState,useContext,useEffect} from 'react'
import {Menu,Close} from '@mui/icons-material'
import {NavLink, useNavigate} from 'react-router-dom'
import AuthContext from '../../context/Userdata'
import { useCookies } from "react-cookie";
import  Button  from '../../components/button/Button';
import Dropdown from '../dropdown/Dropdown';
import jwt_decode from "jwt-decode";

function Navbar(props) {

  const [cookies, setCookie, removeCookie] = useCookies([]);
 
  const {auth} = useContext(AuthContext)


  if(auth.jwt){
    var decoded = jwt_decode(auth?.jwt);
    console.log(decoded.user.fullname)
  }

  

  const navigate = useNavigate()
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    
    setNav(!nav);
  };

  const logOut = () => {
    removeCookie("jwt");
    
    navigate("/login");
  };



  return (
    <div className='sticky top-0 z-40'>
      <div className='flex justify-between items-center h-24 max-w-[1520px] mx-auto px-4 text-white bg-blue-500'>
      <h1 className='w-full text-3xl font-bold text-white cursor-pointer' onClick={()=>navigate('/')}>Feel Good</h1>
      <ul className='hidden md:flex'>
        <li className='p-4 '><NavLink to='/'>Home</NavLink></li>
        <li className='p-4 '><NavLink to='/my-sessions'>Sessions</NavLink></li>
        <li className='p-4 '><NavLink to='/my-chats'>Chats</NavLink></li>
        <li className='p-4 '><NavLink>About</NavLink></li>

        <li className='p-4 cursor-pointer' onClick={()=>navigate('/counselor-register')}><Dropdown /></li> .
            {
              decoded ?   <li onClick={logOut} className='p-4 cursor-pointer' ><p class="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white-900 border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 ml-3 dark:bg-black">{decoded.user.fullname}</p></li> 
              :<li className='p-4 cursor-pointer' onClick={()=>navigate('/login')}><Button class="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 ml-3" text="Login/Signup"/></li> 
            }  
      
          </ul>
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <Close size={20}/> : <Menu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-white-900 bg-blue-500 ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-white m-4'>Feel Good</h1>
          <li className='p-4 border-b border-white-600 cursor-pointer'><NavLink>Home</NavLink></li>
          <li className='p-4 border-b border-white-600 cursor-pointer'><NavLink>Home</NavLink></li>
          <li className='p-4 border-b border-white-600 cursor-pointer'><NavLink>Home</NavLink></li>
          <li className='p-4 border-b border-white-600 cursor-pointer'><NavLink>Home</NavLink></li>
          <li className='p-4 cursor-pointer' onClick={()=>navigate('/login')}><Button class="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 ml-3" text="Login/Signup"/></li> 
      </ul>
    </div>
    </div>
  )
}

export default Navbar
