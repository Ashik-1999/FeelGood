import React from 'react'

function CardsCouns(props) {
    return (
     
            <div className=''>
                <div className='px-10 bg-slate-300 md:w-80 flex flex-col md:h-96 justify-between  duration-500 cursor-pointer group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 p-10 rounded-xl'>
                    <img src={props.obj.imageUrl} className='h-40 rounded-lg' alt="loading..." />
                    <h4 className='uppercase text-xl font-bold'>{props.obj.fullname}</h4>
                    <h3 className='uppercase  font-bold'>({props.obj.Specialization})</h3>
                    <p className='text-sm leading-7 my-3 text-center opacity-50 text-black'>{props.obj.qualification}</p>
                    <button className='bg-blue-900 py-2.5 px-8 rounded-full text-white' onClick={()=>{
                        props.onclick(props.obj._id)
                    }}>Get in touch</button> 
                </div>
            </div>
        
    )
}

export default CardsCouns
