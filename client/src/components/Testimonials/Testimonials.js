import React from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'


function Testimonials() {

  const slideLeft2 = () => {
    console.log("clicked")
    var slider2 = document.getElementById('slider3')
    slider2.scrollLeft = slider2?.scrollLeft - 1070
   
  }

  const slideRight2 = () => {
    var slider2 = document.getElementById('slider3')
    
    slider2.scrollLeft = slider2?.scrollLeft + 1070

  }

  setInterval(slideRight2, 4000);



  return (

    <div className='mt-10'>
      <div className='bg-gradient-to-tl from-purple-900  h-[700px] to-green-700 h-96 w-full relative'>
        <img className='w-full h-full object-cover mix-blend-overlay' src="https://dbseer.com/wp-content/uploads/2021/08/analytics-hero-optimized.png" alt="" />
        <div className='absolute w-full h-full top-0 left-0  bg-gray-900/30'></div>
        <div className='absolute top-0 w-full h-full flex  flex-col justify-center text-center test-white p-4'>
          <p className='text-white  max-w-[1400px] text-center mt-[50px]  mx-auto font-sans  text-4xl md:font-bold'>Read trusted reviews from our customers</p>

          <div className='relative flex items-center  rounded-2xl mx-auto mt-4 '>

            <div
              id='slider3'
              className='w-[1000px] bg-white   rounded-lg  mx-auto  h-full grid md:grid-cols-8 overflow-x-scroll overflow-hidden scroll whitespace-nowrap scroll-smooth scrollbar-hide'
            >
              <div className="flex max-w-5xl mx-auto gap-8 group">
                <div className="swiper-slide">
                  <div className="p-4 text-black rounded-lg shadow-md">
                    <div className="mb-2">
                      <p className="mb-2 text-center text-black-800 ">
                        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique sapiente iusto esse. "
                      </p>
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-[100px] h-[100px] overflow-hidden bg-gray-100 border-2  rounded-full">
                          <img src="https://cdn.pixabay.com/photo/2017/05/19/12/38/entrepreneur-2326419__340.jpg" alt="img" className="object-cover object-center w-full h-full" />
                        </div>
                        <h5 className="font-bold text-indigo-800">John Doe</h5>
                        <p className="text-sm text-gray-500">CEO / Founder</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="p-4 text-gray-800 rounded-lg shadow-md">
                    <div className="mb-2">
                      <p className="mb-2 text-center text-black-800 ">
                        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique sapiente iusto esse. "
                      </p>
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-[100px] h-[100px] overflow-hidden bg-gray-100 border-2  rounded-full">
                          <img src="https://cdn.pixabay.com/photo/2017/05/19/12/38/entrepreneur-2326419__340.jpg" alt="img" className="object-cover object-center w-full h-full" />
                        </div>
                        <h5 className="font-bold text-indigo-800">John Doe</h5>
                        <p className="text-sm text-gray-500">CEO / Founder</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="p-4 text-gray-800 rounded-lg shadow-md">
                    <div className="mb-2">
                      <p className="mb-2 text-center text-black-800 ">
                        " Lorem ipsum dolor, sit amet consec whiteipisicing elit. Similique sapiente iusto esse. "
                      </p>
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-[100px] h-[100px] overflow-hidden bg-gray-100 border-2  rounded-full">
                          <img src="https://cdn.pixabay.com/photo/2017/05/19/12/38/entrepreneur-2326419__340.jpg" alt="img" className="object-cover object-center w-full h-full" />
                        </div>
                        <h5 className="font-bold text-indigo-800">John Doe</h5>
                        <p className="text-sm text-gray-500">CEO / Founder</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="p-4 text-gray-800 rounded-lg shadow-md">
                    <div className="mb-2">
                      <p className="mb-2 text-center text-black-800 ">
                        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique sapiente iusto esse. "
                      </p>
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-[100px] h-[100px] overflow-hidden bg-gray-100 border-2  rounded-full">
                          <img src="https://cdn.pixabay.com/photo/2017/05/19/12/38/entrepreneur-2326419__340.jpg" alt="img" className="object-cover object-center w-full h-full" />
                        </div>
                        <h5 className="font-bold text-indigo-800">John Doe</h5>
                        <p className="text-sm text-gray-500">CEO / Founder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className='flex justify-center mt-5'>
            <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100 text-white' onClick={slideLeft2} size={40} />
            <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100 text-white' onClick={slideRight2} size={40} />
          </div>
        </div>

      </div>
    </div>

  )
}

export default Testimonials
