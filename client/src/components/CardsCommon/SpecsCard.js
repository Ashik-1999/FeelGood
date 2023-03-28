import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import CardSpecs from '../Cards/CardSpecs'



function SpecsCard(props) {

    const [Specs,setSpecs] = useState([])

    const slideLeft = () => {
        console.log("clicked")
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const slideRight = () => {
        var slider = document.getElementById('slider')
        slider.scrollLeft = slider.scrollLeft + 500
    }

    useEffect(()=>{
        axios.get('/users/getSpecs').then((response)=>{
          console.log(response)
          setSpecs(response.data.specs)
        })
      },[])

      console.log(Specs,"state worked")

    return (

        <>
            <p className='text-black-900  max-w-[1400px] text-center mt-[50px]  mx-auto  font-sans text-4xl md:font-bold'>Express your problems....Get solutions</p>


            <div className='relative flex items-center p-8 ' >

                <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
                <div
                    id='slider'
                    className='w-[1100px] mx-auto   h-full grid md:grid-cols-3 overflow-x-scroll  overflow-hidden scrollbar-hide scroll whitespace-nowrap scroll-smooth '
                >
                    <div className='flex mx-auto data-carousel-item'>
                        {
                            Specs.map((element)=>(
                                <CardSpecs obj = {element}/>
                                
                            ))
                        }
                        
                        
                    </div>
                </div>
                <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
            </div>

        </>
    )
}

export default SpecsCard



