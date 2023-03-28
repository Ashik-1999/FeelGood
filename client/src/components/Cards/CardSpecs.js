import React from 'react'
import Button from '../button/Button'

function CardSpecs(props) {
    console.log(props,"propssssssssss")
    return (
        <div>
            <div className="px-4 bg-white-500  md:w-[250px]  transform transition duration-500 hover:scale-110 ">

                <div className="bg-white rounded-lg shadow-lg ">
                    <div className=''>
                       <img src={props.obj.imageUrl}  alt="" classNameName="rounded-t-lg object-cover className='h-64 w-full'" />
                    </div>
                    <div className="p-6 ">
                        <h2 className="font-bold mb-2 text-2xl text-black-800 text-center" >{props.obj.Specialization}
                        </h2>
                        {/* <p className="text-black-600 hover:text-black-500 text-center cursor-pointer text-sm">Read More 👉</p> */}
                        <button className='bg-blue-900 py-1 px-4 ml-[30px] rounded-full text-white place-self-center'>Choose👉</button> 
                        
                    </div>

                </div>
            </div>
        </div>
       
    )
}

export default CardSpecs
