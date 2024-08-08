import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

import axios from "./../axios/axios";

import { useParams, useNavigate } from "react-router-dom";
// import.meta.env.REACT_APP_API_URL;
import Echo from "laravel-echo";
import Pusher from "pusher-js";
const Messanger = () => {
  const { user, csrfToken } = useAuth();
  const [messages, setMessages] = useState([]);

  const [Freelancer_id, setFreelancer_id] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [chat, setChat] = useState([]);

  const [Client_ID, setClient_ID] = useState();
  const [conversation, setConversation] = useState([]);
  const [service_id, setService_id] = useState();
  const [error, setError] = useState(null);
  const { id } = useParams();
  const history = useNavigate();
  const [serviceInfo, setServiceInfo] = useState({
    name: "محمد بندر",
    description: "تطوير موقع الالكتروني",
    freelancer: {
      name: "John Doe",
      ratings: 4.5,
      avatar: "https://picsum.photos/200",
    },
  });
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
              },
              { csrfToken }
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

  const chatAreaRef = useRef(null);
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  useEffect(() => {
    const Fetchconversations = async () => {
      try {
        axios.get(`/conversations/${id}`).then((response) => {
          console.log("/conversations", response.data);
          setConversation(response.data);
        });
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setError("You are not authorized to view this conversation.");
        } else if (err.response && err.response.status === 404) {
          setError("Conversation not found.");
        } else {
          setError("An error occurred while fetching the conversation.");
        }
      }
    };
    Fetchconversations();
    FetchMessage();

    window.Echo.private(`private-conversation.${id}`).listen(
      "ConversationEvent",
      (data) => {
        console.log("Received data:", data);

        setMessages((prevMessages) => [...prevMessages, data]);
      }
    );
    return () => {
      window.Echo.private(`private-conversation.${id}`).stopListening(
        "ConversationEvent"
      );
    };
  }, []);

  //////////////////////////////////////////////////////////////

  const FetchMessage = async () => {
    const response = await axios.get(`message/${id}`);
    const data = response.data; //20
    // console.log("hello", response.data);
    setMessages(data);
  };
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
        <button onClick={() => history.push("/")}>Go to Home</button>
      </div>
    );
  }

  if (!conversation) {
    return <div>Loading...</div>;
  }

  console.log("window.Echo.privatedata", messages);

  const handleSendMessage = async () => {
    console.log(
      "conversation.user2_id",
      conversation.user2_id,
      "conversation.user1_id:",
      conversation.user1_id
    );
    const response = await axios.post(`/conversations/${id}/messages`, {
      newMessage: newMessage,
      sender: conversation.user2_id,
      recevier: conversation.user1_id,

      type: "PublicChat",
    });
    const data = response.data;
    console.log("handleSendMessage :", data.message);
    setNewMessage("");
  };
  return (
    <>
      <div className=" w-[85%] mx-auto flex justify-between ">
        {/* Chat Section */}
        <div className="flex flex-col w-full mt-4   bg-white border border-gray-300 rounded-lg shadow-md">
          <div
            ref={chatAreaRef}
            className="flex scrollbar flex-col h-[72vh]  overflow-y-auto px-4   "
          >
            <div className={`p-2 chat-message`}>
          
              {(conversation.user1_id === user?.id ||
                conversation.user2_id === user?.id) &&
              messages &&
              messages.length > 0 ? (
                messages.map((message) => (
                  <div key={message.id} className="flex items-start gap-2.5">
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://picsum.photos/200"
                      alt="Jese image"
                    />
                    <div className="flex flex-col w-full max-w-1/2 leading-1.5">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 ">
                          {message.client_id === conversation.user2_id ? (
                            <>
                              {(message.receiver &&
                                message.receiver.firstName) ||
                                "Unknown Recipient"}
                            </>
                          ) : (
                            <>
                              {(message.sender && message.sender.firstName) ||
                                "Unknown Sender"}
                            </>
                          )}{" "}
                        </span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {" "}
                          {new Date(message.created_at).toLocaleTimeString(
                            "ar-SA",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              timeZone: "Asia/Riyadh",
                            }
                          )}
                        </span>
                      </div>
                      <p className="text-sm w-full font-normal py-2 text-gray-900">
                        {message.message}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div>No messages to display</div>
              )}
            </div>
          </div>
          <div className="flex items-center p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="w-full"
            >
              <input
                type="text"
                name="message"
                placeholder="اكتب رسالتك"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow border border-gray-300 rounded-lg p-2 w-full whitespace-normal"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  onClick={handleSendMessage}
                  className="bg-[#8e2de2] w-1/2 mt-2  text-white px-4 py-2 rounded-lg"
                >
                  إرسال
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Service Information Card */}
        <div className="flex flex-col w-1/2 m-4 h-fit bg-white border border-gray-300 rounded-lg shadow-md mb-4">
          <div className="flex items-center  p-4 border-b border-gray-300">
            {/* <h3 className="text-sm font-medium">  <span>بخصوص :  </span> {serviceInfo.name}</h3> */}
            <p className="text-green-600 00 ml-2">
              {" "}
              <span className="text-md text-black  ">بخصوص : </span>{" "}
              {serviceInfo.description}
            </p>
          </div>
          <div className="flex justify-between items-center  p-4">
            <div className="flex items-center">
              <img
                src={serviceInfo.freelancer.avatar}
                alt="صاحب الخدمة"
                className="w-10 h-10 rounded-full mr-2"
              />
              <p className="font-medium mr-2">{serviceInfo.freelancer.name}</p>
            </div>

            <div className="">
              <button className="bg-green-600 text-white text-sm py-2 px-2 cursor-auto rounded-md">
                الملف الشخصي
              </button>
              {/* <p className="text-gray-600">تقييمات ({serviceInfo.freelancer.ratings})</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messanger;
