
import React, { useEffect ,useState } from 'react'
import './App.css'
import { BrowserRouter as Router , Routes, Route ,Navigate  } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Project from "./Layouts/Project";
import Home from "./Layouts/Home";

import Services from './Layouts/Services';

import Nav from './Pages/Nav';
import Footer from './Layouts/Footer';
import ProtectedLayout from './components/Common/ProtectedLayout';
import GuestLayout from './components/Common/GuestLayout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { AuthProvider } from './contexts/AuthContext';
import DetailsProject from './Pages/DetailsProject';
import UserProfile from './Pages/UserProfile';
import DetailsService from './Pages/DetailsService';
import Dashboard_user from './Panel_Users/Dashboard';
import Addproject from './Panel_Users/Projects/add_project';
import Add_service from './Panel_Users/add_service';

import RecoveryPassword from './components/auth/RecoveryPassword';
import NotFoundPage from './Pages/404';
import Freelancer from './Layouts/Freelancer';
import {useAuth } from './contexts/AuthContext';

import Admin from './DashboardAdmin/Layout-Dashboard/Admin/Route-dashboard';
import FilterServices from './Layouts/FilterService';
import EditService from './Panel_Users/EditeService';
import Portfolio from './Layouts/portfolio/Portfolio';
import { AddPortfolio } from './Layouts/portfolio/add_portoflio';
import { EditePortfolio } from './Layouts/portfolio/editePortfoilo';
import Messanger from './Chat/Messanger';
import EmailVerification from './components/auth/EmailVerification';
import OrderServiceMangment from './Pages/OrderServicesMangment';
import Rating from './Panel_Users/Ratings/Rating';
import AddRating from './Panel_Users/Ratings/AddRating';
import PaymentGateway from './Panel_Users/Balance/PaymentGateway';
import LoginGoogle from './components/auth/LoginGoogle';
import AcceptedBid from './Panel_Users/Projects/ProjectManagement/AcceptedBid';
import IssueReport from './Chat/IssueReport/IssueReport';

function App() {
  const { user} = useAuth();

  const [userRole, setUserRole] = useState()
  useEffect(()=>{
    setUserRole(JSON.parse(localStorage.getItem('user'))?.role || null)
    console.log(userRole);
 },[userRole])
    
  return (
    <>
        <AuthProvider>
                {userRole ? (
          <>
            <Admin/>
          </>
        ) :(
      

          <>
          <Nav/>
          <Routes>
         
               
                 <Route path="*" element={<NotFoundPage/>}/>
                 <Route  path="/services" element={<Services/>} />
                 <Route  path="/services/:categoryName" element={<FilterServices/>} />
                 <Route  path="/chat/:id" element={<Messanger/>} />
                 
                 <Route  path="/rating" element={<Rating/>} />
                 <Route  path="/project" element={<Project/>} />
                 <Route  exact   path="/detailsProject/:id" element={<DetailsProject/>} />
                 <Route  path="/user-profile/:userId" element={<UserProfile/>} />
                 <Route  path="/issue-report" element={<IssueReport/>} />
          
                 <Route  path="/details-service/:id" element={<DetailsService/>} />
                <Route  path="/portfolio/:id" element={<Portfolio/>} />

                 <Route path="/" element={<ProtectedLayout />}>
                 <Route  path="add_project" element={<Addproject/>} />
                 <Route  path="add_service" element={<Add_service/>} />
                 <Route  path="accept-bid"  element={<AcceptedBid/> }   />
                 <Route  path="/add-portfolio" element={<AddPortfolio /> }  />
                 <Route  path="/edite/:id/portfolio" element={<EditePortfolio /> } />
                 <Route  path="order/:id/add-rating"  element={<AddRating />} />
                 <Route  path="/edite/:id/service"  element={<EditService /> } />
                 <Route  path="/chat-service/:id"   element={<OrderServiceMangment />}  />
                 <Route  path="/payment-gateway"  element={<PaymentGateway />} /> 
               </Route>
               
                 <Route  path="/recovery-password" element={<RecoveryPassword/>} />
                 <Route  path="/home" element={<GuestLayout><Home /></GuestLayout>} />
                 <Route  path="/freelancer"  element={<Freelancer />} />
                 <Route  path="/project" element={<Project/> }/>
                 <Route  path="/login" element={<GuestLayout><Login /></GuestLayout>} />
                 <Route path="/register" element={<GuestLayout><Register /></GuestLayout>} />
                 <Route path="/email-verification" element={  <EmailVerification />} />
                 
          
                 <Route path="/dashboard" element={<ProtectedLayout />}>
                 <Route  path="profile" element={<Dashboard_user/>} />
                
               </Route>
                 </Routes>
            
         
         
             

                  <Footer/>
          </>
        )}
         <ToastContainer />
    </AuthProvider>
        
        
   
      
    </>
  )
}

export default App
