import Button from '../button/Button'
import React from 'react'
import {useNavigate} from 'react-router-dom'

function PlansCard(props) {
    console.log(props,"propsss")
    const navigate = useNavigate()

   

    const plan = [
        {
            plan: '999',
            name: 'Basic Plan',
            description: 'In this plan, you will be permitted to attend one session from the consultant accordingly. Also, you will be accessible to chat with the consultant for one week.'
        },
        {
            plan: '1799',
            name: 'Recommended Plan',
            description: 'This one is the most recommended plan, you will be permitted to attend three session from the consultant accordingly. Also, you will be accessible to chat with the consultant for two week.'
        },
        {
            plan: '2499',
            name: 'Advanced Plan',
            description: 'If you are in a critical condition, you can choose this effective plan.You will be permitted to attend five session from the consultant accordingly. Also, you will be accessbile to chat with the consultant for three week.'
        }

    ]

    const toOrderSummary = () =>{
       
    }


    return (
        <>
        
            {
                plan.map((element)=>(
                    <div className="pricing-plan-wrap lg:w-1/3 my-4 md:my-6">
                   
                    <div className="pricing-plan border-t-4 border-solid border-white h-[500px] bg-blue-900 text-center max-w-sm mx-auto group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-300 border rounded-xl">
                        <div className="p-6 md:py-8">
                            <h4 className="font-medium leading-tight text-2xl mb-2 text-white">{element.name}</h4>
                            <p className="text-white">For small projects</p>
                        </div>
                        <div className="pricing-amount text-white bg-indigo-100 p-6 transition-colors duration-300">
                            <div className='text-black'><span className="text-4xl text-black font-semibold">INR {element.plan}</span></div>
                        </div>
                        <div className="p-6">
                            <p className='text-white text-left'>{element.description}</p>
                            <div className="mt-6 py-4">
                                <button onClick={()=>{
                                     navigate('/order-summary',{
                                        state:{
                                            date:props.data.time,
                                            counselor:props.data.counselorId,
                                            planDetails:element,
                                            bookedDate:props.data.sessionDate,

                                        }
                                    })
                                }} className=" inset-y-0 right-0  cursor-pointer py-3 px-8 bg-orange-400 text-md pt-3 px-4 py-2 leading-none border rounded-lg text-white border-none hover:border-transparent h-[40px] hover:text-blue-800 hover:bg-white display-flex " >Buy plan</button>
                            </div>
                        </div>
                    </div>
                </div>
                ))

            }
        </>
    )
}

export default PlansCard
