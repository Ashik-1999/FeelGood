import React from 'react'

function Cancelled(props) {
    console.log(props.data)
  return (
    <div>
              <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        {
                            props.data.length > 0 ?
                                <table className="min-w-full">
                                    <thead className="border-b">
                                        <tr>
                                            <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                                                SI No.
                                            </th>
                                            <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                                                Counselor
                                            </th>
                                            <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                                                Booked Date
                                            </th>
                                            <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                                                Session Date
                                            </th>
                                            <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                                                Session Time
                                            </th>
                                            <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                                                Patient Name
                                            </th>
                                            <th scope="col" className="text-md font-medium text-gray-600 px-6 py-4 text-left">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.data.map((element, i) => (

                                                
                                                <tr className="border-b">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i + 1}</td>
                                                    <td className="text-sm font-medium text-gray-900 px-6 py-4 whitespace-nowrap ">
                                                        {element.counselorName}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {element.date}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {element.time}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {element.patientName}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                                        {/* { moment().format('MMMM Do YYYY') > element.date ? 
                                                            <h1 className='text-red-600'>Session not attended</h1> : 
                                                            element.status == "cancelled" ? <h1 className='text-red-600'>Session cancelled</h1>  :
                                                            <>
                                                                <button class="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={()=>cancelSession(element._id)}>Cancel</button>
                                                                <button onClick={()=>{
                                                                navigate('/my-chats')
                                                                 }} class="bg-blue-800 hover:bg-blue-500 text-white font-bold ml-2 py-2 px-4 rounded">Chat</button>
                                                            </>
                                                         } */}
                                                          <button class="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" >Reschedule</button>
                                                    </td>
                                                </tr>
                                            ))

                                        }
                                    </tbody>
                                </table> :
                                <div>
                                    <div className='flex justify-center'>
                                        <p className='text-2xl font-semibold'>You don't have any cancelled sessions</p>
                                    </div>
                                    
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cancelled
