import React, { useEffect, useState, useRef } from "react";
import ImageService from "../assets/service1.webp";

import Messanger from "../Chat/Messanger";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Nav from "./Nav";
import {
  FaStar,
  FaPhone,
  FaEye,
  FaPersonBooth,
  FaTimes,
  FaUserTimes,
} from "react-icons/fa";
import { FiPaperclip, FiSend } from "react-icons/fi";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "../axios/axios";
import { useAuth } from "../contexts/AuthContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
// import axios from './../axios/axios';

export default function DetailsService() {
  const { id } = useParams();
 
  const { user, csrfToken } = useAuth();
  const [services, setService] = useState([]);
  const [calculateOverallScore, setCalculateOverallScore] = useState();
  const [orders, setOrders] = useState("");
  const [createOrder, setCreateOrder] = useState([]);
  const [salesService, setSalesService] = useState();
  const [newMessage, setNewMessage] = useState([]);
  //   const [serviceStatus, SetserviceStatus] = useState('');
  const [timeRemaining, setTimeRemaining] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [approveOrRejectOrder, setApproveOrRejectOrder] = useState("");

  const [eventOrder, setEventOrder] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [getuser, setGetUser] = useState([]);

  const [eventOrdershow, setEventOrdershow] = useState(false);

  const [conversation, setConversations] = useState([]);
  const [chatAboutOrder, setChatAboutOrder] = useState([]);
  const [DoRequest, setDoRequest] = useState(false);
  const navigate = useNavigate();
  const [issue, setIssue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [causeMessage, setcauseMessage] = useState("");
  const [file, setFile] = useState(null);
  const [previewFile, setFilePreview] = useState(null);
  const [serviceStatus, setServiceStatus] = useState("pending");
  const [isReporting, setIsReporting] = useState(false);
  const [disputes, setDisputes] = useState([]);
  const [sellerIDOrder, setSellerIDOrder] = useState('');
  
  
  const [deliveryDateService, setDeliveryDate] = useState("2020-10-10");
  var AllMessage = [];
  // const chatAreaRef = useRef(null);
  // useEffect(() => {
  //   if (chatAreaRef.current) {
  //     chatAreaRef.current.scrollTo({
  //       top: chatAreaRef.current.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [chatAboutOrder]);

  // useEffect(() => {
  //   window.Echo = new Echo({
  //     broadcaster: "pusher",
  //     key: "ad6755871b55733e71f4",
  //     cluster: "ap2",

  //     authEndpoint: "http://127.0.0.1:8000/api/pusher/auth",
  //     authorizer: (channel, options) => {
  //       return {
  //         authorize: (socketId, callback) => {
  //           axios
  //             .post(
  //               "pusher/auth",
  //               {
  //                 socket_id: socketId,
  //                 channel_name: channel.name,
  //               }
  //               // { csrfToken }
  //             )
  //             .then((response) => {
  //               callback(false, response.data);
  //             })
  //             .catch((error) => {
  //               callback(true, error);
  //             });
  //         },
  //       };
  //     },
  //   });
  // }, []);
  useEffect(()=>{

    const fetchServices = async () => {
      
      const response = await axios.get(`/service/${id}`);
      const data = response.data.service;
      setService(data);

     
     
    };
    fetchServices();
  },[])
  useEffect(()=>{

      const fetchRatingUser = async () => {
    
     
    const response = await axios.get(`/get/${services.user_id}/rating`);
    const data =(await response.data.overall_score);


   
    setCalculateOverallScore(data);


   
  };
  fetchRatingUser();
  },[])

  useEffect(()=>{

    const FetchUser = async () => {
      // console.log(services);
      const response = await axios.get(`/users/${services?.user_id}`);
      const data =await response.data;
      setGetUser(data);
      // console.log(data);
    };
    FetchUser();

  },[services.user_id])
  useEffect(()=>{

  

    async function fetchSalesData() {
      try {
        const response = await axios.get("/contracts/getServiceAsCompleted", {
          serviceID: services.id,
        });
        setSalesService(response.data);
      
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    }


 
  
    fetchSalesData();
  },[])

 
  const CreateConversion = async (e) => {
    e.preventDefault();
    // const response = await axios.post("/create-conversion", {
    //   // sender: user.id,
    //   // recevier: services.user_id,
    // });
    // const conversation = response.data;
    // console.log(conversation);
    navigate(`/chat/${1}`);
  };

  const createOrderService = async (e) => {
    e.preventDefault();
    // price=200;
    try {
      // const response = await axios.post(`/create/order`, {
      //   seller_id: services.user_id,
      //   service_id: services.id,
      //   amount: services.price,
      // });
      // const data = response.data;
      // setCreateOrder(response.data);
  
      // navigate(`/order/${createOrder.contract.id}`);
      // navigate(`/payment-gateway/${createOrder.contract.id}`);
      navigate('/payment-gateway/', { state: { serviceId: services.id ,sellerID:services.user_id, price: services.price, buyerID:user?.id} });
      
 
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (!services) {
    return <div>Loading...</div>;
  }

  dayjs.extend(relativeTime); // Extend dayjs with the relativeTime plugin
  dayjs.locale("ar"); // Set the locale to Arabic

  const timeAgo = dayjs(services.created_at).fromNow();
  // const futureDate = dayjs(services.delivery_time).add( 'day').fromNow();
  const today = dayjs();
  const deliveryDate = dayjs(services.delivery_time);
  const numberOfDays = deliveryDate.diff(today, "day");

  return (
    <>
      <section className=" font-arabic p-2 m-auto bg-gray-100">

        <>
          <div
            key={services.id}
            className="bg-white  items-center shadow-lg  border-2"
          >
            <div className="text-right   mb-6 border-b-8 p-4 w-full mx-auto  ">
              <p className="text-lg mb-2   p-2">{services.title}</p>
              <figcaption className="flex justify-between mr-2 ">
                <div className="flex justify-around   mt-2">
                  <img
                    className="rounded-full w-9 h-9"
                    src={ImageService}
                    // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                    alt="profile picture"
                  />
                  <div className="  flex flex-col font-medium items-start gap-2  mr-2 text-left rtl:text-right ">
                    <div>
                     
                      <NavLink to={`/user-profile/${getuser.id}`}> {getuser.firstName} </NavLink>
                     
                    </div>
                    <div className="text-[10px] text-gray-500  ">
                      <FaUserTimes className="inline-block text-sm" /> مدة
                      التسليم <span> {services.delivery_time} </span>{" "}
                    </div>
                  </div>
                </div>

                <div className=" px-2 mt-2  rounded-md text-sm text-gray-500  font-semibold ">
                  {services.category && <>{services.category.name}</>}
                </div>
              </figcaption>
            </div>
            <div className=" m-2 flex flex-col sm:flex-row bg-gray-100  justify-around ">
              <div className="md:w-[65%] w-full bg-white ">
                <div className=" w-full md:w-[100%] border-2 h-fit block ">
                  <img
                    src={"http://localhost:8000/" + services.image}
                    alt=""
                    className="h-fit p-2"
                  />
                </div>    <div className=" bg-white ">
                    <p className="text-xl   m-2 mt-2 w-full   p-2">
                      وصف الخدمة
                    </p>
                    <p className="mr-3 p-2  w-full ">{services.description}</p>
                  </div>
                
              </div>

              <div className=" w-full  sm:w-1/2 sm:px-6 px-4 bg-white ">
                <div id="detailed-pricing" className=" shadow-lg h-fit">
                  <p className="text-lg border-2 border-gray-700 font-extrabold p-2">
                    بطاقة معلومات المشروع
                  </p>
                  <div className=" ">
                    <div className="flex px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                      <div className="text-black font-bold w-1/2 ">
                        سعر الخدمة
                      </div>
                      <div>{services.price}$</div>
                    </div>

                   
                    <div className="flex px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                      <div className="text-black font-bold w-1/2 ">
                        تاريخ النشر{" "}
                      </div>
                      <div>{timeAgo}</div>
                    </div>
                    <div className="flex px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                      <div className="text-black font-bold w-1/2 ">
                        مدة التنفيذ
                      </div>
                      <div>
                    
                        {-numberOfDays}
                      </div>
                    </div>
                    <div className="flex px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                      <div className="text-black font-bold w-1/2 ">
                        عدد الخدمات المباعة منها
                      </div>
                      <div>({salesService})</div>
                    </div>
                    <div className=" flex px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                      <div className="text-black font-bold w-1/2 ">
                        تقييم البائع
                      </div>
                      <div> {calculateOverallScore  }<FaStar className="text-yellow-300 inline mb-1 mr-1 text-center" size={15}/> </div>
                    </div>
                  </div>
                </div>
                {
                  user?.id !== services.user_id && (
                    <form action="">
                      <button
                        type="button"
                        onClick={createOrderService}
                        className=" text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center mt-6 w-full me-2 mb-2"
                      >
                        شراء الخدمة
                      </button>
                    </form>
                  )}

                <div className="  w-full flex    items-center justify-between    p-4 mt-2  shadow-lg ">
                  <div className="flex items-center justify-between w-full  ">
                    <div className="flex flex-row">
                      <div>
                        <img
                          className="w-8 h-8 rounded-full"
                          // src={ImageService}
                          src={"http://localhost:8000/" + getuser.image}
                          alt="Neil image"
                        />
                      </div>
                      <div className="">
                        <p className="text-sm mr-2 font-medium text-gray-900 truncate ">
                          {getuser.firstName}
                        </p>
                        <p className="text-sm mr-2 text-gray-500 truncate ">
                          {getuser.Specialization}
                        </p>
                      </div>
                    </div>

                    <div>
                      {user?.id !== services.user_id && (
                        <>
                          <div className=" text-white p-2  bg-green-500 hover:bg-green-400 border-2 rounded-lg text-sm  border-gray-200 ">
                            <button onClick={CreateConversion}>
                              تواصل مع بائع الخدمة
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </section>
    </>
  );
}
