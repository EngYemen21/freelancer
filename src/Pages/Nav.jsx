import { useEffect, useState } from "react";
import {
  FaSuitcase,
  FaFolderOpen,
  FaUsers,
  FaHome,
  FaBars,
  FaAngleDown,
  FaPlus,
  FaBell,
  FaList,
} from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import {
  RiSettingsLine,
  RiLogoutBoxLine,
  RiAccountCircleLine,
} from "react-icons/ri";
import { useAuth } from "../contexts/AuthContext";
import { BrowserRouter as Router, NavLink, useNavigate } from "react-router-dom";
import person from "../assets/person.webp";
import logo from "../assets/logoAl.svg";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "./../axios/axios";

export default function Nav() {
  const { user, csrfToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpenNot, setisOpenNot] = useState(false);
  const [isOpenMessage, setisOpenMessage] = useState(false);

  const [showSidebar, setShowSidebar] = useState(false);
  const [showServices, setshowServices] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [notificationsConversion,    setNotificationsConversion] = useState([]);
  const [eventOrder, setEventOrder] = useState([]);
  const [conversions, setConversion] = useState([]);
  const [notificationBids, setNotificationBids] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchConversations =async () => {
      if(user){
           const response=await axios.get("/conversations")
           setConversion(response.data);
           console.log(response.data)
     }
      }

   
    fetchConversations();
  },[]);
 



  const toggleViewAll = () => {
    setViewAll(!viewAll);
  };
  // window.Echo = new Echo({
  //   broadcaster: "pusher",
  //   key: "ad6755871b55733e71f4",
  //   cluster: "ap2",

  //   authEndpoint: "http://127.0.0.1:8000/api/pusher/auth",
  //   authorizer: (channel, options) => {
  //     return {
  //       authorize: (socketId, callback) => {
  //         if(user)
  //           {
  //                  axios
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
  //           }
     
  //       },
  //     };
  //   },
  // });
    
 
    // useEffect(() => {
    

    // window.Echo.private(`private-events.${user?.id}`).listen(
    //   "EventService",
    //   (data) => {
    //     setEventOrder(data);
    //     console.log(data);
    //     console.log("EventService");
    //     setNotifications((PreNotification) => [...PreNotification, data]);
    //     // storeNotifications(data);
    //   },
    //   []
    // );

    // return () => {

    //   window.Echo.private(`private-events.${user?.id}`)
    //     .stopListening('EventService');
    // };
  // });

  // useEffect(() => {
  //   window.Echo.private(`private-AcceptBidsEvent.${user?.id}`).listen(
  //     "AcceptBidsEvent",
  //     (data) => {
  //       // setEventOrder(data);
  //       // setNotificationBids(data);
  //       // console.log("AcceptBidsEvent:", data);
  //       // setNotificationBids((PreNotification)=> [...PreNotification,data ]);
  //       // storeNotifications(data.AcceptBidsEvent);
  //       // console.log("sjksjxkjsxksknxs,", data.AcceptBidsEvent.freelancer_id);
  //     }
  //   );
  // }, []);
  useEffect(() => {
    const fetchNotificationProject = async () => {
      if(user)
      {
          const response = await axios.get("/get-message-notification-projects");
      const data = response.data;
      setNotificationBids(data);
      console.log(response)
      }
    
     
    };
    fetchNotificationProject();
    
  },[]);



  const  fetchChatOfProject =async(chatID)=>{
    const response=await axios.get(`/chats-project-from-notification/${chatID}`);
    const data=response.data;
    console.log(data)
   
    navigate('/accept-bid/', { state: {id:response.data.chat.project_id, $chat:response.data.chat} });


  }
  useEffect(()=>{
    const  fetchMyConversion =async()=>{

      const response=await axios.get(`/getMyConversion`);

      // console.log(response.data[0])
      const chat=response.data[0];
      if(response.data[0].conversable_type== "App\\Models\\Contract")
      {
        // markAsRead(NotifictionID);
        navigate(`/chat-service/${response.data[0].conversable_id}`, { state:{chat:chat}});
      }
      else{
        // markAsRead(NotifictionID);
        navigate('/accept-bid/', { state: {id:response.data[0].project_id, $chat:response.data} });
      }
    }
  })


  const  fetchConversionServicesProjects =async(Conversion)=>{
   
    if(Conversion.conversable_type== "App\\Models\\Contract")
    {
      // markAsRead(Conversion);
      navigate(`/chat-service/${Conversion.conversable_id}`, { state:{chat:Conversion}});
    }
   else if (Conversion.conversable_type =='App\\Models\\AcceptedBid'){
      // markAsRead(NotifictionID);
      
      navigate('/accept-bid/', { state: {id:Conversion.project_id, $chat:Conversion} });
    }
  }
  const  fetchChat =async(chatID ,NotifictionID)=>{
    console.log("chatID",chatID);
    console.log(NotifictionID);
    const response=await axios.get(`/getConversion/${chatID}`);
    console.log(response)
    const chat=response.data[0];
    if(response.data[0].conversable_type== "App\\Models\\Contract")
    {
      markAsRead(NotifictionID);
      navigate(`/chat-service/${response.data[0].conversable_id}`, { state:{chat:chat}});
    }
    else{
      markAsRead(NotifictionID);
      console.log(response.data[0])
      navigate('/accept-bid/', { state: {id:response.data[0].project_id, $chat:response.data} });
    }
  }


  useEffect(()=>{
  const  fetchNot =async()=>{
  
    try {
      const response = await axios.get('/getNotification');
      setNotificationsConversion(response.data);
      console.log("getNotification",response);

    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
 }
 if(user)
  {
     fetchNot();
  }

  },[])

    // navigate('/accept-bid/', { state:response.data.chat});

    // console.log(data);

    const markAsRead = async (notificationId) => {
      try {
        const response = await axios.post(
          `/notification/${notificationId}/mark-as-read`
        );
  
        // if (response.status === 200) {
        //   // Update local state and UI
        //   const updatedNotifications = notificationsConversion.map((notification) => {
        //     if (notification.id === notificationId) {
        //       // fetchNot();
        //       return { ...notification, is_read: 1 }; // Update is_read locally
        //     }
        //     return notification;
        //   });
        //   setNotifications(updatedNotifications);
        // }
      } catch (error) {
        console.error(error);
      }
    };

  const handleToggleOpenProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };
  const handleToggleOpenNotficatuin = () => {
    setisOpenNot(!isOpenNot);
  };
  const handleToggleOpenMessage = () => {
    setisOpenMessage(!isOpenMessage);
  };
  const handleshowServices = () => {
    setshowServices(!showServices);
  };

  const handleLogout = async () => {
    try {
      const resp = await axios.post("/logout");
      if (resp.status === 200) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleMenu2 = () => {
    setIsOpen2(!isOpen2);
  };

  return (
    <>
      <div className=" shadow-sm bg-white font-arabic">
        <div className=" container   flex flex-wrap  items-center justify-between mx-auto p-3   ">
          <div className="  ">
            {/* <svg fill="none" viewBox="0 0 334 56" xmlns="http://www.w3.org/2000/svg"><path fill="#2962FF" fillRule="evenodd" d="M4.464 18.71c-5.133 5.131-5.133 13.449 0 18.58l14.868 14.862c5.133 5.13 13.454 5.13 18.586 0L52.786 37.29c5.133-5.13 5.133-13.448 0-18.579L37.918 3.848c-5.133-5.13-13.454-5.13-18.586 0L4.464 18.71ZM35.13 34.503a9.193 9.193 0 0 0 0-13.006 9.2 9.2 0 0 0-13.01 0 9.193 9.193 0 0 0 0 13.006 9.202 9.202 0 0 0 13.01 0Z" clipRule="evenodd"/><path fill="#0F172A" d="M69.636 49.346V5.966h8.599v18.28l-1.032-1.375c.726-1.872 1.892-3.247 3.497-4.126 1.643-.917 3.554-1.375 5.733-1.375 2.37 0 4.433.496 6.191 1.49a10.498 10.498 0 0 1 4.185 4.183c.994 1.758 1.49 3.82 1.49 6.19v20.113H89.7v-18.28c0-1.223-.248-2.273-.745-3.152a4.968 4.968 0 0 0-2.006-2.063c-.841-.497-1.835-.745-2.981-.745-1.109 0-2.102.248-2.981.745a5.353 5.353 0 0 0-2.064 2.063c-.459.879-.688 1.93-.688 3.152v18.28h-8.6ZM112.496 50.034c-2.255 0-4.204-.363-5.848-1.089-1.643-.726-2.904-1.757-3.783-3.094-.879-1.376-1.319-3-1.319-4.871 0-1.758.401-3.305 1.204-4.642.802-1.375 2.025-2.521 3.669-3.438 1.681-.917 3.764-1.567 6.248-1.949l9.574-1.547v6.304l-8.026 1.432c-1.223.23-2.159.63-2.809 1.204-.649.535-.974 1.318-.974 2.35 0 .954.363 1.7 1.089 2.234.726.535 1.624.802 2.694.802 1.414 0 2.657-.305 3.727-.916 1.07-.612 1.891-1.433 2.465-2.465a6.927 6.927 0 0 0 .917-3.495v-8.138c0-1.184-.478-2.177-1.433-2.98-.917-.802-2.179-1.203-3.784-1.203-1.529 0-2.885.42-4.07 1.26-1.147.841-1.987 1.95-2.523 3.325l-6.879-3.267a11.175 11.175 0 0 1 2.924-4.527c1.338-1.26 2.943-2.235 4.815-2.923 1.873-.687 3.918-1.031 6.134-1.031 2.637 0 4.969.477 6.994 1.432 2.026.956 3.593 2.293 4.701 4.012 1.147 1.68 1.72 3.648 1.72 5.902v20.63h-8.026v-5.042l1.949-.344c-.917 1.375-1.93 2.521-3.038 3.438a11.21 11.21 0 0 1-3.726 1.948c-1.376.459-2.905.688-4.586.688ZM147.351 50.034c-3.44 0-6.44-.802-9-2.407-2.523-1.643-4.243-3.84-5.16-6.59l6.306-2.98c.803 1.681 1.892 3 3.268 3.954a7.86 7.86 0 0 0 4.586 1.433c1.223 0 2.159-.248 2.809-.745.65-.497.975-1.184.975-2.063 0-.459-.115-.84-.344-1.146-.23-.344-.574-.65-1.032-.917-.459-.267-1.032-.497-1.72-.688l-5.332-1.49c-2.56-.726-4.528-1.89-5.904-3.495-1.376-1.643-2.064-3.572-2.064-5.788 0-1.949.497-3.649 1.49-5.1.994-1.452 2.389-2.58 4.185-3.381 1.797-.84 3.86-1.261 6.192-1.261 3.057 0 5.732.726 8.026 2.177 2.331 1.414 3.974 3.42 4.93 6.017l-6.364 2.98c-.458-1.299-1.299-2.33-2.522-3.094-1.185-.802-2.542-1.203-4.07-1.203-1.109 0-1.988.229-2.637.687-.612.459-.918 1.089-.918 1.891 0 .42.115.803.344 1.146.23.344.593.65 1.09.917.535.268 1.184.516 1.949.745l4.987 1.49c2.599.764 4.586 1.93 5.962 3.496 1.376 1.528 2.064 3.42 2.064 5.673 0 1.948-.516 3.649-1.548 5.1-.993 1.452-2.388 2.598-4.185 3.439-1.796.802-3.917 1.203-6.363 1.203ZM163.44 49.346V5.966h8.599v18.28l-1.032-1.375c.726-1.872 1.892-3.247 3.497-4.126 1.643-.917 3.554-1.375 5.733-1.375 2.369 0 4.433.496 6.191 1.49a10.501 10.501 0 0 1 4.185 4.183c.994 1.758 1.49 3.82 1.49 6.19v20.113h-8.599v-18.28c0-1.223-.248-2.273-.745-3.152a4.97 4.97 0 0 0-2.006-2.063c-.841-.497-1.835-.745-2.981-.745-1.109 0-2.102.248-2.981.745a5.355 5.355 0 0 0-2.064 2.063c-.459.879-.688 1.93-.688 3.152v18.28h-8.599ZM196.611 49.346V18.058h8.026v6.189l-.459-1.376c.727-1.872 1.892-3.247 3.497-4.126 1.644-.917 3.555-1.375 5.733-1.375 2.37 0 4.433.496 6.191 1.49a10.489 10.489 0 0 1 4.185 4.183c.994 1.758 1.491 3.82 1.491 6.19v20.113h-8.599v-18.28c0-1.223-.249-2.273-.745-3.152a4.972 4.972 0 0 0-2.007-2.063c-.841-.497-1.834-.745-2.981-.745-1.108 0-2.102.248-2.981.745a5.355 5.355 0 0 0-2.064 2.063c-.458.879-.688 1.93-.688 3.152v18.28h-8.599ZM245.318 50.034c-3.095 0-5.923-.707-8.484-2.12a16.665 16.665 0 0 1-6.077-5.788c-1.49-2.483-2.236-5.291-2.236-8.424 0-3.171.746-5.979 2.236-8.424a16.666 16.666 0 0 1 6.077-5.788c2.561-1.413 5.389-2.12 8.484-2.12 3.096 0 5.905.707 8.428 2.12 2.522 1.414 4.528 3.343 6.019 5.788 1.529 2.445 2.293 5.253 2.293 8.424 0 3.133-.764 5.94-2.293 8.424-1.491 2.445-3.497 4.374-6.019 5.788-2.523 1.413-5.332 2.12-8.428 2.12Zm0-7.736c1.567 0 2.924-.363 4.071-1.089 1.184-.726 2.102-1.738 2.751-3.037.688-1.3 1.032-2.79 1.032-4.47 0-1.681-.344-3.152-1.032-4.413-.649-1.299-1.567-2.31-2.751-3.037-1.147-.764-2.504-1.146-4.071-1.146-1.567 0-2.942.382-4.127 1.146-1.185.726-2.121 1.739-2.809 3.037-.65 1.261-.975 2.732-.975 4.413 0 1.68.325 3.17.975 4.47.688 1.299 1.624 2.311 2.809 3.037s2.56 1.089 4.127 1.089ZM280.71 50.034c-3.057 0-5.79-.726-8.197-2.178-2.408-1.451-4.319-3.419-5.733-5.902-1.376-2.483-2.064-5.234-2.064-8.252 0-3.056.707-5.807 2.121-8.252 1.414-2.483 3.325-4.45 5.733-5.903 2.408-1.451 5.102-2.177 8.083-2.177 2.293 0 4.319.44 6.077 1.318 1.796.84 3.21 2.044 4.242 3.61l-1.319 1.72V5.965h8.6v43.38h-8.026v-5.73l.802 1.776c-1.07 1.528-2.522 2.694-4.357 3.496-1.834.764-3.821 1.146-5.962 1.146Zm1.032-7.736c1.567 0 2.943-.363 4.128-1.089s2.102-1.738 2.752-3.037c.687-1.3 1.031-2.79 1.031-4.47 0-1.681-.344-3.171-1.031-4.47-.65-1.299-1.567-2.311-2.752-3.037-1.185-.726-2.561-1.089-4.128-1.089-1.567 0-2.981.382-4.242 1.146-1.223.726-2.178 1.739-2.866 3.037-.688 1.261-1.032 2.732-1.032 4.413 0 1.68.344 3.17 1.032 4.47.688 1.299 1.643 2.311 2.866 3.037 1.261.726 2.675 1.089 4.242 1.089ZM318.481 50.034c-3.325 0-6.211-.726-8.657-2.178-2.446-1.49-4.338-3.476-5.675-5.96-1.338-2.483-2.007-5.233-2.007-8.251 0-3.133.688-5.922 2.064-8.367 1.414-2.445 3.306-4.374 5.676-5.788 2.369-1.413 5.044-2.12 8.025-2.12 2.485 0 4.682.401 6.593 1.203 1.911.764 3.516 1.853 4.815 3.267a14.223 14.223 0 0 1 3.039 4.928c.688 1.834 1.032 3.84 1.032 6.017 0 .611-.039 1.223-.115 1.834-.038.573-.134 1.07-.287 1.49h-23.446v-6.304h18.574l-4.071 2.98c.383-1.643.363-3.094-.057-4.355-.42-1.3-1.166-2.311-2.236-3.037-1.032-.765-2.312-1.146-3.841-1.146-1.49 0-2.771.362-3.841 1.088-1.07.726-1.872 1.796-2.407 3.21-.535 1.413-.746 3.132-.631 5.157-.153 1.757.057 3.305.631 4.642.573 1.337 1.452 2.387 2.637 3.151 1.184.726 2.618 1.09 4.299 1.09 1.529 0 2.828-.306 3.898-.918a6.544 6.544 0 0 0 2.58-2.521l6.88 3.266c-.612 1.529-1.587 2.866-2.924 4.012-1.3 1.146-2.847 2.044-4.644 2.693-1.796.611-3.764.917-5.904.917Z"/>
</svg> */}
            <span className=" flex items-center ">
              {" "}
              <img className="w-10 h-10 " src={logo} alt="logo" />
            </span>
          </div>
          {/* <div className=" "> */}

          <ul className="flex flex-row p-3 flex-wrap gap-8  hidden md:flex w-2/3 md:w-auto ">
            {!user ? (
              <>
                <li className="  ">
                  <NavLink to="/home">
                    {" "}
                    <FaHome
                      className="inline  ml-2  text-gray-500 text-xl"
                      size={22}
                    />
                    الرئيسية
                  </NavLink>
                </li>
              </>
            ) : (
              <></>
            )}

            <li className="">
              <button className=" " onClick={handleshowServices}>
                <NavLink to="/Services">
                  {" "}
                  <FaFolderOpen
                    className="inline ml-2 text-gray-500 text-xl"
                    size={22}
                  />
                  الخدمات
                </NavLink>
              </button>
            </li>
            <li className=" hover:text-sky-400">
              <NavLink to="/project">
                {" "}
                <FaSuitcase
                  className="inline ml-2 text-gray-500 text-xl "
                  size={20}
                />
                المشاريع
              </NavLink>
            </li>
            <li className="">
              <NavLink to="/freelancer">
                {" "}
                <FaUsers
                  className="inline ml-2  text-gray-500 text-xl"
                  size={22}
                />
                المستقلين{" "}
              </NavLink>
            </li>
          </ul>

          {user ? (
            <>
              {/* {console.log(notificationBids)}{" "} */}
              <ul className="flex w-48 justify-between sm:w-1/4 items-center gap-2 md:mt-2 md:gap-5">
                <li>
                  {/* <NotificationDropdown/> */}

                  <button
                    onClick={handleToggleOpenNotficatuin}
                    id="dropdownNotificationButton"
                    className="relative inline-flex items-center mt-2 font-medium text-center text-gray-700  "
                    type="button"
                  >
                    <svg
                      className="w-10 h-10 md:w-8 md:h-8 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 10 20"
                    >
                      <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                    </svg>

                    <div className=" absolute block w-3 h-3 bg-red-500 border-2  border-white rounded-full   -top-0.5 start-3.5 dark:border-gray-900"></div>
                  </button>
                  {/* <p className="bg-green-700 p-4">
                    {console.log(notifications)}
                  </p> */}

                  {isOpenNot ? (
                    <>
                      <div>
                        <div
                          id="dropdownNotification"
                          className="z-20 mt-5 absolute md:left-56 md:w-1/4 sm:left-40 sm:w-full w-full left-0 max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
                        >
                          <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                            اشعارات الخدمات
                          </div>
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="divide-y divide-gray-100 dark:divide-gray-700"
                            >
                              <a
                                href="#"
                                className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <div className="w-full ps-3">
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <div className="text-xs text-blue-600 dark:text-blue-500">
                                      {" "}
                                      {notification.message}{" "}
                                      {/* {eventOrder.message} */}
                                    </div>
                                  </button>
                                  {/* <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">Jese Leos</span>: Hey, whats up? All set for the presentation?</div> */}
                                </div>
                              </a>
                            </div>
                          ))}
                          {/* <a
                            href="#"
                            className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                          >
                            <div className="inline-flex items-center ">
                              <svg
                                className="w-4 h-4  md:w-8 md:h-8 me-2 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 14"
                              >
                                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                              </svg>
                              View all
                            </div>
                          </a> */}


<div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
  <p>اشعارات المشاريع </p>
 
  <div>
    {notificationsConversion.map((notification) => (
      <div key={notification.id} className="divide-y divide-gray-100 dark:divide-gray-700">
      
         
                <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <div className="w-full ps-3">
                    <button onClick={() => fetchChat(notification.notifiable_id,notification.id)}>
                      <div className="text-xs text-white ">
                        <p>{notification.message}</p>
                      </div>
                    </button>
                  </div>
                </a>
      
      
      </div>
    ))}
    
  </div>
</div>

                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </li>
                <li>
                  {/* <NotificationDropdown/> */}

                  <button
                    onClick={handleToggleOpenMessage}
                    id="dropdownNotificationButton"
                    className="relative inline-flex items-center mt-2 font-medium text-center text-gray-700  "
                    type="button"
                  >
                    <FaList />
                    {/* <svg
                      className="w-10 h-10 md:w-8 md:h-8 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 10 20"
                    >
                      <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                    </svg> */}

                    <div className=" absolute block w-3 h-3 bg-red-500 border-2  border-white rounded-full   -top-0.5 start-3.5 dark:border-gray-900"></div>
                  </button>

                  {isOpenMessage ? (
                    <>
                      <div>
                        <div
                          id="dropdownNotification"
                          className="z-20 mt-5 absolute md:left-56 md:w-1/4 sm:left-40 sm:w-full w-full left-0 max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
                        >
                          <div className="block px-4 py-1 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                            دردشات
                          </div>
                          {/* {console.log(conversions)} */}
                          {conversions.map((conversion) => (
                            <div
                              key={conversion.id}
                              className="divide-y divide-gray-100 dark:divide-gray-700"
                            >
                           <button
                            onClick={() => fetchConversionServicesProjects(conversion)}
                            >

                            {/* <NavLink
                                to={ ''}
                                className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                              > */}
                                <div className="w-full">
                                  
                                  <div className="text-xs text-blue-600 ">
                                    {" "}
                                    <img
                                      src={person}
                                      alt="صورة الملف الشخصي"
                                      className="rounded-full w-10 h-10 md:w-8 md:h-8 inline ml-3 "
                                    />
                                    { user.id == conversion.user2.id
                                      ? `ارسل لك ${conversion.user1.firstName} رسالة`
                                      : `ارسل لك ${conversion.user2.firstName} رسالة`}
                                  </div>
                                                            </div>
                              {/* </NavLink> */}
                            </button>
                            
                            </div>
                          ))}

                          <a
                            href="#"
                            className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                          >
                            <button onClick={toggleViewAll}>
                              <div className="inline-flex items-center ">
                                <svg
                                  className="w-4 h-4  md:w-8 md:h-8 me-2 text-gray-500 dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 14"
                                >
                                  <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                </svg>
                                {viewAll ? "Show Last 5" : "View All"}
                              </div>
                            </button>
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </li>
                <li>
                  <div className="relative">
                    <button
                      className="focus:outline-none"
                      onClick={handleToggleOpenProfile}
                    >
                      <img
                        src={person}
                        alt="صورة الملف الشخصي"
                        className="rounded-full w-10 h-10 md:w-8 md:h-8  "
                      />
                    </button>

                    {isOpenProfile && (
                      <ul className="absolute bg-white left-[-60px] top-11 mt-2 py-2 w-40  rounded shadow-lg">
                        <li>
                          <button className=" hover:bg-gray-100 w-full focus:outline-none">
                            <div className="flex items-center  px-4 py-2">
                              <img
                                src={person}
                                alt="صورة الملف الشخصي"
                                className="w-8 h-8   ml-2 rounded-full"
                              />
                              <span className=" text-[12px]">اسم المستخدم</span>
                            </div>
                          </button>
                        </li>
                        <li>
                          <NavLink to="/dashboard/profile">
                            <button className="flex items-center px-4 py-2 hover:bg-gray-100 w-full focus:outline-none">
                              <RiSettingsLine className="w-5 h-5 ml-2" />
                              <span className="text-[12px]">لوحة التحكم</span>
                            </button>
                          </NavLink>
                        </li>
                        <li>
                          <button className="flex items-center px-4 py-2 hover:bg-gray-100 w-full focus:outline-none">
                            <RiAccountCircleLine className="w-5 h-5 ml-2" />
                            <span className=" text-[12px]">الرصيد</span>
                          </button>
                        </li>
                        <li>
                          <button
                            className="flex items-center px-4 py-2 hover:bg-gray-100 w-full focus:outline-none"
                            onClick={handleLogout}
                          >
                            <RiLogoutBoxLine className="w-5 h-5 ml-2" />
                            <span className=" text-[12px]"> تسجيل الخروج</span>
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </li>
              </ul>
            </>
          ) : (
            <>
              <div className="md:flex justify-between ">
                <NavLink
                  to="/Register"
                  className="text-white bg-emerald-500   hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center "
                >
                  إنشاء حساب{" "}
                </NavLink>
                <NavLink
                  to="/Login"
                  className="text-white mr-2  bg-emerald-500   hover:bg-emerald-600  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center   "
                >
                  تسجيل الدخول
                </NavLink>
              </div>
            </>
          )}

          <div className={` md:ml-4 mt-2 content  ${showSidebar ? "" : ""}`}>
            <button className=" " onClick={handleToggleSidebar}>
              <FaBars className="inline   text-xl " size={30} />
            </button>
          </div>
          <div
            className={`mt-[5.8rem] sm::mt-[5.3rem] md:mt-[5.4rem]  z-10 bg-white   content ${
              showSidebar
                ? " group-hover:block absolute top-[-20px] md:top-[-12px]   left-[-18px] text-md   p-2  text-black cursor-pointer"
                : "hidden"
            }`}
          >
            {/* <div className="flex"> */}

            <div className="   sidebar ">
              <ul className="navigation">
                <li className="py-3 px-4  text-right  hover:bg-slate-50 border-b-2  rounded-md">
                  <FaSuitcase
                    className="inline ml-2  text-gray-800 text-sm"
                    size={15}
                  />

                  <NavLink to="/project"> تصفح المشاريع</NavLink>
                </li>
                <li className="py-3 px-4  text-right  hover:bg-slate-50 border-b-2  rounded-md">
                  <FaFolderOpen
                    className="inline ml-2  text-gray-800 text-sm"
                    size={15}
                  />
                  <NavLink to="/services"> تصفح الخدمات</NavLink>
                </li>
                <li className="py-3 px-4  text-right  hover:bg-slate-50 border-b-2  rounded-md">
                  <FaUsers
                    className="inline  ml-2  text-gray-800 text-sm"
                    size={15}
                  />
                  <NavLink to="/freelancer"> تصفح المستقلين</NavLink>
                </li>
                <li className="py-3 px-4  text-right  hover:bg-slate-50 border-b-2  rounded-md">
                  <FaUsers
                    className="inline  ml-2   text-gray-800 text-sm"
                    size={15}
                  />
                  <NavLink to="/blog"> تصفح المجتمع</NavLink>
                </li>

                <li className="py-3 px-4  text-right  hover:bg-slate-50 border-b-2  rounded-md">
                  <FaPlus
                    className="inline ml-2 text-gray-800 text-sm"
                    size={15}
                  />
                  <NavLink to="/add_project"> إضافة مشروع </NavLink>
                </li>
                <li className="py-3 px-4  text-right  hover:bg-slate-50 border-b-2  rounded-md">
                  <FaPlus
                    className="inline ml-2 text-gray-800 text-sm"
                    size={15}
                  />
                  <NavLink to="/add_service"> إضافة خدمة </NavLink>
                </li>
                <li className="py-1 px-4 mt-2 text-right text-sm border-b-2 rounded-lg">
                  تصنيفات المشاريع
                  <button
                    className="py-2 px-4 ml-2 hover:bg-slate-200 rounded-lg"
                    onClick={toggleMenu2}
                  >
                    <FaAngleDown
                      className="inline  text-gray-800 text-sm"
                      size={22}
                    />

                    {/* <NavLink to="/Nested1">قائمة متداخلة 1</NavLink> */}
                  </button>
                  <ul
                    className={` ${
                      isOpen2 ? "block" : "hidden"
                    } bg-white text-sm text-gray-800 pt-1`}
                  >
                    <li className="py-2 px-4 ml-2 hover:bg-slate-50 rounded-lg ">
                      <NavLink to="/SubMenu1"> مشاريع برمجيات </NavLink>
                    </li>
                    <li className="py-2 px-4 ml-2 hover:bg-slate-50 text-sm rounded-lg ">
                      <NavLink to="/SubMenu1"> مشاريع تصاميم </NavLink>
                    </li>
                    <li className="py-2 px-4 ml-2 hover:bg-slate-50 text-sm rounded-lg">
                      <NavLink to="/SubMenu2"> مشاريع تسويق </NavLink>
                    </li>
                    <li className="py-2 px-4 ml-2 hover:bg-slate-50 text-sm rounded-lg">
                      <NavLink to="/SubMenu2">مشاريع ترجمة وكتابة </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="py-1 px-4 text-right border-b-2 text-sm   rounded-lg">
                  عرض المزيد
                  <button
                    className="py-2 px-4 ml-2  mr-9 hover:bg-slate-200 rounded-lg"
                    onClick={toggleMenu}
                  >
                    <FaAngleDown
                      className="inline text-gray-800 text-sm"
                      size={20}
                    />

                    {/* <NavLink to="/Nested1">قائمة متداخلة 1</NavLink> */}
                  </button>
                  <ul
                    className={` ${
                      isOpen ? "block" : "hidden"
                    } bg-white text-gray-800 pt-1`}
                  >
                    <li className="py-2 px-4 ml-2 hover:bg-slate-50 text-sm rounded-lg  ">
                      <NavLink to="/SubMenu1"> عن الوسيط الحر </NavLink>
                    </li>
                    <li className="py-2 px-4 ml-2 hover:bg-slate-50 text-sm rounded-lg ">
                      <NavLink to="/SubMenu1"> كيف اضمن حقوقي</NavLink>
                    </li>
                    <li className="py-2 px-4 ml-2 hover:bg-slate-50 text-sm rounded-lg">
                      <NavLink to="/SubMenu2"> الاسئلة الشائعة</NavLink>
                    </li>
                    <li className="py-2 px-4 ml-2 hover:bg-slate-50 text-sm rounded-lg">
                      <NavLink to="/SubMenu2"> الدعم الفني</NavLink>
                    </li>
                    <li className="py-2 px-4 ml-2 hover:bg-slate-50 text-sm rounded-lg">
                      <NavLink to="/SubMenu2"> سياسة الخصوصية</NavLink>
                    </li>
                    <li className="py-2 px-4 ml-2 hover:bg-slate-50 text-sm rounded-lg">
                      <NavLink to="/SubMenu2"> شروط الاستخدام </NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* </div> */}
        </div>
      </div>
    </>
  );
}
