import React, { useEffect, useState } from 'react';
import axios from '../../../../../axios/axios';

const ConversationList = ({ conversations, onSelectConversation, onSearch }) => {
    const [searchText, setSearchText] = useState('');
  
    const handleSearch = (e) => {
      setSearchText(e.target.value);
      onSearch(e.target.value);
    };
  
    return (
      <div className="bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-2">قائمة المحادثات</h2>
        <input
          type="text"
          placeholder="ابحث عن محادثة"
          value={searchText}
          onChange={handleSearch}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className="p-2 cursor-pointer hover:bg-gray-300"
              onClick={() => onSelectConversation(conversation.id)}
            >
              {conversation.user1.firstName}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  const ConversationDetails = ({ conversation }) => {
    const [messages, setMessages] = useState([]);
    console.log(conversation.id);

    useEffect(()=>{

      const FetchMessage = async () => {
        const response = await axios.get(`message/${conversation.id}`);
        const data = response.data; //20
        console.log("hello", response.data);
        setMessages(data); 
     
      };
      FetchMessage()
    },[])

    return (
      <div className="bg-white p-4">
        <h2 className="text-lg font-semibold mb-2">تفاصيل</h2>
        <div className="border-t border-gray-300 pt-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-2">
              {
                message.client_id !==message.receiver.id ?(
                  <>
                  <p className="font-semibold">{message.receiver
.firstName}</p>
                  </>
                ):
                (
                  <>                  <p className="font-semibold">{message.sender
                    .firstName}</p></>
                )
              }
              
              <p className='p-3 bg-gray-100 m-2 '>{message.message}</p>
              <p className="text-sm text-gray-500">{message.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
const ChatOverview = () => {
    const [selectedConversation, setSelectedConversation] = useState(null);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);

  
  useEffect(()=>{
    const Fetchconversations = async () => {
      try {
      
        axios
          .get(`/conversations`)
          .then((response) => {
            console.log("conversations", response.data[0].user1.firstName);
            setConversations(response.data);
            
          });
      } 
      catch (err) {
        if (err.response && err.response.status === 403) {
          setError('You are not authorized to view this conversation.');
        } else if (err.response && err.response.status === 404) {
          setError('Conversation not found.');
        } else {
          setError('An error occurred while fetching the conversation.');
        }
      }
    };
    Fetchconversations();

  },[])

  // const conversations = [
  //   {
  //     id: 1,
  //     title: 'محادثة 1',
  //     messages: [
  //       { id: 1, sender: 'العميل', text: 'مرحبًا، أود مناقشة التفاصيل الخاصة بالمشروع.', timestamp: '10:00 ص' },
  //       { id: 2, sender: 'المستقل', text: 'طبعًا، أنا مستعد لذلك.', timestamp: '10:05 ص' },
  //       { id: 3, sender: 'العميل', text: 'هل يمكنك إرسال عينة من أعمالك السابقة؟', timestamp: '10:10 ص' },
  //     ],
  //   },

  //   {
  //       id: 2,
  //       title: 'دردشه 2',
  //       messages: [
  //         { id: 1, sender: 'العميل', text: 'مرحبًا، أود مناقشة التفاصيل الخاصة .', timestamp: '10:00 ص' },
  //         { id: 2, sender: 'المستقل', text: 'طبعًا، أنا مستعد لذلك.', timestamp: '10:05 ص' },
  //         { id: 3, sender: 'العميل', text: 'هل يمكنك إرسال عينة من أعمالك السابقة؟', timestamp: '10:10 ص' },
  //       ],
  //     },
  //   // إضافة المحادثات الأخرى هنا...
  // ];

  const handleSelectConversation = (conversationId) => {
    setSelectedConversation(conversationId);
  };

  const handleSearch = (searchText) => {
    if (searchText === '') {
      setFilteredConversations([]);
    } else {
      const filtered = conversations.filter((conversation) =>
        conversation.title.includes(searchText)
      );
      setFilteredConversations(filtered);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <ConversationList
          conversations={filteredConversations.length > 0 ? filteredConversations : conversations}
          onSelectConversation={handleSelectConversation}
          onSearch={handleSearch}
        />
      </div>
      <div className="w-3/4">
        {selectedConversation ? (
          <ConversationDetails conversation={conversations.find((c) => c.id === selectedConversation)} />
        ) : (
          <p className="text-center mt-4">حدد محادثة لعرض التفاصيل</p>
        )}
      </div>
    </div>
  );
  };

export default ChatOverview;
