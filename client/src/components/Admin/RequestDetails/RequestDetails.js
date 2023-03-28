import React, { useEffect, useState } from 'react'
import ReusedRequestDetails from '../ReusedComponents/ReusedRequestDetails'
import Button from '../../button/Button'
import axios from 'axios'

function RequestDetails(props) {
  console.log(props)
  const counselorId = props.params.counselorId
  const [counselor, setCounselor] = useState({})
  const [specs, setSpecs] = useState([])
  const [boolean, setBoolean] = useState(false)
  const [message, setMessage] = useState({ message: '' })
  const [openMessage, setOpenMessage] = useState(false)

  useEffect(() => {
    axios.get(`/admin/request-details/:${counselorId}`).then((response) => {
      console.log(response)
      const { data } = response
      setCounselor(data.counselor)
      setSpecs(data.specs)
    })
  }, [boolean])

  const approveRequest = () => {
    axios.put(`/admin/approve-request/:${counselor._id}`).then((response) => {
      setBoolean(true)
    })
  }

  const messageOpen = () => {
    openMessage? setOpenMessage(false):setOpenMessage(true)
  }

  console.log(message)

  const rejectRequest = () => {
    axios.put(`/admin/reject-request/:${counselor._id}`,
    {
      ...message,
    },
    { withCredentials: true }).then((response) => {
      setBoolean(true)
      setOpenMessage(false)
    })
  }

  return (
    <div>
      <div className="flex flex-col min-h-scren w-[1200px]">
        <div className="bg-white ">

          <div className="container mx-auto mr-4">
            <div className="flex flex-wrap py-8 flex-col sm:flex-row">
              <div className="  overflow-hidden flex-shrink-0 m-auto sm:m-0">
                <img src="" className='object-cover w-64 h-64 p-3 border rounded-lg border-black' />
                <h1 className={`text-center mt-6 font-bold ${counselor.status == "approved" ? "text-green-600" : "text-red-600"} text-2xl`}>{counselor.status}</h1>
              </div>
              <div className="sm:pl-10 sm:pt-4 flex-1">
                <div className="flex sm:flex-col sm:justify-between  sm:flex-no-wrap justify-center flex-wrap mb-6">

                  <ReusedRequestDetails header="Personal Details" name={counselor.fullname} email={counselor.email} number={counselor.number} />
                  <ReusedRequestDetails header="qualification" name={counselor.qualification} />
                  <ReusedRequestDetails header="Specialization" name={counselor.Specialization} />
                  <ReusedRequestDetails header="Medical registration number" name={counselor.regNumber} />



                </div>
                <h2 className="text-black text-xl w-full font-bold  text-center sm:text-left  sm:mt-0">About</h2>
                <p className="text-gray-700 leading-normal px-4 sm:px-0">
                  {counselor.about}
                </p>
              </div>
            </div>
          </div>
          {
            counselor.status == "pending" ?
              <div className="flex justify-center border-t border-gray-700 py-5">
                <Button onclick={approveRequest} class="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-blue-900 border-white hover:border-transparent hover:text-white hover:bg-blue-400 mt-4 lg:mt-0 ml-3" text="Approve" />
                <Button onclick={messageOpen} class="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-blue-900 border-white hover:border-transparent hover:text-white hover:bg-blue-400 mt-4 lg:mt-0 ml-3" text="Reject" />

              </div> :
              <div className="flex justify-center border-t border-gray-700 py-5">
                <h2 className={` text-2xl w-full font-semibold  text-center ${counselor.status == "approved" ? "text-green-600" : "text-red-600"}  sm:mt-0`}>{counselor.status}</h2>
              </div>
          }
          {
            openMessage && 
            <div className="">
              <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 w-full mt-10 md:mt-0  shadow-md">
                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
                <p className="leading-relaxed mb-5 text-gray-600">Post-ironic portland shabby chic echo park, banjo fashion axe</p>
                <div className="relative mb-4">
                  <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                  <textarea id="message" onChange={(e) => setMessage({ ...message, [e.target.name]: e.target.value })} name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" defaultValue={""} />
                </div>
                <Button onclick={rejectRequest} class="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-blue-900 border-white hover:border-transparent hover:text-white hover:bg-blue-400 mt-4 lg:mt-0 ml-3" text="Submit" />

              </div>
            </div>
          }
        </div>

      </div>

    </div>
  )
}

export default RequestDetails


