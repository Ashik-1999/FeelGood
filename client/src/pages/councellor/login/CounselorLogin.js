import React,{useState,useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useCookies} from 'react-cookie'
import AuthContext from '../../../context/Userdata'
import SubmitRequest from '../../../components/Consultant/Requests/SubmitRequest'
import Confirm from '../../../components/Confirmation/Confirm'
import Success from '../../../components/Success Page/Success'
import CounselorAuthContext from '../../../context/CounselorContext'

function CounselorLogin() {

    const {setcounselorAuth} = useContext(CounselorAuthContext)
    const navigate = useNavigate()
    const [boolean,setBoolean] = useState(false)
    const [Counselordata,setCounselordata] = useState({})
    const [cookies] = useCookies([]);
    const [values, setValues] = useState({ email: "", password: "" });
    const [status , setStatus] = useState(false)
    const [confirmDelete,setConfirmDelete] = useState(false)
    const [deleted,setDeleted] = useState(false)

    useEffect(() => {
      if (cookies.jwt) {
        navigate("/");
      }
    }, [cookies, navigate]);

    const  passwordView = ()=>{
        boolean? setBoolean(false):setBoolean(true)
    }
  

  const id = 'secret'
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      const { data } = await axios.post(
        "/counselor/login",
        {
          ...values,
        },
        { withCredentials: true }
      );

      console.log(data)
      
      if (data.notFound) {
        toast.error("User not found", {
          toastId:id,
          theme:"light"           
        });
      }else if(data.passwordNotFound){
        toast.error("Password not matching", {
          toastId:id,
          theme:"light"           
        });
      }else if(data.notApproved){   
        setStatus(true)
        const datas = data.details
        setCounselordata(datas)
        console.log(datas,"dataaaaaaa")
         
      }else{
        navigate('/counselor/home')
        const jwt = data
        console.log(jwt.counselorJwt
          ,"jwtttt")
        
        setcounselorAuth(jwt)
      }
      
    } catch (ex) {
      console.log(ex);
    }
  };


  const deleteConfirm = () =>{
      setStatus(false)
      setConfirmDelete(true)
  }

  const deleteRequest = () =>{
    axios.delete(`/counselor/delete-request/${Counselordata._id}`).then((response)=>{
      const {data} = response
      if(data){
        setConfirmDelete(false)
        setStatus(false)
        setDeleted(true)
      }
    })
  }



  return (
    <div>
        <Navbar/>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center relative">
          {/* form */}
          <div className={`md:w-1/2 px-8 md:px-16 ${status || confirmDelete ||  deleted ? 'blur-sm' : 'blur-none'}`}>
            <h2 className="font-bold text-2xl text-[#002D74]">Counselor Login</h2>
            <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
              <input className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email" onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            } />
              <div className="relative">
                <input className="p-2 rounded-xl border w-full" type={boolean?"text":"password"} name="password" placeholder="Password" onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            } />
                {  !boolean &&  <svg onClick={passwordView} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>}
          {boolean &&  <svg onClick={passwordView} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg>}
              </div>
              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
            </form>
            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
              <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              Login with Google
            </button>
            <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
              <a href="#">Forgot your password?</a>
            </div>
            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Don't have an account?</p>
              <button onClick={()=>navigate('/counselor-register')} className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
            </div>
          </div>
          {/* image */}
          <div className={`md:block hidden w-1/2 ${status || confirmDelete ||  deleted ? 'blur-sm' : 'blur-none'}`}>
            <img className="rounded-2xl" src="https://media.istockphoto.com/id/177373093/photo/indian-male-doctor.jpg?s=612x612&w=0&k=20&c=5FkfKdCYERkAg65cQtdqeO_D0JMv6vrEdPw3mX1Lkfg=" />
          </div>
         {status ? 
         
          <SubmitRequest status = {`Request ${Counselordata.status}`} explanation = {Counselordata.rejectedReason ? Counselordata.rejectedReason:"Your request is not approved"}  top="!Oops" notApproved="true" onclick = {deleteConfirm} button = "Delete Request"/> : 
         deleted ? <Success confirm = "are you want to delete" onclick = {deleteRequest}/> : confirmDelete && <Confirm confirm = "are you want to delete" onclick = {deleteRequest}/>
          }

        </div>
         <ToastContainer />
      </section>
    </div>
  )
}

export default CounselorLogin
