
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../../components/button/Button'
import SubmitRequest from '../../../components/Consultant/Requests/SubmitRequest'

function CounselorSignup() {

  const navigate = useNavigate();

  const [boolean, setBoolean] = useState(false)
  const [allSpecs, setAllSpecs] = useState([])
  const [Dep, SetDep] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [request, setRequest] = useState(false)
 

  const passwordView = () => {
    boolean ? setBoolean(false) : setBoolean(true)
  }

  const [values, setValues] = useState({
    fullname: '',
    email: '',
    number: '',
    password: '',
    qualification: '',
    experience: '',
    regNumber: '',
    Specialization: '',
    qualificationCert: '',
    experienceCert: '',
    about:''

  })

  

  const id = 'secret'
  const id2 = 'secret'



  useEffect(() => {
    try {
      axios.get('/admin/get-specs').then((response) => {
        setAllSpecs(response.data.specs)
      })
    } catch (err) {
      console.log(err)
    }
  }, [Dep])

  console.log(values)



  const submitHandler = async (e) => {
    e.preventDefault()
    setFormErrors(validate(values));
    setIsSubmit(true)
  }

 



  useEffect(() => {

    if (Object.keys(formErrors).length === 0 && isSubmit) {

    
      try {
        axios.post("/counselor/register",
          {
            ...values,
          }, { withCredentials: true }).then((response) => {
            const { data } = response
            if (data) {
              if (data.counselorExist) {
                toast.error(`user already exists `, {
                  toastId: id,
                  theme: "light"
                });
              } else {

                setRequest(true)
                toast.success(`Successfully registered. Please login `, {
                  toastId: id2,
                  theme: "light"
                });

                function myFunction() {
                  const timeout = setTimeout(alertFunc, 5000);
                }
                function alertFunc() {

                }
                myFunction();

              }
            }
          })
      } catch (err) {
        console.log(err);
      }
    }
  }, [formErrors])


  const validate = (formValues) => {
    const errors = {}
    const Nameregex = /^[a-zA-Z0-9 ]*$/
    const RegNumregex = /^[a-zA-Z0-9 ]*$/
    const numberRegex = /^[0-9 ]*$/
    const emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");



    if (!formValues.fullname) {
      errors.fullname = "Full name is required"
    } else if (!Nameregex.test(formValues.fullname)) {
      errors.fullname = "Enter a valid name"
    }

    if (!formValues.email) {
      errors.email = "Email  is required"
    } else if (!emailregex.test(formValues.email)) {
      errors.fullname = "Enter a valid email"
    }

    if (!formValues.number) {
      errors.number = "Mobile number name is required"
    } else if (!numberRegex.test(formValues.number)) {
      errors.number = "only numbers are allowed"
    } else if (formValues.number.length < 10) {
      errors.number = "Ten digit required"
    } else if (formValues.number.length > 10) {
      errors.number = "Maximum ten digits are allowed"
    }

    if (!formValues.password) {
      errors.password = "password is required"
    } else if (!passwordRegex.test(formValues.password)) {
      errors.password = "regex problem"
    }

    if (!formValues.regNumber) {
      errors.regNumber = "Register number  is required"
    } else if (!RegNumregex.test(formValues.regNumber)) {
      errors.regNumber = "Enter a valid register number"
    }

    return errors
  }

  //


  return (
    <div>
      <Navbar />
      <section className="mt-20 bg-gray-50 min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center relative">
          {/* form */}
          <div className={`md:w-[600px] px-8 md:px-16 ${request ? 'blur-sm' : 'blur-none'}`}>
            <h2 className="font-bold text-2xl text-[#002D74] text-center">Counselor Sign up</h2>
            <p className="text-xs mt-4 text-[#002D74] text-center">Don't have an account, signup here</p>
            <form className="flex flex-col  mt-4" onSubmit={(e) => { submitHandler(e) }} encType="multipart/form-data">

              <div className='mt-5'>
                <label className=" font-semibold text-sm text-gray-900 dark:text-white mt-2">Full Name</label>
                <input className="p-2  rounded-xl border w-full" type="text" name="fullname" placeholder="Full name" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                <p className='text-red-600'>{formErrors.fullname}</p>
              </div>

              <div className='mt-5'>
                <label className="mt-5 font-semibold text-sm  text-gray-900 dark:text-white mt-2">Email</label>
                <input className="p-2 rounded-xl border w-full" type="email" name="email" placeholder="Email" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                <p className='text-red-600'>{formErrors.email}</p>
              </div>

              <div className='mt-5'>
                <label className="font-semibold text-sm  text-gray-900 dark:text-white mt-2">Number</label>
                <input className="p-2 rounded-xl border w-full" type="number" name="number" placeholder="Mobile" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                <p className='text-red-600'>{formErrors.number}</p>
              </div>
              <div className="relative mt-5">
                <label className="font-semibold text-sm  text-gray-900 dark:text-white mt-2">Password</label>
                <input className="p-2 rounded-xl border w-full" type={boolean ? "text" : "password"} name="password" placeholder="Password" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} />
                {!boolean && <svg onClick={passwordView} xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="gray" className="bi bi-eye absolute top-1/2 mt-3 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>}
                {boolean && <svg onClick={passwordView} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-eye-slash absolute top-1/2 mt-3 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                </svg>}
                <p className='text-red-600'>{formErrors.password}</p>
              </div>

              <div className='mt-5'>
                <label className="font-semibold text-sm  text-gray-900 dark:text-white mt-2">Qualification</label>
                <select id="countries" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} name="qualification" className=" rounded-xl bg-gray-50 border text-black   text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="Psychotherapy" selected>Psychotherapy</option>
                  <option value="Diploma in Psychological Medicine" >Diploma in Psychological Medicine </option>
                  <option value="Msc.Sexology">Msc.Sexology</option>
                  <option value="Positive Psychiatry and Mental Health">Positive Psychiatry and Mental Health</option>
                  <option value="Deploma in mental health">Deploma in mental health</option>
                </select>
              </div>

              <div className='mt-5'>
                <label className="font-semibold text-sm  text-gray-900 dark:text-white mt-2">Experience</label>
                <select id="countries" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} name="experience" className="rounded-xl bg-gray-50 border  text-black text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="0-1" selected>0-1 Years</option>
                  <option value="1-3" >1-3 Years</option>
                  <option value="3-5">3-5 Years</option>
                  <option value="5 Or Above">5 Or Above</option>

                </select>
              </div>

              <div className='mt-5'>
                <label className="font-semibold text-sm  text-gray-900 dark:text-white mt-2">Medical registration number</label>
                <input onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} name="regNumber" className="p-2 w-full rounded-xl border" type="tel" placeholder="Medical registration number" />
                <p className='text-red-600'>{formErrors.regNumber}</p>
              </div>

              <div className='mt-5'>
                <label className="mt-5 text-sm  font-semibold text-gray-900 dark:text-white mt-2">Specializations</label>
                {

                  <select id="countries" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} name="Specialization" className="rounded-xl bg-gray-50 border  text-black text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {
                      allSpecs.map((element)=>(
                        <option value={element._id} selected>{element.Specialization}</option>
                        ))
                    }

                  </select>
                }
              </div>
            <div className='mt-5'>
              <label for="certficate" class="font-semibold text-sm  text-gray-900 dark:text-white">About</label>
              <textarea id="w3review" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} className='p-2 w-full rounded-xl border' name="about" rows="4" cols="50"/>
            </div>




              <button className="bg-[#002D74] mt-5 rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>

            </form>


            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Already have an account?</p>
              <button onClick={() => navigate('/counselor-login')} className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Login</button>
            </div>
          </div>
         {request && <SubmitRequest status =" Your request is submitted." explanation = "Wait for the response. It might be rejected or approved" top = "congratulations" button = "" /> }
 
         
        </div>
        <ToastContainer />

      </section>
    </div>
  )
}

export default CounselorSignup
