import React from 'react'
import {GrMail} from 'react-icons/gr'
import {MdNotifications} from 'react-icons/md'

function AdminNavbar() {
    return (
        <header className="px-4 py-2 shadow bg-gray-900">
        <div className="flex justify-between">
          <div className="flex items-center">
            
        
            <div data-search-form className="relative mr-3 hidden md:inline-block">
              <h1   className="h-auto pl-10 py-2  text-2xl font-bold text-white">Admin Panel</h1>
            </div>
          </div>
          <div className="flex items-center">
            <button data-messages className="p-3 mr-2  transform transition  hover:scale-110" typle="button">
             <GrMail size={25} className='text-white'/>
            </button>
            <button data-notifications className="p-3 mr-3 transform transition  hover:scale-110" typle="button">
              <MdNotifications size={25} className='text-white'/>
            </button>
            <button data-dropdown className="flex items-center px-3 py-2 transform transition  hover:scale-110 rounded-md bg-white" type="button" x-data="{ open: false }" >
             
              <span className=" text-sm hidden md:inline-block font-semibold text-black">Logout</span>
             
            </button>
          </div>
        </div>
      </header>
  )
}

export default AdminNavbar
