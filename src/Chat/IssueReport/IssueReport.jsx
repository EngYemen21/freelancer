import { useState, useEffect, useRef } from "react";
import axios from "../../axios/axios";
import { FaEllipsisV, FaFile } from "react-icons/fa";
// import NotificationProject from "./NotificationProject";
// import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { useAuth } from "../../contexts/AuthContext";
import { FiSend } from "react-icons/fi";

// import { useAuth } from "../../../contexts/AuthContext";

export default function IssueReport() {
  const { user, csrfToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // useAuth
  const chat = location.state ? location.state.$chat : null;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState(null);
  // const [chatId, setChatId] = useState(null);
  // const { projectId ,chat } = props;
  //  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [awaiting_confirmation, setAwaiting_confirmation] = useState([]);
  // console.log(chat)
  // console.log("projectId",projectId)
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //  const handleSendCompletedProject = async (option) => {
  //   try {
  //     const response = await axios.post(`/projects/${projectId}/request-delivery`,{awaiting_confirmation:"awaiting_confirmation"});
  //     // if (response.status === 200) {
  //       if (response.status === 200) {
  //         // toast.success('Delivery request sent successfully');
  //         // setAwaiting_confirmation(response.data);
  //         console.log(response.data)
  //       }

  //       // toast.success('Status updated successfully');
  //       // هنا يمكنك تحديث الحالة المحلية أو إعادة جلب البيانات لتحديث واجهة المستخدم
  //     // }
  //   } catch (error) {
  //     toast.error('Failed to send delivery request');
  //   }
  // };
  // const hendelApproveDelivery = async () => {
  //   try {
  //     const response = await axios.post(`/projects/${projectId}/approve-delivery`,{freelancerID:chat.user2_id});

  //       if (response.status === 200) {
  //         toast.success('Delivery request sent successfully');
  //         setAwaiting_confirmation(response.data);
  //         console.log(response.data)
  //       }

  //       // toast.success('Status updated successfully');
  //       // هنا يمكنك تحديث الحالة المحلية أو إعادة جلب البيانات لتحديث واجهة المستخدم
  //     // }
  //   } catch (error) {
  //     toast.error('Failed to send delivery request');
  //   }
  // };
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
     
        try {
          const response = await axios.get(`/show/${user.id}/issue`);
          setMessages(response.data.issue[0].conversation.messages);
          console.log(response.data.issue[0].conversation.messages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
   
    };
    // console.log(projectId)

    fetchMessages();

  },[ ]);
  const chatAreaRef = useRef(null);
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // const handleIssueReport = async () => {
  //   navigate('/issue-report')

  // };
  // useEffect(()=>{
  //   const handleGetAwaitingStatus = async () => {
  //     try {
  //       const response = await axios.get(`/projects/${projectId}/status-delivery`,{awaiting_confirmation:"awaiting_confirmation"});
  //       // if (response.status === 200) {
  //         if (response.status === 200) {
  //           // toast.success('Delivery request sent successfully');
  //           setAwaiting_confirmation(response.data);
  //           // console.log(response.data)
  //         }

  //     } catch (error) {
  //       // toast.error('Failed to send delivery request');
  //     }
  //   };
  // handleGetAwaitingStatus();
  // },[messages])
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
      //   const userId = user.id === chat.user1_id ? chat.user1_id : chat.user2_id;
      // console.log(userId);
      const response = await axios.post(`/issue-report`, { message: message });
      // const message = response.data;
      console.log(response);
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage(""); // Clear the message input after sending
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
  // useEffect(() => {
  //   if (isMessageSent) {
  //     // إعادة تعيين قيمة الرسالة والملف بعد الإرسال
  //     // fetchMessages();
  //     handleSendMessage()
  //     setMessage('');
  //     setIsMessageSent(true);
  //   }
  // }, [isMessageSent ,chatAreaRef]);

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };
  // console.log(messages)

  return  (
    <div className="container mx-auto p-4">
      <div className="w-full md:w-3/4 lg:w-1/2 mx-auto bg-gray-50 p-3 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">مركز المساعدة</h2>
          <div className="relative inline-block text-left">
            <button onClick={toggleDropdown} className="bg-gray-200 p-2 rounded-lg cursor-pointer">
              <FaEllipsisV />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right">
                    طلب تعديل السعر
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right">
                    طلب الغاء تنفيذ المشروع
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right">
                    ارسال طلب استلام المشروع
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-right">
                    إبلغ عن مشكلة
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div ref={chatAreaRef} className="mb-4 h-[56vh] bg-white overflow-y-auto p-4">
          {Array.isArray(messages) ? (
            messages.map((messageItem) => (
              <div key={messageItem.id} className="flex pt-4 items-start mb-2">
                <div className="flex items-start mr-4  gap-2.5">
                  {messageItem.user_id === user.id && (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={messageItem.image}
                      alt="User"
                    />
                  )}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-md font-arabic font-semibold ">
                        {messageItem.user_id === user.id ? (
                          user.firstName
                        ) : (
                          <p className="text-green-400">الدعم الفني</p>
                        )}
                      </span>
                      <span className="text-sm font-normal text-gray-500">
                        11:46
                      </span>
                    </div>
                    <div className="leading-1.5 flex flex-wrap bg-gray-100 p-2 rounded-md flex-col">
                      <p className="text-md  flex flex-wrap tracking-wider font-arabic font-normal text-gray-900 break-words">
                        {messageItem.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="bg-gray-50 text-md font-arabic"> اهلا بك في مركز المساعدة الوسيط الحر . نرجو منك ترك رسالتك وسنعود إليك خلال ساعات القادمة</p>
          )}
        </div>

        <div className="flex items-center border-t-2 pt-2 space-x-2">
          <div className="flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="اكتب رسالة..."
            />
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label htmlFor="fileInput" className="bg-gray-200 p-2 rounded-lg cursor-pointer">
            <FaFile size={25} />
          </label>
          <button onClick={handleSendMessage} className="bg-gray-200 p-2 rounded-lg cursor-pointer hover:text-gray-700">
            <FiSend size={27} />
          </button>
        </div>

        {awaiting_confirmation.ProjectStatus?.status === 'awaiting_confirmation' &&
          awaiting_confirmation.project.user_id === user.id && (
            <div className="bg-green-600 p-3 mt-4 text-white text-center rounded-md">
              <button onClick={hendelApproveDelivery}>قبول الطلب</button>
            </div>
          )}
      </div>
    </div>
  );
}
