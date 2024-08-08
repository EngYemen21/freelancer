import React, { useEffect, useState, useRef } from "react";
import ImageService from "../assets/service1.webp";

import Messanger from "../Chat/Messanger";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Nav from "./Nav";
import moment from "moment";
import "moment/locale/ar";
import {
  FaStar,
  FaPhone,
  FaEye,
  FaPersonBooth,
  FaTimes,
  FaUserTimes,
} from "react-icons/fa";
import { FiPaperclip, FiSend } from "react-icons/fi";
import { NavLink, useParams, useNavigate ,useLocation} from "react-router-dom";
import axios from "../axios/axios";
import { useAuth } from "../contexts/AuthContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import AddRating from "../Panel_Users/Ratings/AddRating";
import TimeRemainingOfServices from "../Panel_Users/TimeRemainingOfServices/TimeRemainingOfServices";
// import axios from './../axios/axios';

export default function OrderServiceMangment() {
  const { id } = useParams();
  const location =useLocation();
  // const id= location.state ? location.state.id : null;
  const chat=location.state ? location.state.chat : null;

  const { user, csrfToken } = useAuth();
  const [services, setService] = useState([]);
  const [calculateOverallScore, setCalculateOverallScore] = useState([]);
  const [orders, setOrders] = useState("");
  const [salesService, setSalesService] = useState();
  const [newMessage, setNewMessage] = useState([]);
  const [approveOrRejectOrder, setApproveOrRejectOrder] = useState("");

  const [eventOrder, setEventOrder] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [getuser, setGetUser] = useState([]);
  const [DoRequest, setDoRequest] = useState(false);
  const [addRatingShow, setAddRatingShow] = useState(false);
  const navigate = useNavigate();
  const [issue, setIssue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [causeMessage, setcauseMessage] = useState("");
  const [file, setFile] = useState(null);
  const [previewFile, setFilePreview] = useState(null);
  const [isReporting, setIsReporting] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [chatAboutOrder, setChatAboutOrder] = useState([]);

  const chatAreaRef = useRef(null);
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatAboutOrder]);

  // console.log(id)

  useEffect(() => {
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "ad6755871b55733e71f4",
      cluster: "ap2",

      authEndpoint: "http://127.0.0.1:8000/api/pusher/auth",
      authorizer: (channel, options) => {
        return {
          authorize: (socketId, callback) => {
            axios
              .post(
                "pusher/auth",
                {
                  socket_id: socketId,
                  channel_name: channel.name,
                }
                // { csrfToken }
              )
              .then((response) => {
                callback(false, response.data);
              })
              .catch((error) => {
                callback(true, error);
              });
          },
        };
      },
    });
  }, []);

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        // console.log("jehjdehjdhj",id)
        setIsLoading(true);
        const response = await axios.get(`/contracts/${id}/contracts`);
        const data = response.data;
        setContracts(response.data);
        // console.log("contracts", response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching contract data:", error);
      }
    };

    fetchContractData();
  }, []);
  // console.log(contracts[0].service_id)
  useEffect(() => {
    const fetchServices = async () => {
      const response = await axios.get(`/service/${contracts[0].service_id}`);
      const data = response.data.service;
      const calculateOverallScore = response.data.calculateOverallScore;
      setCalculateOverallScore(calculateOverallScore);
      // console.log(response)

      setService(data);
    };
    fetchServices();
  }, [contracts[0]?.service_id]);

  useEffect(() => {
    const FetchUser = async () => {
      const response = await axios.get(`/users/${contracts[0].freelancer_id}`);
      const data = response.data;
      // console.log(response.data)
      setGetUser(data);
    };
    FetchUser();
  }, [contracts[0]?.freelancer_id]);
  useEffect(() => {
    async function fetchSalesData() {
      try {
        const response = await axios.get("/contracts/getServiceAsCompleted", {
          serviceID: contracts[0].service_id,
        });
        setSalesService(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    }

    fetchSalesData();
  }, [contracts]);

  useEffect(() => {
    const fetchMessages = async () => {
      console.log(chat)
      if (chat.id) {
        try {
          const response = await axios.get(`/conversationes/${chat.id}/messages`);
          setChatAboutOrder(response.data);  
          // console.log(response.data)
         
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      }
    };
    // console.log(projectId)
   
    fetchMessages();
  
  },); 
  // useEffect(() => {

  //   window.Echo.private(
  //     `private-ChatAboutOrder.${chat?.user1_id}`
  //   ).listen("ChatOrderEvent", (data) => {
  //     console.log("ChatOrderEvent: ", data);
  //   });

  //   window.Echo.private(`private-ChatAboutOrder.${chat?.user2_id}`).listen(
  //     "ChatOrderEvent",
  //     (data) => {
  //       setChatAboutOrder((prevMessages) => [...prevMessages, data]);
  //       // console.log("ChatOrderEvent: ", data);
  //     }
  //   );

  // }, [chat.user1_id, chat.user2_id]);

  useEffect(() => {
    window.Echo.private(`private-events.${user.id}`).listen(
      "EventService",
      (data) => {
        setEventOrder(data);
        // console.log(data);
      }
    );
    // console.log(orders.seller_id, orders.buyer_id);

    window.Echo.private(
      `private-eventForApproveOrRejectOrder.${orders.freelancer_id}`
    ).listen("EventForApproveOrRejectOrder", (data) => {
      console.log("hhhhjj", data);
      setApproveOrRejectOrder(data);

      console.log("causeMessage: ", approveOrRejectOrder);
    });
    return () => {
      window.Echo.private(
        `private-eventForApproveOrRejectOrder.${orders.client_id}`
      ).stopListening("EventForApproveOrRejectOrder");
    };
  }, [orders.freelancer_id, orders.client_id]);

  const CreateConversion = async (e) => {
    e.preventDefault();
    const response = await axios.post("/create-conversion", {
      sender: user.id,
      recevier: services.user_id,
    });
    const conversation = response.data;
    console.log(conversation);
    navigate(`/chat/${conversation.id}`);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
    // console.log("file", file);
  };
  const handleSendMessage = async () => {
    // if (message.trim() || attachment) {
    //   const formData = new FormData();
    //   formData.append('chat_id', chat.id);
    //   // formData.append('user_id', ); // استبدل بـ user_id الفعلي
    //   formData.append('message', message);
    //   if (attachment) {
    //     formData.append('attachment', attachment);
    //   }
    //   console.log(chat.id)
      try {
        // user1_id: 4, user2_id: 20,
        const userId = user.id === chat.user1_id ? chat.user1_id : chat.user2_id;
        // console.log(userId);
        const response = await axios.post(`/conversationes/${chat.id}/messages`, {
          user_id: userId, 
          content: newMessage,
        });
        // const message = response.data;
        // console.log(response)
        // setMessages((prevMessages) => [...prevMessages, message]);
        // setNewMessage(""); // Clear the message input after sending
      } catch (error) {
        console.error("Error sending message:", error);
      }

      // try {
      //   const response = await axios.post('/messages-project', formData);
      //   // console.log(response.data)
      //   // console.log(response)
      //   // setMessages([...messages, response.data.message]);
        
      //   setMessage('');
      //   setAttachment(null);
      //   setIsMessageSent(false);
      // } catch (error) {
      //   console.error('Error sending message:', error);
      // }
    // }
  };
  // const handleSendMessage = async () => {
  //   // console.log(services.id);
  //   const response = await axios.post("/store-message-contract", {
  //     newMessage: newMessage,
  //     client: orders.client_id,
  //     Freelancer_id: services.user_id,
  //     serviceID: services.id,
  //     file: file,
  //     type: "EventChat",
  //   });
  //   const data = response.data;

  //   console.log("handleSendMessageContract :", data.data.message);
  // };

  // const fetchOrders = async () => {
  //   try {
  //     const response = await axios.get("/orders");
  //     setOrders(response.data);
  //   } catch (error) {
  //     console.error("Error fetching orders:", error);
  //   }
  // };

  const updateOrder = async (e, status) => {
    // setApproveOrRejectOrder("");

    e.preventDefault();
    try {
      if (status === "in_progress") {
        const response = await axios.post(`/sendOrder`, {
          contractID:contracts[0].id,
          freelancer_id: services.user_id,
          status,
        });
        const data = response.data;
        console.log(data);
      } else if (status === "completed") {
        const response = await axios.post(`/sendOrder`, {
          contractID:contracts[0].id,
          freelancer_id: services.user_id,
          status,
        });
        const data = response.data;
        console.log(data);
      } else if (status === "cancelled") {
        setDoRequest(true);
        // setcauseMessage(e.target.value);
        const response = await axios.post(`/sendOrder`, {
          contractID:contracts[0].id,

          freelancer_id: services.user_id,
          status,
          causeMessage,
        });
        const data = response.data;
        console.log(data);
        // setDoRequest(false)
      } else {
        // const response = await axios.post(`/orders/${id}`, {
        //   orderID: orders.id,
        //   seller_id: services.user_id,
        //   service_id: services.id,
        //   status,
        // });
        // const UpdateStatus = response.data;
        // console.log(UpdateStatus);
        // setOrders(UpdateStatus);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  const updateStateOrder = async (e, status) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/contracts/${id}`, {
        contractID:contracts[0].id,
        freelancer_id: services.user_id,
        service_id: services.id,
        status,
        payment_id: contracts[0].payment_id,
      });
      const UpdateStatus = response.data;
      setShowPopup(!showPopup);

      console.log(UpdateStatus);

      setOrders(UpdateStatus);
      setApproveOrRejectOrder("");
      // }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Delete an order
  // const deleteOrder = async (orderId) => {
  //   try {
  //     await axios.delete(`/orders/${orderId}/delete`);
  //     const updatedOrders = orders.filter((order) => order.id !== orderId);
  //     setOrders(updatedOrders);
  //     console.log("setOrders", orders);
  //   } catch (error) {
  //     console.error("Error deleting order:", error);
  //   }
  // };
  // const createOrderService = async (e) => {
  //   e.preventDefault();
  //   // price=200;
  //   try {
  //     const response = await axios.post(`/create/order`, {
  //       seller_id: services.user_id,
  //       service_id: services.id,
  //       amount: 250,
  //       contractID:contracts[0].id,
  //     });
  //     const data = response.data;
  //   //   navigate(`/order/${conversation.id}`);
  //     setCreateOrder(response.data);
  //     navigate(`/payment-gateway/${createOrder.id}`);
  //     console.log("createOrder.createOrder", createOrder);
  //   } catch (error) {
  //     console.error("Error creating order:", error);
  //   }
  // };
  // console.log("createOrder.createOrder", createOrder);

  const formatDateTime = (dateTime) => {
    return moment(dateTime).locale("ar").fromNow();
  };
  const TimeRemaining = ({ startDate, endDate }) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const duration = moment.duration(end.diff(start));

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return (
      <div>
        <p>
          {days} أيام، {hours} ساعات، {minutes} دقائق، {seconds} ثواني
        </p>
      </div>
    );
  };

  const addRatingHandle = () => {
    setAddRatingShow(!addRatingShow);
    setIsOpen(!isOpen);
  };
  const closeRatingShow = () => {
    setAddRatingShow(!addRatingShow);
  };
  const isOpenHendle = () => {
    setIsOpen(!isOpen);
  };
  const toggleReporting = () => {
    setIsReporting(!isReporting);
  };
  const handleReportProblem = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("/disputes", {
        issue,
        client_id:chat.user1_id,
        freelancer_id: chat.user2_id,
      });

      setIssue("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  dayjs.extend(relativeTime); // Extend dayjs with the relativeTime plugin
  dayjs.locale("ar"); // Set the locale to Arabic

  const timeAgo = dayjs(services.created_at).fromNow();
  // const futureDate = dayjs(services.delivery_time).add( 'day').fromNow();
  const today = dayjs();
  const deliveryDate = dayjs(services.delivery_time);
  const numberOfDays = deliveryDate.diff(today, "day");

  return (
    <>
      <section className=" p-2 m-auto bg-gray-100">
        {/* ${approveOrRejectOrder.code } */}
        <div className="code-container">
          {showPopup &&
            approveOrRejectOrder?.status == "in_progress" &&
            user.id ==chat.user1_id && (
              <>
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                      <h2 className="text-md  mb-4">
                        تأكيد ارسال طلب لتنفيذ الخدمة
                      </h2>
                      {/* <p>A new order request has been made. Do you want to approve or reject it?</p> */}
                      <div className="flex justify-end mt-4">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-12"
                          // onClick={handleApprove}
                          onClick={(e) => updateStateOrder(e, "in_progress")}
                        >
                          قبول
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          // onClick={handleReject}
                          onClick={(e) => updateStateOrder(e, "cancelled")}
                        >
                          رفض
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* مرحبا */}
              </>
            )}
        </div>

        <div className="code-container">
          {showPopup &&
            approveOrRejectOrder?.status == "completed" &&
            user.id == chat.user1_id && (
              <>
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                      <h2 className="text-md  mb-4">تأكيد استلام الخدمة</h2>
                      {/* <p>A new order request has been made. Do you want to approve or reject it?</p> */}
                      <div className="flex justify-end mt-4">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-12"
                          // onClick={handleApprove}
                          onClick={(e) => updateStateOrder(e, "completed")}
                        >
                          قبول
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          // onClick={handleReject}
                          onClick={(e) => updateStateOrder(e, "in_progress")}
                        >
                          رفض
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* مرحبا */}
              </>
            )}
        </div>
        <div className="code-container">
          {/* {console.log(approveOrRejectOrder.status)} */}
          {showPopup &&
            approveOrRejectOrder?.status == "cancelled" &&
            user.id == chat.user2_id&& (
              <>
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white rounded-lg shadow-lg p-4">
                      <h2 className="text-md  mb-4">
                        موافقة على طلب الغاء الخدمة
                      </h2>
                      {/* <p>A new order request has been made. Do you want to approve or reject it?</p> */}
                      <div className="flex justify-end mt-4">
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-12"
                          // onClick={handleApprove}
                          onClick={(e) => updateStateOrder(e, "cancelled")}
                        >
                          قبول
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          // onClick={handleReject}
                          onClick={(e) => updateStateOrder(e, "in_progress")}
                        >
                          استمرار
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* مرحبا */}
              </>
            )}
        </div>

        <>
          {isLoading ? (
            <div>Loading...</div>
          ) : contracts.length > 0 ? (
            <div>
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
                        src={"http://localhost:8000/" + getuser.image}
                        // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                        alt="profile picture"
                      />
                      <div className="  flex flex-col font-medium  mr-2 text-left rtl:text-right ">
                        <div>
                          <NavLink to={`/user-profile/${getuser.id}`}>
                            {getuser.firstName} {getuser.lastName}
                          </NavLink>{" "}
                        </div>
                        <div className="text-sm text-gray-500  ">
                          <FaUserTimes className="inline-block " /> مدة التسليم{" "}
                          <span className="text-sm">
                            {" "}
                            {formatDateTime(services.delivery_time)}{" "}
                          </span>{" "}
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
                    </div>
                    <div className="bg-gray-100 ">
                      <div className=" bg-white ">
                        <p className="text-xl   m-2 mt-2 w-full   p-2">
                          وصف الخدمة
                        </p>
                        <p className="mr-3 p-2  w-full ">
                          {services.description}
                        </p>
                      </div>

                      {/* {
                      orders.freelancer_id === contracts[0].freelancer.id &&
                      orders.client_id === contracts[0].client.id ? (
                        <> */}
                          <div className="">
                            <div className="mt-4 p-2 bg-white  ">
                              <div className="flex justify-between items-center ">
                                <div>
                                  <p className="p-3 text-lg">الرسائل </p>
                                </div>
                                <div className="relative ml-2">
                                  <button
                                    onClick={isOpenHendle}
                                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 border-1"
                                    type="button"
                                  >
                                    <svg
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 4 15"
                                    >
                                      <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                    </svg>
                                  </button>

                                  {isOpen && (
                                    <>
                                      <div
                                        id="dropdownDots"
                                        className="z-10 left-7 bg-white absolute divide-y divide-gray-100 rounded-lg shadow w-44 "
                                      >
                                        <ul className=" text-sm text-gray-700 ">
                                          <li className="border-b-2">
                                            <button
                                              onClick={addRatingHandle}
                                              className="block px-4 py-2 hover:bg-gray-100"
                                            >
                                              إضف تقييم
                                              {/* <NavLink to="add-rating" className="block px-4 py-2 hover:bg-gray-100 ">اضف تقييم</NavLink> */}
                                            </button>
                                          </li>
                                          <li className="border-b-2">
                                            <NavLink
                                              to="#"
                                              className="block px-4 py-2 hover:bg-gray-100 "
                                            >
                                              تعديل الطلب{" "}
                                            </NavLink>
                                          </li>
                                          <li>
                                            <NavLink
                                              to="#"
                                              className="block px-4 py-2 hover:bg-gray-100 "
                                            >
                                              إبلغ عن مشكلة{" "}
                                            </NavLink>
                                          </li>
                                        </ul>
                                      </div>
                                    </>
                                  )}

                                  {addRatingShow && (
                                    <>
                                      <div className=" overflow-y-auto overflow-x-hidden fixed sm:top-14 sm:right-48 right-0  top-24 z-50 justify-center items-center sm:w-1/2 w-full h-[calc(100%-1rem)] max-h-full">
                                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                                          <div className="relative bg-white rounded-lg shadow ">
                                            <div className="flex items-center justify-between p-4  border-b rounded-t ">
                                              <h3 className="text-xl font-semibold text-gray-900 ">
                                                إضف تقييم
                                              </h3>
                                              <button
                                                onClick={closeRatingShow}
                                                type="button"
                                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                data-modal-hide="default-modal"
                                              >
                                                <svg
                                                  className="w-3 h-3"
                                                  aria-hidden="true"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 14 14"
                                                >
                                                  <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                  />
                                                </svg>
                                                <span className="sr-only">
                                                  اغلاق
                                                </span>
                                              </button>
                                            </div>
                                            <AddRating
                                              // services={services}
                                              // project={null}
                                              contracts={contracts}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-col w-full mt-4   bg-white border border-gray-300 rounded-lg shadow-md">
                                <div
                                  ref={chatAreaRef}
                                  className="flex scrollbar flex-col h-[72vh]  overflow-y-auto px-4   "
                                >
                                  {/* {console.log(chatAboutOrder)} */}
                                  <div className={`p-2 chat-message`}>
                                    {chatAboutOrder &&
                                    chatAboutOrder.length > 0 ? (
                                      chatAboutOrder.map((message, index) => (
                                        <div
                                          key={message.id}
                                          className="flex items-start mb-2"
                                        >
                                          <div className="flex items-start gap-2.5">
                                            <img
                                              className="h-8 w-8 rounded-full"
                                              src={"https://picsum.photos/200"}
                                              alt="Jese image"
                                            />
                                            <div className="flex flex-col gap-2.5">
                                              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                                <span className="text-sm font-semibold text-gray-900 ">
                                                  {message.user.firstName}
                                                  {/* {user.firstName} */}
                                                </span>
                                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                  11:46
                                                </span>
                                              </div>
                                              <div className="leading-1.5 flex w-full max-w-[320px] flex-col">
                                                <p className="text-sm font-normal text-gray-900 ">
                                                  {" "}
                                                  {message.content}
                                                </p>
                                                {message.files?.file_type ===
                                                  "image/jpeg" ||
                                                message.files?.file_type ===
                                                  "image/png" ||
                                                message.files?.file_type ===
                                                  "image/jpg" ? (
                                                  <>
                                                    <div className="group relative mt-2">
                                                      <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                                        <button
                                                          data-tooltip-target="download-image"
                                                          className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
                                                        >
                                                          <svg
                                                            className="w-5 h-5 text-white"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 16 18"
                                                          >
                                                            <path
                                                              stroke="currentColor"
                                                              strokeLinecap="round"
                                                              strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                                                            />
                                                          </svg>
                                                        </button>
                                                        <div
                                                          id="download-image"
                                                          role="tooltip"
                                                          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                                                        >
                                                          Download image
                                                          <div
                                                            className="tooltip-arrow"
                                                            data-popper-arrow
                                                          ></div>
                                                        </div>
                                                      </div>
                                                      {/* {console.log(message[50].files[0].file_path)} */}
                                                      <img
                                                        // chatAboutOrder[50].files[0].file_path
                                                        //  src={`http://localhost:8000/${message.files[0]}`}
                                                        src={
                                                          "http://localhost:8000/" +
                                                          message.files
                                                            .file_path
                                                        }
                                                        className="rounded-lg"
                                                      />
                                                      {/* {message.files.file_path} */}
                                                    </div>
                                                  </>
                                                ) : message.files?.file_type ===
                                                  "application/pdf" ? (
                                                  <>
                                                    <div className="flex flex-col w-full max-w-[300px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                                      <div className="flex items-start bg-gray-50 dark:bg-gray-600 rounded-xl p-2">
                                                        <div className="me-2">
                                                          <span className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                                                            <svg
                                                              fill="none"
                                                              aria-hidden="true"
                                                              className="w-5 h-5 flex-shrink-0"
                                                              viewBox="0 0 20 21"
                                                            >
                                                              <g clip-path="url(#clip0_3173_1381)">
                                                                <path
                                                                  fill="#E2E5E7"
                                                                  d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z"
                                                                />
                                                                <path
                                                                  fill="#B0B7BD"
                                                                  d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z"
                                                                />
                                                                <path
                                                                  fill="#CAD1D8"
                                                                  d="M18.774 9.25l-3.75-3.75h3.75v3.75z"
                                                                />
                                                                <path
                                                                  fill="#F15642"
                                                                  d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z"
                                                                />
                                                                <path
                                                                  fill="#fff"
                                                                  d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z"
                                                                />
                                                                <path
                                                                  fill="#CAD1D8"
                                                                  d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z"
                                                                />
                                                              </g>
                                                              <defs>
                                                                <clipPath id="clip0_3173_1381">
                                                                  <path
                                                                    fill="#fff"
                                                                    d="M0 0h20v20H0z"
                                                                    transform="translate(0 .5)"
                                                                  />
                                                                </clipPath>
                                                              </defs>
                                                            </svg>
                                                            {
                                                              message.files
                                                                .filename
                                                            }
                                                          </span>
                                                          <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
                                                            12 Pages
                                                            <svg
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              aria-hidden="true"
                                                              className="self-center"
                                                              width="3"
                                                              height="4"
                                                              viewBox="0 0 3 4"
                                                              fill="none"
                                                            >
                                                              <circle
                                                                cx="1.5"
                                                                cy="2"
                                                                r="1.5"
                                                                fill="#6B7280"
                                                              />
                                                            </svg>
                                                            {
                                                              message.files
                                                                .file_size
                                                            }
                                                            <svg
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              aria-hidden="true"
                                                              className="self-center"
                                                              width="3"
                                                              height="4"
                                                              viewBox="0 0 3 4"
                                                              fill="none"
                                                            >
                                                              <circle
                                                                cx="1.5"
                                                                cy="2"
                                                                r="1.5"
                                                                fill="#6B7280"
                                                              />
                                                            </svg>
                                                            PDF
                                                          </span>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                              </div>
                                              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                Delivered
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <div>No messages to display</div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex  items-center p-4">
                                  <form
                                    className="w-full"
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      setNewMessage("");
                                    }}
                                  >
                                    <div className="flex items-center bg-gray-200 rounded-full px-4 py-2">
                                      <input
                                        type="text"
                                        name="message"
                                        placeholder="اكتب رسالتك"
                                        value={newMessage}
                                        onChange={(e) =>
                                          setNewMessage(e.target.value)
                                        }
                                        className="flex-1 bg-transparent outline-none mr-2"
                                        // className="flex-grow border border-gray-300 rounded-lg p-2 w-full whitespace-normal"
                                      />
                                      <div className="flex justify-end">
                                        <label
                                          htmlFor="file-input"
                                          className="cursor-pointer mr-2"
                                        >
                                          <FiPaperclip className="text-gray-500 hover:text-gray-700" />
                                          <input
                                            id="file-input"
                                            type="file"
                                            onChange={handleFileChange}
                                            className="hidden"
                                          />
                                        </label>
                                        <button
                                          type="submit"
                                          onClick={handleSendMessage}
                                          // className="bg-[#8e2de2] w-full  mt-2  text-white px-4 py-3 rounded-lg"
                                        >
                                          <FiSend className="text-gray-500 hover:text-gray-700" />
                                        </button>
                                      </div>
                                    </div>
                                    {previewFile && <img src={previewFile} />}
                                  </form>
                                </div>
                              </div>
                            </div>

                            <div className="mt-2 p-2 bg-white">
                              <div className="flex  justify-between  border-b-2 mb-6 mt-2">
                                <div className="flex justify-start  items-center">
                                  <p className="px-2 text-lg border-gray-300">
                                    أدارة الطلبات
                                  </p>
                                  <div className="flex justify-center">
                                    {contracts[0].status === "active" && (
                                      <p className="h-fit  bg-green-500 text-white px-2 mr-2 text-sm">
                                        بإنتظار تعليمات المشتري
                                      </p>
                                    )}

                                    {contracts[0].status === "in_progress" && (
                                      <p className="h-fit  bg-blue-500 text-white px-2 mr-2   text-sm">
                                        جاري التنفيذ
                                      </p>
                                    )}
                                    {contracts[0].status === "waiting" && (
                                      <p className="h-fit  bg-blue-500 text-white px-2 mr-2 text-sm">
                                        ... إنتظار الموافقة المشتري
                                      </p>
                                    )}
                                    {contracts[0].status === "completed" && (
                                      <p className="h-fit  bg-green-500 text-white px-2 mr-2 text-sm">
                                        تم التسليم
                                      </p>
                                    )}
                                    {contracts[0].status === "cancelled" && (
                                      <p className="h-fit  bg-red-500 text-white px-2 mr-2 text-sm">
                                        تم الغاء المهام
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <p className=" text-[12px] ">
                                  تاريخ التسليم
                                  <TimeRemainingOfServices
                                    startDay={contracts[0].start_date}
                                    endDay={4}
                                  />
                                </p>
                              </div>

                              <div className="flex justify-center w-full gap-3">
                                {contracts[0].status == "in_progress" &&
                                  user.id ===chat.user2_id && (
                                    <form action="">
                                      <button
                                        type="button"
                                        className="py-2 px-2 bg-green-500 text-white rounded-md m-2"
                                        onClick={(e) =>
                                          updateOrder(e, "completed")
                                        }
                                      >
                                        ارسال طلب استلام الخدمة
                                      </button>
                                    </form>
                                  )}

                                {user.user_type !== "freelancer" &&
                                  orders.status !== "in_progress" &&
                                  orders.status !== "completed" && (
                                    <form action="">
                                      <button
                                        type="button"
                                        className="py-2 px-4 bg-red-400 text-white rounded-sm m-2"
                                        // onClick={updateOrder(id,'cancelled')}
                                        onClick={(e) =>
                                          updateOrder(e, "in_progress")
                                        }
                                        // onClick={() => setShowModal(!showModal)}
                                      >
                                        إرسال طلب بدء التنفيذ
                                      </button>
                                    </form>
                                  )}

                                {contracts[0].status !== "completed" &&
                                  contracts[0].status !== "cancelled" && (
                                    <form action="">
                                      <button
                                        type="button"
                                        className="py-2 px-4 bg-red-600 text-white rounded-sm m-2"
                                        onClick={() => setDoRequest(true)}
                                      >
                                        الغاء الطلب
                                      </button>
                                    </form>
                                  )}

                                <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 rounded-lg shadow-md">
                                  {!isReporting && (
                                    <button
                                      className="py-2 px-2 text-xl font-bold bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                      onClick={toggleReporting}
                                    >
                                      <svg
                                        className="w-6 h-6 mr-2 inline-block"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-6a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
                                        />
                                      </svg>
                                      إبلاغ عن مشكلة
                                    </button>
                                  )}

                                  {isReporting && (
                                    <form
                                      onSubmit={handleReportProblem}
                                      className="flex flex-col space-y-2 w-full pt-4 pb-6 px-8"
                                    >
                                      <textarea
                                        value={issue}
                                        onChange={(e) =>
                                          setIssue(e.target.value)
                                        }
                                        placeholder="صفِّ مشكلتك بالتفصيل..."
                                        required
                                        className="h-40 w-full border rounded-lg shadow-sm p-3 focus:outline-none focus:border-sky-500"
                                      ></textarea>
                                      <div className="flex justify-between">
                                        <button
                                          type="submit"
                                          disabled={isLoading}
                                          className="px-8 py-2 bg-red-500 text-white font-bold rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                          {isLoading
                                            ? "جارٍ الإرسال..."
                                            : "إرسال"}
                                        </button>
                                        <button
                                          className="py-2 px-2 bg-gray-400 text-white font-bold rounded-lg shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                          onClick={toggleReporting}
                                        >
                                          إلغاء الإبلاغ
                                        </button>
                                      </div>
                                    </form>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white mt-2 ">
                            {DoRequest && (
                              <form action="">
                                <span>سبب إلغاء الطلب</span>
                                <textarea
                                  value={causeMessage}
                                  onChange={(e) =>
                                    setcauseMessage(e.target.value)
                                  }
                                  className="w-full border-1 mt-2  "
                                  name=""
                                  id=""
                                ></textarea>
                                <button
                                  type="button"
                                  className="py-2 px-4 bg-red-600 text-white rounded-sm m-2"
                                  onClick={(e) => updateOrder(e, "cancelled")}
                                >
                                  الغاء الطلب
                                </button>
                              </form>
                            )}
                          </div>
                        {/* </>
                      ) : (
                        <></>
                      )} */}
                      {/* </>
                  )} */}
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

                        {contracts[0].price > 1 && contracts[0].status ? (
                          <>
                            <div className="flex px-2 py-2 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                              <div className="text-black font-bold w-1/2 ">
                                الحالة
                              </div>
                              <div className="flex justify-between   w-full">
                                {contracts[0].status === "active" && (
                                  <p className="text-white bg-red-400 p-1 font-bold w-full text-center text-sm">
                                    بإنتظار تعليمات المشتري
                                  </p>
                                )}

                                {contracts[0].status === "in_progress" && (
                                  <p className="text-black font-bold w-1/2 bg-blue-400 p-1">
                                    جاري التنفيذ
                                  </p>
                                )}
                                {contracts[0].status === "completed" && (
                                  <p className="text-black font-bold w-1/2 bg-green-400 p-1">
                                    تم التسليم
                                  </p>
                                )}
                                {contracts[0].status === "cancelled" && (
                                  <p className="text-black font-bold  bg-red-400 p-1 w-full">
                                    تم الغاء المهام
                                  </p>
                                )}
                              </div>
                            </div>{" "}
                          </>
                        ) : (
                          <></>
                        )}
                        <div className="flex px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                          <div className="text-black font-bold w-1/2 ">
                            تاريخ النشر{" "}
                          </div>
                          <div>{formatDateTime(services.created_at)}</div>
                        </div>
                        <div className="flex px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                          <div className="text-black font-bold w-1/2 ">
                            مدة التنفيذ
                          </div>
                          <div>
                            {/* Time Remaining: {Math.floor(services.dalivery_time / 60)}m{' '}
                      {Math.floor(timeRemaining % 60)} */}
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
                            تقييم الخدمة
                          </div>
                          <div>
                            {" "}
                            {calculateOverallScore}
                            <FaStar
                              className="text-yellow-300 inline mb-1 mr-1 text-center"
                              size={15}
                            />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    {contracts[0].status !== "in_progress" &&
                      contracts[0].status !== "active" &&
                      user.id !== services.user_id && (
                        <form action="">
                          <button
                            type="button"
                            // onClick={createOrderService}
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
                              alt= {getuser.firstName}
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
                          {user.id !== services.user_id ? (
                            <>
                              <div className=" text-white p-2  bg-green-500 hover:bg-green-400 border-2 rounded-lg text-sm  border-gray-200 ">
                                <button onClick={CreateConversion}>
                                  تواصل مع بائع الخدمة
                                </button>
                              </div>
                            </>):(<>
                              <div className=" text-white p-2  bg-green-500 hover:bg-green-400 border-2 rounded-lg text-sm  border-gray-200 ">
                                <button >
                                  منفذ الخدمة
                                </button>
                              </div>
                            </>)
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>Error fetching contract data.</div>
          )}
        </>
      </section>
    </>
  );
}
