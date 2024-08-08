import { useState ,useEffect, useRef } from "react";
import axios from "../../../axios/axios";
import { FaEllipsisV, FaFile } from "react-icons/fa";
import NotificationProject from "./NotificationProject";
// import axios from 'axios';
import {useNavigate} from "react-router-dom";

import { toast } from 'react-toastify';
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useAuth } from "../../../contexts/AuthContext";
import { FiSend } from "react-icons/fi";
// import { useAuth } from "../../../contexts/AuthContext";

export default function ChatProject (props){
  const { user , csrfToken} =useAuth();
  const navigate=useNavigate()
  // useAuth
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [chatId, setChatId] = useState(null);
    const { projectId ,chat } = props;
     const [isMessageSent, setIsMessageSent] = useState(false);
     const [isOpen, setIsOpen] = useState(false);
     const [awaiting_confirmation, setAwaiting_confirmation] = useState([]);
// console.log(chat)
console.log("projectId",projectId)
     const toggleDropdown = () => {
       setIsOpen(!isOpen);
     };
    //  import Pusher from 'pusher-js';

// Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;

// const pusher = new Pusher('ad6755871b55733e71f4', {
//   cluster: 'ap2',
//   encrypted: true,
// });

// const channel = pusher.subscribe(`project.${chat.id}`);
// channel.bind('MessageEvent', function(data) {
//   // alert(JSON.stringify(data));
//   console.log(data)
// });

    //  window.Echo = new Echo({
    //   broadcaster: "pusher",
    //   key: "ad6755871b55733e71f4",
    //   cluster: "ap2",
    //   authEndpoint: "http://127.0.0.1:8000/api/pusher/auth",
    //   authorizer: (channel, options) => {
    //     return {
    //       authorize: (socketId, callback) => {
    //         axios
    //           .post(
    //             "pusher/auth",
    //             {
    //               socket_id: socketId,
    //               channel_name: channel.name,
    //             },
    //             { csrfToken }
    //           )
    //           .then((response) => {
    //             callback(false, response.data);
    //           })
    //           .catch((error) => {
    //             callback(true, error);
    //           });
    //       },
    //     };
    //   },
    // });
    // console.log( window.Echo)
    // console.log(chat.id)
    // useEffect(()=>{
    //   // console.log(chat.id)

    //   window.Echo.private(`project.${chat.id}`).listen(
    //     "MessageEvent",
    //     (data) => {
    //       console.log("Received data:", data);
    //       // toast.info(`Delivery requested for project ${data.message}`);
  
    //       // setMessages((prevMessages) => [...prevMessages, data]);
    //     }
    //   );
    //   // return () => {
    //   //   window.Echo.private(`private-project.${20}`).stopListening(
    //   //     "ProjectDeliveryRequestedProject"
    //   //   );
    //   // };
    // },)
    // const [messages, setMessages] = useState([]);

    // useEffect(() => {
    //   window.Pusher = Pusher;
  
    //   window.Echo = new Echo({
    //     broadcaster: 'pusher',
    //     key: 'ad6755871b55733e71f4',
    //     cluster:'ap2',
    //     encrypted: true,
    //   });
  
    //   window.Echo.private(`project.${chat.id}`)
    //     .listen('MessageEvent', (e) => {
    //       console.log(e);
    //       setMessages([...messages, e.message]);
    //     });
  
    //   return () => {
    //     window.Echo.disconnect();
    //   };
    // }, [messages]);

// Pusher.logToConsole = true;

//    window.Echo = new Echo({
//         broadcaster: 'pusher',
//         key: 'ad6755871b55733e71f4',
//         cluster:'ap2',
//         encrypted: true,
//       });
  

// // const chatId = '1'; // استبدل بالمعرف الفعلي للمحادثة

// window.Echo.private(`project.${chat.id}`)
//     .listen('MessageEvent', (e) => {
//         console.log('Message received: ', e.message);
//     });
     const handleSendCompletedProject = async (option) => {
      try {
        const response = await axios.post(`/projects/${projectId}/request-delivery`,{awaiting_confirmation:"awaiting_confirmation"});
        // if (response.status === 200) {
          if (response.status === 200) {
            // toast.success('Delivery request sent successfully'); 
            // setAwaiting_confirmation(response.data);
            console.log(response.data)
          }
         
          // toast.success('Status updated successfully');
          // هنا يمكنك تحديث الحالة المحلية أو إعادة جلب البيانات لتحديث واجهة المستخدم
        // }
      } catch (error) {
        toast.error('Failed to send delivery request');
      }
    };
    const hendelApproveDelivery = async () => {
      try {
        const response = await axios.post(`/projects/${projectId}/approve-delivery`,{freelancerID:chat.user2_id});
      
          if (response.status === 200) {
            toast.success('Delivery request sent successfully'); 
            setAwaiting_confirmation(response.data);
            console.log(response.data)
          }
         
          // toast.success('Status updated successfully');
          // هنا يمكنك تحديث الحالة المحلية أو إعادة جلب البيانات لتحديث واجهة المستخدم
        // }
      } catch (error) {
        toast.error('Failed to send delivery request');
      }
    };
    //  const handleOptionClick = (option) => {
    //    console.log(`${option} clicked`);
    //   //  if(option==='Completed')
    //   //  {
    //   //   updateStatus(option);


    //   //  }
    //    // يمكنك إضافة الوظيفة المطلوبة لكل خيار هنا
    //    setIsOpen(false);
    //  };
  

    // console.log(chat.id);
    useEffect(() => {
      const fetchMessages = async () => {
        if (chat.id) {
          try {
            const response = await axios.get(`/conversationes/${chat.id}/messages`);
            setMessages(response.data.messages);  
            // console.log(response);
          } catch (error) {
            console.error('Error fetching messages:', error);
          }
        }
      };
      // console.log(projectId)
     
      fetchMessages();
    
    },[chat ]); 
    const chatAreaRef = useRef(null);
    useEffect(() => {
      if (chatAreaRef.current) {
        chatAreaRef.current.scrollTo({
          top: chatAreaRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, [messages]);

    const handleIssueReport = async () => {
      navigate('/issue-report' ,{state:{chat:chat,projectId:projectId}})
     
    };
    useEffect(()=>{
      const handleGetAwaitingStatus = async () => {
        try {
          console.log(projectId)
          const response = await axios.get(`/projects/${projectId}/status-delivery`,{awaiting_confirmation:"awaiting_confirmation"});
          // if (response.status === 200) {
            if (response.status === 200) {
              // toast.success('Delivery request sent successfully'); 
              setAwaiting_confirmation(response.data);
              // console.log(response.data)
            }
           
        } catch (error) {
          // toast.error('Failed to send delivery request');
        }
      };
    handleGetAwaitingStatus();
    },[messages])
  // console.log(user?.id)
    const handleSendMessage = async () => {
      // if (message.trim() || attachment) {
      //   // const formData = new FormData();
      //   // formData.append('chat_id', chat.id);
      //   // formData.append('user_id', ); // استبدل بـ user_id الفعلي
      //   // formData.append('message', message);
      //   // if (attachment) {
      //   //   formData.append('attachment', attachment);
      //   // }
      // }
      // console.log('attachment',attachment);
        // console.log(chat.id)
        try {
          // user1_id: 4, user2_id: 20,
          const userId = user.id === chat.user1_id ? chat.user1_id : chat.user2_id;
          // console.log(userId);
          const response = await axios.post(`/conversationes/${chat.id}/messages`, {
            user_id: userId, 
            content: message,
            file:attachment
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
    // useEffect(()=>{
    //   handleSendMessage()
    // },[message])
    useEffect(() => {
      if (isMessageSent) {
        // إعادة تعيين قيمة الرسالة والملف بعد الإرسال
        // fetchMessages();
        handleSendMessage()
        setMessage('');
        setIsMessageSent(true);
      }
    }, [isMessageSent ,chatAreaRef]);
  
    const handleFileChange = (e) => {
      setAttachment(e.target.files[0]);
    };
  // console.log(messages)
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full "> 
    <div className="p-2 m-2 flex  justify-between">
      <div>
           <h2 className="text-lg font-semibold">محادثة المشروع</h2>
      </div>
      <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="bg-gray-200 p-2 rounded-lg cursor-pointer"
      >
        <FaEllipsisV />
     
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              // onClick={() => handleOptionClick("تعديل")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
            >
              طلب تعديل السعر
            </button>
            <button
              // onClick={() => handleOptionClick("حذف")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
            >
              طلب الغاء تنفيذ المشروع
            </button>
            <button
              onClick={() => handleSendCompletedProject("Completed")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
            >
              ارسال طلب استلام المشروع
            </button>
            <button
              onClick={handleIssueReport}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right"
            >
             إبلغ عن مشكلة
            </button>
          </div>
        </div>
      )}
    </div>
     
    </div>
  
    <div  ref={chatAreaRef}  className="mb-4  scrollbar flex-col h-[72vh]  bg-white  overflow-y-auto px-4">
     
      {Array.isArray(messages) ? (
            messages?.map((messageItem) => (
                <div
                key={messageItem.id}
                className="flex items-start mb-2"
              >
                <div className="flex items-start gap-2.5">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={`http://127.0.0.1:8000/`+messageItem.user.image} 
                    alt="Jese image"
                  />
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 ">
                      {messageItem.user.firstName}
                        {/* {user.firstName} */}
                      </span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        11:46
                      </span>
                    </div>
                    <div className="leading-1.5 flex w-full bg-gray-50 p-2  max-w-[320px] flex-col">
                      <p className="text-md w-full font-normal text-gray-900 ">
                        {" "}
                        {messageItem.content}
                      </p>
                      {messageItem.attechment[0] ?.file_type ===
                        "image/jpeg" ||
                        messageItem.attechment[0] ?.file_type ===
                        "image/png" ||
                     messageItem.attechment[0] ?.file_type ===
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
                               
                                <div
                                  className="tooltip-arrow"
                                  data-popper-arrow
                                ></div>
                              </div>
                            </div>
                            <img src={`http://127.0.0.1:8000/`+messageItem.attechment[0].file_path} alt="" />
                            {/* <a className="p-2 font-semibold" href={`http://127.0.0.1:8000/storage/${messageItem.attechment[0].file_path}`} download> */}
                    {/* تحميل ملف المشروع */}
                    {/* </a> */}
                          
                          </div>
                        </>
                      ) : messageItem.attechment[0]?.file_type ===
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
                                    messageItem.attechment[0].filename
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
                                    messageItem.attechment[0].file_size
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
            <p>No messages found.</p>
          )}
    </div>
   

    <div className="flex items-center border-t-2  pt-2 space-x-2">
      <div className="w-1/2 ml-2">
         <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border w-full  p-2 rounded-lg"
        placeholder="اكتب رسالة..."
      />
       </div>
      <input type="file" onChange={handleFileChange} className="hidden " id="fileInput" />
      <label
        htmlFor="fileInput"
        className="bg-gray-200  p-2 rounded-lg cursor-pointer"
      >
       <FaFile size={25} />
      </label>
     
     
      <button
        onClick={handleSendMessage}
      >
        {/* إرسال */}
        <FiSend size={40} className="bg-gray-200 p-2 rounded-lg cursor-pointer hover:text-gray-700" />
      </button>
    </div>
 
    {(awaiting_confirmation.ProjectStatus?.status==='awaiting_confirmation') && (awaiting_confirmation.project.user_id===user.id) &&(
      <>
      
        <div className="bg-green-600 p-3 m-2 text-white  text-center rounded-md">
        <button onClick={hendelApproveDelivery}>
          قبول الطلب
        </button>
      </div>
      </>
    )}

    
  
  </div>
  );
}


