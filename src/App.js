
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Courses from './components/Courses/courses';
import Header from './components/Layout/Header/header';
import Footer from './components/Layout/Footer/footer';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import Forgetpassword from './components/Auth/forgetpassword';
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
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { loadUser } from './redux/actions/user';
import ProtectedRoute from './ProtectedRoute';
import Loader from './components/Layout/Loader/Loader';
import Payment from './components/Payment/payment';
import AccessCourse from './components/Admin/AccessCourse/AccessCourse';
import CreateModule from './components/Admin/CreateModules/CreateModules';
import CreateTest from './components/Admin/CreateTest/CreateTest';
import UpdateCourse from './components/Admin/UpdateCourse/UpdateCourse';
// import FileUpload from './components/FileUpload';


function App() {
  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

  const { isAuthenticated, user, message, error,loading } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {
        loading ? (<Loader/>) : (
          <>
          <Header isAuthenticated={isAuthenticated} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={ <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CoursePage user={user} />
                </ProtectedRoute>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/request" element={<Request />} />
        <Route
              path="/login"
              element={
                <ProtectedRoute
                isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
        <Route path="/register" element={<ProtectedRoute isAuthenticated ={!isAuthenticated} redirect="/profile">
          <Register />
        </ProtectedRoute>} />
        <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile user = {user}/>
                </ProtectedRoute>
              }
            />
        <Route path="/changepassword" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ChangePassword /></ProtectedRoute>} />
        <Route path="/updateprofile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UpdateProfile user={user} /></ProtectedRoute>} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/resetpassword/:token" element={<Resetpassword />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/subscribe" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Subscribe user={user}/></ProtectedRoute>} />
        <Route path="/purchase" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Payment user={user}/></ProtectedRoute>} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfail" element={<PaymentFail />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"}><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/createcourse" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"}><CreateCourse /></ProtectedRoute>} />
        <Route path="/admin/updatecourse" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"}><UpdateCourse /></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"}><AdminCourses /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"}><Users /></ProtectedRoute>} />
        <Route path="/admin/access" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"}><AccessCourse/></ProtectedRoute>} />
        <Route path="/admin/createmodule" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"}><CreateModule/></ProtectedRoute>} />
        <Route path="/admin/createtest" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"}><CreateTest/></ProtectedRoute>} />
        {/* <Route path="/admin/courses" element={<ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"}><FileUpload /></ProtectedRoute>} /> */}
      </Routes>
      <Footer />
      <Toaster />
          </>
        )
      }
    </Router>
  );
}

export default App;
