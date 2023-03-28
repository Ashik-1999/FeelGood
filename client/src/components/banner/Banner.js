import  Button  from '../button/Button'
import React from 'react'

function Banner() {
  return (
  //   <section className=" h-[500px] mx-auto mt-[60px] max-w-[1300px]  bg-blue-100 p-32 text-center rounded-xl" style={{backgroundImage: 'url("https://thumbs.dreamstime.com/b/confident-doctor-posing-arms-crossed-stethoscope-medical-advice-health-insurance-banner-healthcare-services-109546538.jpg")', backgroundSize: 'cover'}}>
  //     <div className=' flex'>
  //        <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r text-blue-700 text-right">Welcome to My Site!</h1>
  //        <p className="text-blue-700 text-lg mb-8 text-right">Browse around for amazing content!</p>
          
  //           <Button class="align-center inset-y-0 right-0  cursor-pointer py-3 px-8 bg-blue-700 text-md pt-3 px-4 py-2 leading-none border rounded-lg text-white border-none hover:border-transparent h-[40px] hover:text-blue-800 hover:bg-white display-flex w-[100px] " text="Explore"/>
        
  //     </div>
    
    
    
   
  // </section>
  <section className="relative mt-[20px] max-w-[1400px]  rounded-xl mx-auto bg-[url(https://www.bmj.com/company/wp-content/uploads/2021/07/Mental-health-banner-1.png)] bg-cover bg-center bg-no-repeat">
  <div className="absolute inset-0 bg-white/65 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/65 sm:to-white/25" />
  <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex  lg:items-center lg:px-8">
    <div className="max-w-xl text-center sm:text-left">
      <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
        Let's find the
        <strong className="block font-extrabold text-white">
          Solutions
        </strong>
      </h1>
      <p className="mt-4 max-w-lg sm:text-xl text-white sm:leading-relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo
        tenetur fuga ducimus numquam ea!
      </p>
      <div className="mt-8 flex flex-wrap gap-4 text-center">
        <a href="#" className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-800 shadow hover:bg-blue-300 hover:text-whit focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
          Get Started
        </a>
       
      </div>
    </div>
  </div>
</section>
  )
}


export default Banner

