
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Login from './pages/login/Login'
import Home from './pages/home/home'
import Signup from './pages/signup/Signup';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CounselorSignup from './pages/councellor/signup/CounselorSignup';
import CounselorLogin from './pages/councellor/login/CounselorLogin';
import Sidebar from './components/Sidebar/Sidebar';
import AdminLogin from './pages/Admin/login/AdminLogin';
import Dashboard from './pages/Admin/dashboard/Dashboard';
import Specialization from './pages/Admin/specialization/Specialization'
import ViewRequests from './pages/Admin/Requests/ViewRequests';
import RequestDetails from './pages/Admin/requestDetails/RequestDetails';
import CheckToken from './components/checkToken/CheckToken';
import CounselorCheckToken from './components/checkToken/CounselorCheckToken';
import CounselorHome from './pages/councellor/Home/CounselorHome';
import CounselorSessions from './pages/councellor/Sessions/CounselorSessions';
import CounselorPatients from './pages/councellor/Patients/CounselorPatients';
import CounselorProfile from './pages/councellor/Profile/CounselorProfile';
import ViewProfile from './pages/CounselorProfile/ViewProfile';
import ViewPlans from './pages/ViewPlans/ViewPlans';
import OrderSumary from './pages/Order Summary/OrderSumary';
import Chat from './pages/chat/Chat';
import SessionBooked from './components/BookedSuccess/SessionBooked';
import MySessions from './pages/Sessions/MySessions';
import VideoCall from './pages/VideoCall/VideoCall';
import ViewUsers from './pages/Admin/viewuser/ViewUsers';
import Spinner from './components/spinner/Spinner';
import CounselorLists from './pages/CounselorLists/CounselorLists';
import SearchBar from './components/SearchBar/SearchBar';
import RequireAuth from './components/RequireAuth';


function App() {


 return (
    <Router>
        <Routes>
            
            
            <Route  element={<CheckToken/>}>
                <Route path='/' element={<Home/>}/>
            </Route>

            <Route path='/login' element={<Login/>}/>

            <Route path='/signup' element={<Signup/>}/>

            <Route path='/counselor-lists' element={<SearchBar/>}/>

            <Route path='/counselor-details/:id' element={<ViewProfile/>}/>

            <Route path='/view-plans' element={<ViewPlans/>}/>

            <Route  element={<CheckToken/>}>
                <Route path='/order-summary' element={<OrderSumary />}/>
            </Route>

            <Route path='/session-booked' element={<SessionBooked/>}/>

            <Route  element={<CheckToken/>}>
                <Route element={<RequireAuth/>}>
                    <Route path='/my-sessions' element={<MySessions/>}/>
                </Route>
            </Route>

            <Route  element={<CheckToken/>}>
                <Route element={<RequireAuth/>}>
                    <Route path='/my-chats' element={<Chat/>}/>
                </Route>
            </Route>

            <Route  element={<CheckToken/>}>
                <Route path='/video-call/:roomId' element={<VideoCall/>}/>
            </Route>
            
            <Route path='/loading' element={<Spinner/>}/>
            

            
            


            <Route path='/counselor-register' element={<CounselorSignup/>}/>

            <Route path='/counselor-login' element={<CounselorLogin/>}/>

            <Route path='/counselor/home' element={<Sidebar props = {<CounselorHome/>} counselor="true"/>}/>

            <Route path='/counselor/my-sessions' element={<Sidebar props = {<CounselorSessions/>} counselor="true"/>}/>

            <Route path='/counselor/my-patients' element={<Sidebar props = {<CounselorPatients/>} counselor="true"/>}/>

            <Route  element={<CounselorCheckToken/>}>
                <Route path='/counselor/my-profile' element={<Sidebar props = {<CounselorProfile/>} counselor="true"/>}/>
            </Route>

            <Route  element={<CounselorCheckToken/>}>
                <Route path='/counselor/my-chats' element={<Sidebar props = {<Chat/>} counselor="true"/>}/>
            </Route>

            




            <Route path='/admin-login' element={<AdminLogin/>}/>

            <Route path='/admin' element={<Sidebar admin={true} props = {<Dashboard admin={true}/>}/>} />

            <Route path='/admin/view-user' element={<Sidebar admin={true} props = {<ViewUsers admin={true}/>}/>} />

            <Route path='/admin-specialization' element={<Sidebar  admin={true} props = {<Specialization/>}/>} />

            <Route path='/admin-view-requests' element={<Sidebar  admin={true} props = {<ViewRequests/>}/>} />

            <Route path='/admin-view-request-details/:counselorId' element={<Sidebar  admin={true} props = {<RequestDetails/>}/>} />
         </Routes>
    </Router>
 )
}

export default App;
