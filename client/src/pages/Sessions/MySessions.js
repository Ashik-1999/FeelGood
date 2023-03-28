
import React,{useEffect,useState,useContext} from 'react'
import Upcoming from '../../components/sessions/Upcoming';
import AuthContext from '../../context/Userdata'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import moment from 'moment'
import Cancelled from '../../components/sessions/Cancelled';
import Spinner from '../../components/spinner/Spinner';
import Navbar from '../../components/navbar/Navbar';


function MySessions() {

    const [openTab, setOpenTab] = React.useState(1);
    const color = "blue"
    const [values, setValues] = useState([])
    const [boolean,setBoolean] = useState(false)
    const [loading,setLoading] = useState(true)


    const { auth } = useContext(AuthContext)
    if (auth.jwt) {
        var decoded = jwt_decode(auth?.jwt);
    }
    const userId = decoded.user._id
    

    useEffect(() => {
        setLoading(true)
        const viewSessions = async () => {
            const { data } = await axios.get(`/users/view-sessions/${userId}`,{
                headers: { 'Authorization': `Bearer ${auth.jwt}`}
            })
            console.log(data,"dataaaaaaaaaaaaa")
            setValues(data)
            setLoading(false)
        }
        viewSessions()
    }, [openTab,boolean])

  

    const notAttended = values.filter((element)=>{
        return element.status == "not attended"
    })
    const cancelled = values.filter((element)=>{
        return element.status == "cancelled"
    })

    const upcoming = values.filter((element)=>{
        return element.status != "cancelled" && element.status != "not attended"
    })

    function cancelSessionUpdate(){
        setBoolean(boolean ? false : true)
    }

    
    
    return (
    loading ? <Spinner/> : <React.Fragment>
        <Navbar/>
            <div className='flex justify-center'>
                <div className='h-auto border-4 border-slate-300 rounded-lg  mt-20 grid md:grid-cols-2 m-auto justify-center items-center'>
                    <div>
                        <p className='text-black ml-10 text-4xl font-bold'>You have {values.length} upcoming sessions</p>
                    </div>
                    <div className='flex justify-center'>
                        <img className='ml-11 w-fit h-60' src="https://www.univariety.com/blog/wp-content/uploads/2022/03/istockphoto-1236948739-612x612-1.jpg" alt="" />
                    </div>
                </div>
            </div>

            <div className='mt-7 flex justify-center'>
                <div>
                    <div className="w-[1200px] min-w-full pr-2">
                        <ul
                            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row "
                            role="tablist"
                        >
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <a
                                    className={
                                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                        (openTab === 1
                                            ? "text-white bg-blue-900"
                                            : "text-black")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(1);
                                    }}
                                    data-toggle="tab"
                                    href="#link1"
                                    role="tablist"
                                >
                                    Upcoming Sessions
                                </a>
                            </li>

                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <a
                                    className={
                                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                        (openTab === 2
                                            ? "text-white bg-blue-900"
                                            : "text-black")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(2);
                                    }}
                                    data-toggle="tab"
                                    href="#link3"
                                    role="tablist"
                                >
                                    Completed Sessions
                                </a>
                            </li>

                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                <a
                                    className={
                                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                        (openTab === 3
                                            ? "text-white bg-blue-900"
                                            : "text-black")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(3);
                                    }}
                                    data-toggle="tab"
                                    href="#link3"
                                    role="tablist"
                                >
                                    Cancelled Sessions
                                </a>
                            </li>
                        </ul>

                    </div>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                   {values.length > 0 && <Upcoming data = {upcoming} func = {cancelSessionUpdate}/>}
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link3">

                                </div>                  
                                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                    <Cancelled data = {cancelled}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MySessions
