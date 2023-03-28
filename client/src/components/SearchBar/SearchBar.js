import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {AiOutlineSearch} from 'react-icons/ai'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {CiCalendarDate} from 'react-icons/ci'
import {BiCategoryAlt} from 'react-icons/bi'
import axios from 'axios';
import CounselorLists from '../../pages/CounselorLists/CounselorLists';
import Navbar from '../navbar/Navbar';
import PageNotFound from '../PageNotFound';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const SearchBar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [counselorSearch,setCounselorSearch] = useState('')
  const [searchSuggestion, setSearchSuggestion] = useState([])
  const [showSuggestionDiv,setShowSuggestionDiv] = useState(false)
  const [counselors, setCounselors] = useState([])
  const [searchValues, setSearchValues] = useState({counselorSearch:"", dateSearch:""})
  const [searchedData, setSearchedData] = useState([])
  const [searchNotFound, setSearchNotFound] = useState(false)
  const inputRef = useRef(null)
  const dateInputRef = useRef(null)


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


    const findCounselors = async () => {
        let {data} = await axios.get('/users/counselor-list');          
            setCounselors(data.counselor)        
    }

    useEffect(() => {
        findCounselors();
    }, [])



  const showSuggestion = async(e) =>{
    setCounselorSearch(e.target.value)
    setSearchNotFound(false)
    if(e.target.value){
      setSearchSuggestion(search(counselors))
      setShowSuggestionDiv(true)
    }else{
      setShowSuggestionDiv(false)
      setSearchSuggestion(null)
    }    
  }

  const search = (data) =>{
   return data.filter((item) => item.fullname.toLowerCase().includes(counselorSearch))   
  }

 const fillSearchInput = (searchItem) => {
  inputRef.current.value = searchItem;
  setShowSuggestionDiv(false)
  setSearchValues({...searchValues, [inputRef.current.name]: inputRef.current.value })
 }

 const submitSearch = async(e) => {
  e.preventDefault()
  const {data} = await axios.get('/users/searchCounselor',{
    headers:{
      "searchedFilters":JSON.stringify(searchValues)
    }
  })
  console.log(data)
    if(data.status === "No slots available") {
      setSearchNotFound(true)
    }
      setSearchedData (data) 

 }

  


//  const searchResult = (array) => {
//    return array.filter(obj => obj.fullname === searchValues.counselorSearch)

// }


  return (
    
  <>
  <Navbar/>
    <div className='searchDiv grid gap-10 bg-greyIsh  rounded-[10px] p-[3rem] relative  items-end'>
      <form action="">
        <div className='firstDiv flex justify-between items-center rounded-[8px] gap-[10px] bg-white p-5 shadow-greyIsh-700'>
          <div className='flex gap-2 items-center'>
            <AiOutlineSearch className='text-[25px] cursor-pointer' size={25}/>
            <input type="text" ref={inputRef} className='bg-transparent text-blue-500 border-none focus:border-none w-[100%]' name='counselorSearch'  onChange={showSuggestion} placeholder='Search Counselors' />
            <AiOutlineCloseCircle onClick={()=>{
              setSearchedData([])
              setShowSuggestionDiv(false)
              setSearchNotFound(false)
              inputRef.current.value = null
            }} 
            className='text-[30px] text-[#a5a6a6] hover:text-textColor'/>
          </div>

          <div className='flex gap-2 items-center'>
            <CiCalendarDate className='text-[25px] cursor-pointer' size={30}/>
            <label htmlFor="relevance" className='text-sm'>Date:</label>
            <input type="date" ref={dateInputRef} onChange={(e)=> setSearchValues({...searchValues, [e.target.name]: e.target.value })} name ="dateSearch" className='bg-transparent text-blue-500 border-none focus:border-none w-[100%]' placeholder='Search by date'/>
            <AiOutlineCloseCircle 
            onClick={()=>{
              setSearchedData([])
              setSearchNotFound(false)
              dateInputRef.current.value = null
            }}
            className='text-[30px] text-[#a5a6a6] hover:text-textColor'/>
          </div>

          <div className='flex gap-2 items-center'>
            <BiCategoryAlt className='text-[25px] cursor-pointer' size={30}/>
            <label htmlFor="relevance" className='text-sm'>Category:</label>
            <select name="" id="relevance" className='bg-white rounded-[10px] px-4 py-1 w-full border-none'>
              <option value="">Relevance</option>
              <option value="">Relevance</option>
              <option value="">Relevance</option>
              <option value="">Relevance</option>
            </select>
          </div>

          <button className='bg-blueColor h-full p-5 px-10 rounded-[10px] text-white cursor-pointer hover:bg-blue-400' type='submit' onClick={submitSearch}>Search</button>

        </div>
      </form>
   {
     showSuggestionDiv && <div className='secDiv flex  w-full pl-[3rem] absolute top-[150px]'>
        <ul class="bg-white  justify-center w-[100%] border border-gray-100">
             { 
             searchSuggestion[0] ? searchSuggestion.map((suggestions)=>(
                <li class="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900"
                  onClick={()=>fillSearchInput(suggestions.fullname)}
                >
                    <svg class="stroke-current absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {suggestions.fullname}
                </li> 
                
             )) :
             <li class="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                    <svg class="stroke-current absolute w-4 h-4 left-2 top-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    Not found
                </li> 
             }
          </ul>
      </div>}
    </div> 

   {searchNotFound ? <PageNotFound/> : counselors[0] &&  <CounselorLists Allcounselors = {counselors} searchedItems = {searchedData}/> }      
    </>
  );
};

export default SearchBar;