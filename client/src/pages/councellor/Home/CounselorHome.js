import React, { useState } from 'react'
import ms from 'ms'

function CounselorHome() {
  const [date,setDate] = useState(new Date())
  
  const disabled = () =>{
    var today,dd,mm,yyyy
   today = new Date()
   let month = today.getMonth()+1
    dd = '' + today.getDate()
    mm = '' + month
   
    yyyy = '' + today.getFullYear()
    if(dd.length<2){
      dd = 0 + dd
    }
    
    if(mm.length<2){
      mm = 0 + mm 
    }
    return yyyy + "-" + mm + "-" + dd
  }
  
  
  const maxday = () =>{

    var day = new Date();
    var dd,mm,yyyy
    var nextDay = new Date(day);
    const month = day.getMonth()+1

    var last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let lastDay =last.getDate() 
    let diff = lastDay - day.getDate()

    nextDay.setDate(day.getDate() + diff);
   dd = '' + nextDay.getDate()
    mm = '' + month  
    yyyy = '' + nextDay.getFullYear()

    if(dd.length<2){
      dd = 0 + dd
    }
    
    if(mm.length<2){
      mm = 0 + mm
    }
    
   const maximum = yyyy + "-" +  mm + "-" +  dd
    return maximum
  }


  return (
    <div>
      <input type="date" min={disabled()} max={maxday()} />
    </div> 
  )
}

export default CounselorHome


