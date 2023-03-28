
import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'

import { useContext } from 'react'
import Banner from '../../components/banner/Banner'



import Ourservices from '../../components/services/Ourservices'

import Testimonials from '../../components/Testimonials/Testimonials'
import Footer from '../../components/footer/Footer'
import SpecsCard from '../../components/CardsCommon/SpecsCard'
import CounselorCards from '../../components/CardsCommon/CounselorCards'
import axios from 'axios'


function Home() {



  return (
    <div>
      <Navbar/>
      <Banner />
      <div>

        <SpecsCard />
      </div>

      <Ourservices />

      <div className=''>
        <CounselorCards />
      </div>

      <div className=''>

        <Testimonials />

      </div>

      <Footer/>

    </div>
  )


}

export default Home
