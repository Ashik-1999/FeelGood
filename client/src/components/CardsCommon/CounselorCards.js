import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../button/Button'
import CardsCouns from '../Cards/CardsCouns'
import {FcRight} from 'react-icons/fc'
import { blue } from '@mui/material/colors'


function CounselorCards() {

   const [counselor,setCounselor] = useState([])
   const navigate = useNavigate()

   const slideLeft2 = () => {
      console.log("clicked")
      var slider2 = document.getElementById('slider2')
      slider2.scrollLeft = slider2.scrollLeft - 500
   }

   const slideRight2 = () => {
      var slider2 = document.getElementById('slider2')
      slider2.scrollLeft = slider2.scrollLeft + 500
   }

   useEffect(()=>{
      axios.get('/users/get-counselors').then((response)=>{
         setCounselor(response.data.counselor)
      })
   },[])
   
   const viewDetails = (id) =>{
      console.log(id,"ioddddddddd")
      navigate(`/counselor-details/${id}`)
   }

   return (
      <>
         <p className='text-black-900  max-w-[1400px] text-center mt-[50px]  mx-auto font-sans  text-4xl md:font-bold'>View your consultants</p>

         <div className='relative flex items-center   rounded-2xl mx-auto mt-4 '>
            <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft2} size={40} />
            <div
               id='slider2'
               className='w-[1100px] mx-auto   h-full grid md:grid-cols-3 overflow-x-scroll  overflow-hidden scrollbar-hide scroll whitespace-nowrap scroll-smooth  '
            >
               <div className='text-center py-10'>
                  <div className='flex max-w-5xl  gap-8 group'>
                     {
                        counselor.map((element)=>(
                           <CardsCouns obj = {element} onclick = {viewDetails}/>
                        ))
                     }                                            
                  </div>

               </div>
            </div>
            <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight2} size={40} />
         </div>

               <div className='flex justify-center'>
                     <NavLink className='text-center text-blue-600 inline-block' to="/counselor-lists">View more</NavLink>
                     <FcRight size={25}/>
               </div>
      </>




   )
}

export default CounselorCards



