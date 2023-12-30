import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home/home';
import Courses from './components/Courses/courses';
import Header from './components/Layout/Header/header'
import Footer from './components/Layout/Footer/footer'
import Login from './components/Auth/login'
import Register from './components/Auth/register';
import Forgetpassword from './components/Auth/forgetpassword'
import Resetpassword from './components/Auth/resetpassword';
import Contact from './components/Contact/contact';
import Request from './components/Request/request';
import About from './components/About/about';
import NotFound from './components/Layout/NotFound/notFound';
import Subscribe from './components/Payment/subscribe';
import PaymentSuccess from './components/Payment/paymentSuccess';
import PaymentFail from './components/Payment/paymentFail';
import CoursePage from './components/CoursePage/coursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import Users from './components/Admin/Users/Users';
import { useDispatch, useSelector } from 'react-redux';
import toast,{ Toaster } from 'react-hot-toast';
import { useEffect } from 'react';




function App() {
  window.addEventListener('contextmenu', e =>{
    e.preventDefault();
  });

  const {isAuthenticated,user} = useSelector(state=>state.user)
  const { error, message } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch({type: 'clearError'});
    }
    if(message){
      toast.success(message);
      dispatch({type: 'clearMessage'});
    }
  },[dispatch, error, message]);
  
  return (
    <Router>
      <Header isAuthenticated= {isAuthenticated} user={user}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/courses' element={<Courses/>} />
        <Route path='/course/:id' element={<CoursePage/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/request' element={<Request/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/changepassword' element={<ChangePassword/>} />
        <Route path='/updateprofile' element={<UpdateProfile/>} />
        <Route path='/forgetpassword' element={<Forgetpassword/>} />
        <Route path='/resetpassword/:token' element={<Resetpassword/>} />
        <Route path='*' element={<NotFound/>} />
        <Route path='/subscribe' element={<Subscribe/>} />
        <Route path='/paymentsuccess' element={<PaymentSuccess/>} />
        <Route path='/paymentfail' element={<PaymentFail/>} />

        {/* Admin Routes */}
        <Route path='/admin/dashboard' element={<Dashboard/>} />
        <Route path='/admin/createcourse' element={<CreateCourse/>} />
        <Route path='/admin/courses' element={<AdminCourses/>} />
        <Route path='/admin/users' element={<Users/>} />

      </Routes>
      <Footer/>
      <Toaster/>
    </Router>
  )
}

export default App