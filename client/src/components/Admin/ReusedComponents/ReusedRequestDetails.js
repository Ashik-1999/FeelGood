import React from 'react'

function ReusedRequestDetails(props) {
    return (
        <div className="flex flex-wrap md:w-auto w-full md:mb-0 mb-4 mt-5">
            <h2 className="text-black text-xl font-bold w-full  text-center sm:text-left  sm:mt-0">{props.header}</h2>
            <div className="flex flex-col sm:w-auto w-full sm:justify-start justify-center">
                <span className="text-gray-700 mr-4  tracking-wider"> {props.name}</span>
                <span className="text-gray-700 mr-4  tracking-wider">{props.number}</span>
                <span className="text-gray-700 mr-4 tracking-wider"> {props.email}</span>
            </div>
        </div>
    )
}

export default ReusedRequestDetails
