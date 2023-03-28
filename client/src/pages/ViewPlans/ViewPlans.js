import React from 'react'
import PlansCard from '../../components/Cards/PlansCard'
import Navbar from '../../components/navbar/Navbar'
import {useLocation} from 'react-router-dom'

function ViewPlans() {
    const {state} = useLocation()
    console.log(state,"locationnnn")
    return (
        <div>
            <Navbar/>
            <div className="pricing-table-2 bg-white py-6 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl font-medium text-black mb-4 md:mb-6">Our Plans</h1>
                        <p className="text-black xl:mx-12 text-xl font-bold font-sans">"When you take care of yourself, you're a better person for others. When you feel good about yourself, you treat others better."</p>
                    </div>
                    <div className="pricing-plans lg:flex lg:-mx-4 mt-6 md:mt-12 group">
                        <PlansCard data = {state}/>
                       
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ViewPlans
