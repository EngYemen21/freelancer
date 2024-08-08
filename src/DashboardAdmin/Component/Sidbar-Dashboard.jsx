/*eslint-disable*/
import React ,{useState} from "react";
import { FaBlog, FaBlogger, FaComment, FaCreativeCommonsSampling, FaFileContract, FaGavel, FaHeadset, FaHome, FaMoneyBill, FaNewspaper, FaProjectDiagram,  FaTasks, FaTimesCircle, FaUndo, FaUndoAlt, FaUser, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import UserImage from "../../assets/person.webp";
import Routedashboard from "../Layout-Dashboard/Admin/Route-dashboard"
import Dropdown from "./DropDown";
import Navbar from "./Navbar-Dashboard";
import UserDropdown from "./UserDropdown";
import Tableuser from "../Layout-Dashboard/Admin/View/Tableuser";
import UserPermission from "../Layout-Dashboard/Admin/View/UserPermissions";
import UserBlock from "../Layout-Dashboard/Admin/View/UserBlock";
import SkillsUSer from "../Layout-Dashboard/Admin/View/SkillUser";
import VerifyUser from "../Layout-Dashboard/Admin/View/VerifyUsers";
import RegRequest from "../Layout-Dashboard/Admin/View/registrationRequest";
// import EditeUser from "./operation/EditeUser";
import WithdrawalsHistory from "../Layout-Dashboard/Admin/View/Withdrawals/Withdrawal";
import GigProject from "../Layout-Dashboard/Admin/View/GigProject/GigProject";
import Services from "../Layout-Dashboard/Admin/View/ServicesUsers/Services";
import PublishService from "../Layout-Dashboard/Admin/View/ServicesUsers/PublishService";
import { OfferList } from "../Layout-Dashboard/Admin/View/ServicesUsers/OfferListService";
import OffersProject from "../Layout-Dashboard/Admin/View/GigProject/OffersProject";
import CategorySevice from "../Layout-Dashboard/Admin/View/ServicesUsers/CategoryService";

import DisputeCard from './../Layout-Dashboard/Admin/View/Dispute/Dispute';
import ChatOverview from './../Layout-Dashboard/Admin/View/ChatConversation/Conversation';
import ContractServices from "../Layout-Dashboard/Admin/View/Contract/ContractServices";
import ContractProject from "../Layout-Dashboard/Admin/View/Contract/ContractProject";
import Refund from './../Layout-Dashboard/Admin/View/RefundRequests/Refund';
import PaymentManagement from "../Layout-Dashboard/Admin/View/PaymentManagement/PaymentManagement";
import UserProfile from "../Layout-Dashboard/Admin/View/UsersProfile";

export default function Sidebar_Dashboard(){

            
       
  const [collapseShow, setCollapseShow] = useState("hidden");

  const dropdownDataUSer = [
    { label: "جميع المستخدمين", href: "/admin/dashboard/show-user" },
    { label: "   طلبات التسجيل", href: "/admin/dashboard/registration-requests" },
    { label: "صلاحيات المستخدمين", href: "/admin/dashboard/user-permissions" },
    { label: " المستخدمين المحظورين ", href: "/admin/dashboard/user-block" },
    { label: "تحقق من هوية ", href: "/admin/dashboard/Verify-users" },
    { label: "بروفايل المستخدمين", href: "/admin/dashboard/users-profile" },
    { label: "مهارات المستخدمين", href: "/admin/dashboard/skills-user" },

  ];

  const dropdownDataProject= [
    { label: "جميع المشاريع", href: "/admin/dashboard/gigs" },
    { label: "العروض على المشاريع ", href: "/admin/dashboard/Offers-Project" },
  
  ];
  const dropdownService= [
    { label: "جميع الخدمات", href: "/admin/dashboard/services" },
    { label: "فئات الخدمات ", href: "/admin/dashboard/Category-Sevice" },
    { label: "طلبات نشر الخدمات", href: "/admin/dashboard/PublishService" },
    { label: "  العروض على الخدمات", href: "/admin/dashboard/OfferService" },

 
  ];
  const dropdownWithdrawals= [
    { label: "  'طلب سحب'", href: "/admin/dashboard/withdrawal" },
   
  ];

  const dropdownContracts= [
    { label: "  عقود الخدمات", href:"/admin/dashboard/Contract-services" },
    { label: " عقود المشاريع", href:"/admin/dashboard/Contract-project" },
  
  ];
  const dropdownRefunds= [
    { label: "استرداد الاموال ", href: "/admin/dashboard/Refund" },
   
    // { label: "تحقق من المستخدمين", href: "/#" },
    // { label: "بروفايل المستخدمين", href: "/#" },
  ];
  const dropdownReviews= [
    { label: " مراجعات العملاء ", href: "/#" },
   
   
  ];
    const dropdownReports= [
    { label: "  بلاغ العميل", href: "/admin/dashboard/dispute" },
    // { label: "  بلاغ مستقل", href: "/#" },

  ];
  const dropdownConversions= [
    { label: " المحادثات", href: "/admin/dashboard/Conversation" },
  ];
  const dropdownBlogs= [
    { label: " تصفح المقالات ", href: "/#" },
    { label: "  طلب نشر مقال ", href: "/#" },
  ];
  const dropdownSupport= [
    { label: " الرسائل  ", href: "/#" },
    { label: "  طلب نشر مقال ", href: "/#" },
  ];
  const dropdownNews= [
    { label: " تصفح الاخبار   ", href: "/#" },
    { label: "  طلب نشر مقال ", href: "/#" },
  ];
  const dropdownPages= [
    { label: " تصفح صفحات الموقع   ", href: "/#" },
    { label: "  طلب نشر مقال ", href: "/#" },
  ];
  const dropdownPayments= [
    { label: "   paypal   ", href: "/admin/dashboard/Payment" },
    { label: "  خدمة محلية", href: "/#" },
  ];

  
  
  return (
    <>
   <div className="flex flex-col md:flex-row ">
   <nav className="border-2 md:flex-row md:flex-nowrap shadow-xl  flex flex-wrap items-center justify-between relative w-full md:w-1/3 lg:w-1/4 z-10 py-2 px-4">
   {/* <nav className="w-full pr-4 md:w-1/4 bg-white md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl "> */}
{/* <nav> */}
      {/* <nav className=" md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"> */}
     

       <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
        
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars">
                <FaUser/>
            </i>
          </button>
          {/* Brand */}
          <NavLink
            // className="md:block text-center md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            
          </NavLink>
          {/* User */}
          <div className=" mt-4 flex  justify-center">
          <span className="w-32 h-32 hidden md:block text-white bg-blueGray-200  rounded-full">
            <img
              alt="..."
              className="w-full rounded-full border-none shadow-md"
              src={UserImage}
            />
           
          </span>
        </div>
        <span className="block text-center mt-2 text-2xl"> مرحبا بك </span>

          <ul className="md:hidden items-center flex gap-4 flex-wrap list-none">
            <li className="">
            <UserDropdown/>
            
            </li>
            <li className="">
                <UserDropdown/>
              {/* <UserDropdown /> */}
           
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4  border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <NavLink
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    لوحة التحكم
                  </NavLink>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    {/* <i className="fas fa-times"></i> */}
                    <FaTimesCircle/>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="md:my-1 my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-red-700 text-md uppercase font-bold block pt-1 pb-4 no-underline">
            لوحة التحكم
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center py-3 hover:bg-slate-100   mt-4 mb-4">
                {/* <NavLink
                  className={
                    " text-md uppercase   font-bold block " +
                    (window.location.href.indexOf("/admin/dashboard") !== -1
                      ? "text-lightBlue-500 hover:text-blue-600"
                      : "text-blueGray-700 hover:text-green-500")
                  }
                  to="/admin/dashboard"
                > */}
                    
                    <FaHome className="inline-block ml-2" size={25} color="black"/>
                 الرئيسية
                {/* </NavLink> */}
                {/* <Dropdown/> */}

              </li>
              <li className="items-center  hover:bg-slate-100   mb-4">
              
            
                <Dropdown data={dropdownDataUSer } title="إدارة المستخدمين" icon={<FaUsers className="inline-block ml-2" size={25} color="black"/>} />

                
              

            </li>
             

              <li className=" hover:bg-slate-100 mb-4">
              
                {/* <NavLink
                  className={
                    "text-md   font-bold  " +
                    (window.location.href.indexOf("/admin/settings") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/settings"
                > */}
                  <i
                    // className={
                    //   " mr-2 text-md " +
                    //   (window.location.href.indexOf("/admin/settings") !== -1
                    //     ? "opacity-75"
                    //     : "text-blueGray-300")
                    // }
                  ></i>{" "}
                
                  {/* </NavLink>  */}
                  
                <Dropdown data={dropdownDataProject } title="إدارة المشاريع" icon={<FaProjectDiagram className="inline-block ml-2" size={25} color="black"/>} />
                

              </li>

              <li className="items-center  mb-4">
                {/* <NavLink
                  className={
                    "text-xs uppercase font-bold block " +
                    (window.location.href.indexOf("/admin/tables") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/tables"
                > */}
                  <i
                    // className={
                    //   "fas fa-table mr-2 text-sm " +
                    //   (window.location.href.indexOf("/admin/tables") !== -1
                    //     ? "opacity-75"
                    //     : "text-blueGray-300")
                    // }
                  ></i>{" "}
                  {/* إدارة الخدمات  */}
                {/* </NavLink> */}
                <Dropdown data={dropdownService } title="إدارة الخدمات" icon={<FaTasks className="inline-block ml-2" size={25} color="black"/>} />

                
              </li>
              <li className="items-center   mb-4">
                {/* <NavLink
                  className={
                    "text-md uppercase font-bold block " +
                    (window.location.href.indexOf("/admin/maps") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/maps"
                > */}
                  <i
                    // className={
                    //   "fas fa-map-marked mr-2 text-md " +
                    //   (window.location.href.indexOf("/admin/maps") !== -1
                    //     ? "opacity-75"
                    //     : "text-blueGray-300")
                    // }
                  ></i>{" "}
                 
                {/* </NavLink> */}
                <Dropdown data={dropdownReviews} title="إدارة  المراجعات"  icon={<FaComment className="inline-block ml-2" size={25} color="black"/>}/>

                
              </li>
              <li className="items-center  mb-4">
                {/* <NavLink
                  className={
                    "text-md uppercase font-bold block " +
                    (window.location.href.indexOf("/admin/maps") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/maps"
                > */}
                  <i
                    // className={
                    //   "fas fa-map-marked mr-2 text-md " +
                    //   (window.location.href.indexOf("/admin/maps") !== -1
                    //     ? "opacity-75"
                    //     : "text-blueGray-300")
                    // }
                  ></i>{" "}
                 
                {/* </NavLink> */}
                <Dropdown data={dropdownReports } title="إدارة  النزاعات" icon={<FaGavel className="inline-block ml-2" size={25} color="black"/>} />

                
              </li>


              <li className="items-center place-items-center  mb-4">
              
                  <i
                   
                  ></i>{" "}
                 
               
                <Dropdown data={dropdownConversions } title="إدارة  المحادثات" icon={<FaCreativeCommonsSampling className="inline-block ml-2" size={25} color="black"/>} />

                
              </li>





              {/* <li className="items-center">
                <NavLink
                  className={
                    "text-md uppercase font-bold block " +
                    (window.location.href.indexOf("/admin/maps") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/maps"
                >
                  <i
                    className={
                      "fas fa-map-marked mr-2 text-md " +
                      (window.location.href.indexOf("/admin/maps") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                 
                </NavLink>
                <Dropdown data={dropdownNews } title="إدارة الاخبار " icon={<FaNewspaper className="inline-block ml-2" size={25} color="black"/>}/>

                
              </li> */}

              
              {/* <li className="items-center">
                <NavLink
                  className={
                    "text-md uppercase  font-bold block " +
                    (window.location.href.indexOf("/admin/maps") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/maps"
                >
                  <i
                    className={
                      "fas fa-map-marked mr-2 text-md " +
                      (window.location.href.indexOf("/admin/maps") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                 
                </NavLink>
                <Dropdown data={dropdownBlogs } title="إدارة المجتمع  " icon={<FaBlogger className="inline-block ml-2" size={25} color="black"/>}/>

                
              </li> */}

              {/* <li className="items-center">
                <NavLink
                  className={
                    "text-md uppercase font-bold block " +
                    (window.location.href.indexOf("/admin/maps") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/maps"
                >
                  <i
                    className={
                      "fas fa-map-marked mr-2 text-md " +
                      (window.location.href.indexOf("/admin/maps") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                 
                </NavLink>
                <Dropdown data={dropdownSupport } title="الدعم الفني  " icon={<FaHeadset className="inline-block ml-2" size={25} color="black"/>}  />

                
              </li> */}


              <li className="items-center mb-4">
                
                  <i
                   
                  ></i>{" "}
                 
              
                <Dropdown data={dropdownContracts } title="إدارة العقود " icon={<FaFileContract className="inline-block ml-2" size={25} color="black"/>}/>

                
              </li>



              <li className="items-center mb-4">
                {/* <NavLink
                  className={
                    "text-md uppercase font-bold block " +
                    (window.location.href.indexOf("/admin/maps") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/maps"
                > */}
                  <i
                    // className={
                    //   "fas fa-map-marked mr-2 text-md " +
                    //   (window.location.href.indexOf("/admin/maps") !== -1
                    //     ? "opacity-75"
                    //     : "text-blueGray-300")
                    // }
                  ></i>{" "}
                 
                {/* </NavLink> */}
                <Dropdown data={dropdownWithdrawals } title="إدارة السحب الاموال  " icon={<FaMoneyBill className="inline-block ml-2" size={25} color="black"/>}  />

                
              </li>



              <li className="items-center mb-4">
                {/* <NavLink
                  className={
                    "text-md uppercase  font-bold block " +
                    (window.location.href.indexOf("/admin/maps") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/maps"
                > */}
                  <i
                    // className={
                    //   "fas fa-map-marked mr-2 text-md " +
                    //   (window.location.href.indexOf("/admin/maps") !== -1
                    //     ? "opacity-75"
                    //     : "text-blueGray-300")
                    // }
                  ></i>{" "}
                 
                {/* </NavLink> */}
                <Dropdown data={dropdownPayments } title="إدارة المدفوعات " icon={<FaMoneyBill className="inline-block ml-2" size={25} color="black"/>}/>

                
              </li>



             



              <li className="items-center mb-4">
                {/* <NavLink
                  className={
                    "text-md uppercase  font-bold block " +
                    (window.location.href.indexOf("/admin/maps") !== -1
                      ? "text-lightBlue-500 hover:text-lightBlue-600"
                      : "text-blueGray-700 hover:text-blueGray-500")
                  }
                  to="/admin/maps"
                > */}
                  <i
                    // className={
                    //   "fas fa-map-marked mr-2 text-md " +
                    //   (window.location.href.indexOf("/admin/maps") !== -1
                    //     ? "opacity-75"
                    //     : "text-blueGray-300")
                    // }
                  ></i>{" "}
                 
                {/* </NavLink> */}
                <Dropdown data={dropdownRefunds } title="إدارة الاسترجاع الاموال" icon={<FaUndo className="inline-block ml-2" size={25} color="black"/>} />

                
              </li>

            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Auth Layout Pages
            </h6>
            {/* Navigation */}

           

            {/* Divider */}
           
          
          </div>
        </div>
      </nav>
      <div className=" flex flex-col w-full  ">
          <div className="mb-2 h-fit    shadow-lg bg-white">
        <Navbar/>
    </div>
    <div>
<Routes>    
{/*         <Route path="/admin/dashboard/" exact element={<Home/>} /> */}
             <Route path="/admin/dashboard/show-user" exact element={<Tableuser/>} />
             <Route path="/admin/dashboard/user-permissions" exact element={<UserPermission/>} />
             <Route path="/admin/dashboard/registration-requests" exact element={<RegRequest/>} />
             <Route path="/admin/dashboard/user-block" exact element={<UserBlock/>} />
             <Route path="/admin/dashboard/Verify-users" exact element={<VerifyUser/>} />
             <Route path="/admin/dashboard/UserProfile" exact element={<UserProfile/>} />
             <Route path="/admin/dashboard/skills-user" exact element={<SkillsUSer/>} /> 
             {/* <Route path="/admin/dashboard/edite-user" exact element={<EditeUser/>} />  */}
             <Route path="/admin/dashboard/withdrawal" exact element={<WithdrawalsHistory/>} />
             <Route path="/admin/dashboard/gigs" exact element={<GigProject/>} />
             <Route path="/admin/dashboard/services" exact element={<Services/>} />
             <Route path="/admin/dashboard/PublishService" exact element={<PublishService/>} />
           
             <Route path="/admin/dashboard/OfferService" exact element={  <OfferList/>} />
              <Route path="/admin/dashboard/Offers-Project" exact element={  <OffersProject/>} />
              <Route path="/admin/dashboard/Category-Sevice" exact element={  <CategorySevice/>} />
              <Route path="/admin/dashboard/dispute" exact element={  <DisputeCard/>} />
              <Route path="/admin/dashboard/Conversation" exact element={  <ChatOverview/>} />
              <Route path="/admin/dashboard/Contract-services" exact element={  <ContractServices/>} />
              <Route path="/admin/dashboard/Contract-project" exact element={  <ContractProject/>} />
              <Route path="/admin/dashboard/Refund" exact element={  <Refund/>} />
              <Route path="/admin/dashboard/Payment" exact element={  <PaymentManagement/>} />



              

             
             

             


             
             


          

    </Routes>
    </div>
   
  
      </div>
   
    </div>
  
        
       
   
    
   {/* </div> */}
     
    </>
  );
  
}
