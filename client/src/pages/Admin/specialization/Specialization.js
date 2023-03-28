import React, { useEffect, useState } from 'react'
import Viewspecs from '../../../components/Admin/viewspecs/Viewspecs';
import Addspecs from '../../../components/Admin/addspecs/Addspecs';
import Navbar from '../../../components/navbar/Navbar';
import axios from 'axios';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import AdminNavbar from '../../../components/Admin/adminNavbar/AdminNavbar';


function Specialization(props) {

 console.log(props)
  const [openTab, setOpenTab] = React.useState(1);
  const color = "blue"

  const [boolean,setBoolean] = useState(false)

  return (

    <div className=''>
      <AdminNavbar/>
      <div className="flex flex-wrap ">
        <div className="w-[1200px] min-w-full pr-2">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row "
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <NavLink 
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg  rounded block leading-normal " +
                    (openTab === 1 
                    ?  "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white") 
                    
                }
                onClick={e => {
                 
                  setOpenTab(1);
                  setBoolean(true)
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                View Specializations
              </NavLink>
            </li>
            
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <NavLink 
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                 
                  setOpenTab(3);
                  setBoolean(false)
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                 Add Specializations
              </NavLink>
            </li>
          </ul>
          
          </div>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <Viewspecs data = {boolean}/>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <Addspecs/>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Specialization
