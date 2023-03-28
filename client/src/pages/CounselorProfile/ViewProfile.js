import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardsCouns from "../../components/Cards/CardsCouns";
import Navbar from "../../components/navbar/Navbar";
import Button from "../../components/button/Button";
import SchoolIcon from "@mui/icons-material/School";
import AppsIcon from "@mui/icons-material/Apps";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";
import Calender from "../../components/Consultant/Calender/Calender";


function ViewProfile() {
  const [data, setData] = useState({});
  const [timeSlot, setTimeSlot] = useState([]);
  const [notAvailable, setNotAvailable] = useState(false);
  const [selectedDate, setSelectedDate] = useState({})
  const [checkAlreadyBooked, setCheckAlreadyBooked] = useState({})
  const [spec, setSpec] = useState()
  const [availableTime, setAvailableTime] = useState([])
  const navigate = useNavigate();

  const params = useParams();
  useEffect(() => {
    axios.get(`/users/get-counselor-details/${params.id}`).then((response) => {
      // console.log(response,"response is coming")
      setData(response.data.details);
      setTimeSlot(response.data.details.slots);
      setSpec(response.data.spec)
    });
  }, []);

  const selectDate = async(e) => {
   
    setSelectedDate({[e.target.name]: e.target.value })
    if (data.leaveDate.length != 0) {
      setNotAvailable(
        data.leaveDate.some((obj) =>
          Object.values(obj).includes(e.target.value)
        )
      );

    } else {
      console.log("no leave");
    }

   
   
    setCheckAlreadyBooked(data.bookedSlots.filter((obj)=>{
    return Object.values(obj).includes(e.target.value)
    })) 
  };

  // console.log(checkAlreadyBooked,"already booked")

  useEffect(()=>{
 
  
    axios.get(`/users/get-counselor-details/${params.id}`).then((response)=>{
      console.log(response.data)
      setData(response.data.details)

      setTimeSlot(response.data.details.slots);
      if(checkAlreadyBooked.length > 0  ){
      timeSlot.map((element)=>{
            
            return checkAlreadyBooked.forEach((secondElem)=>{
              if(element.time == secondElem.time) {
                  element.booked = true                
            } 
          })
        })
      }
      setAvailableTime(timeSlot)
      
    })
    

    // console.log(data.slots, "slotsss")
  },[selectedDate])
  
 



  return (
    <div className="">
      <Navbar />
      <section class="relative bg-blueGray-50">
        <div class="container mx-auto">
          <div class="flex flex-wrap items-center">
            <div class="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto">
              <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg bg-blue-700">
                <div>
                  <img
                    alt="..."
                    src={data.imageUrl}
                    className="w-full align-middle rounded"
                  />
                </div>
                <blockquote class="relative p-8 mb-4 text-center">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    class="absolute left-0 w-full block h-95-px -top-60-px"
                  >
                    <polygon
                      points="-30,95 583,95 583,65"
                      class="text-blue-700 fill-current"
                    ></polygon>
                  </svg>
                  <h2 class="text-3xl uppercase font-bold text-white">
                    {data.fullname}
                  </h2>
                  <p class="text-xl font-light  text-white">
                    {data.qualification}
                  </p>
                </blockquote>
              </div>
            </div>

            <div class="w-full md:w-6/12 px-4 mt-20">
              <div class="flex flex-wrap">
                <div class="w-full md:w-6/12 px-4">
                  <div class="relative flex flex-col mt-4">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <SchoolIcon />
                      </div>
                      <h6 class="text-xl mb-1 font-semibold">Qualification</h6>
                      <p class="mb-4 text-blueGray-500 text-xl">
                        {data.qualification}
                      </p>
                    </div>
                  </div>
                  <div class="relative flex flex-col min-w-0">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <LanguageIcon />
                      </div>
                      <h6 class="text-xl mb-1 font-semibold">Languages</h6>
                      <p class="mb-4 text-blueGray-500 text-xl">
                        English, Hindi, Malayalam
                      </p>
                    </div>
                  </div>
                </div>

                <div class="w-full md:w-6/12 px-4">
                  <div class="relative flex flex-col min-w-0 mt-4">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <AppsIcon />
                      </div>
                      <h6 class="text-xl mb-1 font-semibold">
                        Specializations
                      </h6>
                      <p class="mb-4 text-blueGray-500 text-xl">
                        {spec}
                      </p>
                    </div>
                  </div>

                  <div class="relative flex flex-col min-w-0">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <LanguageIcon />
                      </div>
                      <h6 class="text-xl mb-1 font-semibold">Experience</h6>
                      <p class="mb-4 text-blueGray-500 text-xl">
                        {data.experience} Years
                      </p>
                    </div>
                  </div>
                </div>

                <div class="w-full px-4">
                  <div class="relative flex flex-col min-w-0 mt-4">
                    <div class="px-4 py-5 flex-auto">
                      <div class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                        <InfoIcon />
                      </div>
                      <h6 class="text-xl mb-1 font-semibold">About</h6>
                      <p class="mb-4 text-blueGray-500 text-xl">{data.about}</p>
                    </div>
                  </div>
                </div>

                <div class="w-full px-4 mb-10">
                  <div className="w-full h-auto mb-5 rounded-lg border-2 border-dashed border-gray-600">
                    <h5 className="text-lg font-semibold text-center mt-2">
                      SELECT YOUR CONVENIENT SLOT
                    </h5>
                    <div className="flex justify-center p-2 border-b-2 border-double border-gray-500">
                      <Calender type="date" name="date" onChange={selectDate} />
                    </div>
                    
                    {notAvailable ? (
                      <div className="flex items-center mt-5 pb-3 justify-center">
                        <div class="px-4 py-3 leading-normal text-red-700 bg-red-100 rounded-lg" role="alert">
                            <p class="font-bold text-center">Not available!</p>
                            <p>The counselor who you are looking is not available for the selected date!</p>
                        </div>
                      </div>
                      
                    ) : (
                      <div className="grid mt-3 pb-2 md:grid-cols-3 sm:grid-cols-2 text-center">
                        {availableTime.length > 0 ? availableTime.map((element, i) => (
                           element.booked ? 
                            <div className="w-20 h-12 ml-20 mt-5 bg-red-100 border-2 border-red-700 rounded flex disabled items-center justify-center" disabled>
                              {element.time}
                            </div>
                            :
                          <div
                            onClick={() => {
                              navigate("/view-plans", {
                                state: {
                                  time: element.time,
                
                                  counselorId: data,
                                  sessionDate: selectedDate.date 
                                },
                              });
                            }}
                           
                            className="w-20 h-12 ml-20 mt-5 bg-green-100 border-2 border-green-700 rounded flex disabled items-center justify-center hover:bg-slate-500 cursor-pointer" 
                          >
                            <p key={i} className = {element.booked ? "text-red-500" : "text-blue-900"}>{element.time}</p>
                          </div>
                        )) : 
                        timeSlot.map((element, i) => (
                         
                          <div
                            onClick={() => {
                              navigate("/view-plans", {
                                state: {
                                  time: element.time,               
                                  counselorId: data,
                                  sessionDate: selectedDate.date 
                                },
                              });
                            }}
                            className="w-20 h-12 ml-20 mt-5 bg-green-100 border-2 border-green-700 rounded flex items-center justify-center hover:bg-slate-500 cursor-pointer"
                          >
                            <p key={i} className = {element.booked ? "text-red-500" : "text-blue-900"}>{element.time}</p>
                          </div>
                        ))}
                      </div>
                    )}
                     
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewProfile;
