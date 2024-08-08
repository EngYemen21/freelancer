// import React, { useEffect, useState } from "react";
import React, { useEffect, useRef, useState } from 'react';
import axios from "../../../../../axios/axios";



const Dispute = () => {
  const [reports, setReports] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  useEffect(() => {
      const fetchReports = async () => {
          try {
              const response = await axios.get('/reports');
              setReports(response.data);
              console.log(response)
          } catch (error) {
              console.error("Error fetching reports:", error);
          }
      };

      fetchReports();
  }, [replyMessage]);
  
  const chatAreaRef = useRef(null);
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTo({
        top: chatAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const handleReply = async (e) => {
    e.preventDefault();
   

    if (!selectedConversationId) return;

    try {
        const response = await axios.post(`/reports/reply/${selectedConversationId}`, {
            message: replyMessage,
        });

        setReports((prevReports) =>
            prevReports.map((report) =>
                report.conversation && report.conversation.id === selectedConversationId
                    ? {
                          ...report,
                          conversation: {
                              ...report.conversation,
                              messages: [...report.conversation.messages, response.data.message],
                          },
                      }
                    : report
            )
        );

        setReplyMessage('');
    } catch (error) {
        console.error("Error sending reply:", error);
    }
};
    return (
      <div className="flex">
      <div className="w-1/4 bg-gray-100 p-4">
          <h2 className="text-xl font-bold mb-4">المستخدمين</h2>
          {reports.map((report) => (
              <div
                  key={report.id}
                  className={`p-2 mb-2 cursor-pointer ${selectedConversationId === (report.conversation && report.conversation.id) ? 'bg-blue-200' : 'bg-white'}`}
                  onClick={() => report.conversation && setSelectedConversationId(report.conversation.id)}
              >
                <div  className='flex gap-4 text-md font-arabic'>
                     <img
                      className="h-8 w-8  rounded-full"
                      src={report.user.image}
                      alt="User"
                    />
                  <p className='inline'>{report.user.firstName}</p>
                </div>
                
              </div>
          ))}
      </div>
      <div ref={chatAreaRef} className="w-[70%] mt-4">

      <div   ref={chatAreaRef} className="w-4/3 p-2 font-arabic h-[60vh]  overflow-y-auto">
          <h2 className="text-xl font-bold  mb-4">المحادثات</h2>
          <div className="mb-4">
              {reports.map((report) =>
              
                  report.conversation && report.conversation.id === selectedConversationId ? (
                      <div key={report.id}>
                      
                          {report.conversation.messages.map((message) => (
                              <div key={message.id} className="mb-2 p-2 border rounded ">
                           <div  className='flex gap-5 p-2 text-green-400 text-md font-arabic'>
                            {
                              report.admin_id == message.user_id ? (
                                <>
                                 <img
                      className="h-8 w-8  rounded-full"
                      src={report.user.image}
                      alt="User"
                    />
                  <p className='inline'>الدعم الفني</p></>
                              ):(<>
                               <img
                      className="h-8 w-8  rounded-full"
                      src={report.user.image}
                      alt="User"
                    />
                  <p className='inline'>{report.user.firstName}</p></>)
                            }
                    
                </div>
                
                                  <p className='pr-6 bg-gray-200  p-2 rounded-sm'>{message.content}</p>
                              </div>
                          ))}
                      </div>
                  ) : null
              )}
          </div>
       
        
      </div>
      <div>
          <form onSubmit={handleReply} className="flex flex-col">
              <textarea
                  className="mb-2 p-2 border rounded"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="اكتب ردك هنا"
              ></textarea>
              <button type="submit" className="self-end bg-blue-500 text-white p-2 rounded">
                  إرسال
              </button>
          </form>
          </div>
          </div>
      
  </div>

    );
};

export default Dispute;




// import axios from "../../../../../axios/axios";

// const Dispute = () => {
//   const [selectedDispute, setSelectedDispute] = useState(null);
//   const [disputes, setDisputes] = useState([]);

//   useEffect(() => {
//     const fetchDisputes = async () => {
//       try {
//         const response = await axios.get("/disputes");
//         const data = response.data;
//         setDisputes(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching disputes:", error);
//       }
//     };
//     fetchDisputes();
//   }, []);

//   const handleSelectDispute = (disputeId) => {
//     setSelectedDispute(disputeId);
//   };

//   const handleResolveDispute = async (disputeId, resolution, sendTo) => {
//     console.log(sendTo)
//     try {
//       const response = await axios.post(`/disputes/${disputeId}/resolve`, {
//         resolution,
//         send_to: sendTo,
//       });
//       console.log(response.data.message);
//       // تحديث النزاعات بعد الحل
//       setDisputes((prevDisputes) =>
//         prevDisputes.map((dispute) =>
//           dispute.id === disputeId
//             ? { ...dispute, status: "resolved", resolution }
//             : dispute
//         )
//       );
//       setSelectedDispute(null); // إعادة تعيين النزاع المحدد
//     } catch (error) {
//       console.error("Error resolving dispute:", error);
//     }
//   };

//   return (
//     <div className="flex">
//       <div className="w-1/4">
//         <DisputeList disputes={disputes} onSelectDispute={handleSelectDispute} />
//       </div>
//       <div className="w-3/4">
//         {selectedDispute ? (
//           <DisputeDetails
//             dispute={disputes.find((d) => d.id === selectedDispute)}
//             onResolveDispute={handleResolveDispute}
//           />
//         ) : (
//           <p className="text-center mt-4">حدد نزاعًا لعرض التفاصيل</p>
//         )}
//       </div>
//     </div>
//   );
// };

// const DisputeList = ({ disputes, onSelectDispute }) => {
//   return (
//     <div className="bg-gray-200 p-4 font-arabic tracking-wider">
//       <h2 className="text-lg font-semibold p-2 text-white font-arabic tracking-wider bg-red-500 mb-2">قائمة النزاعات</h2>
//       <ul>
//         {disputes.map((dispute) => (
//           <li
//             key={dispute.id}
//             className="p-2 cursor-pointer mt-2 bg-white hover:bg-gray-300"
//             onClick={() => onSelectDispute(dispute.id)}
//           >
//             {dispute.client.firstName}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const DisputeDetails = ({ dispute, onResolveDispute }) => {
//   const [resolution, setResolution] = useState("");
//   const [sendTo, setSendTo] = useState("client");

//   const handleResolveDispute = () => {
    
//     console.log()
//     onResolveDispute(dispute.id, resolution, sendTo);
//   };

//   return (
//     <div className="bg-white p-4 font-arabic tracking-wider">
     
//       <h2 className="text-lg font-semibold mb-2">{dispute.issue}</h2>
//       <div className="border-t border-gray-300 pt-4">
//         <div className="mb-2">
//           <p className="font-semibold">{dispute.client.firstName}</p>
//           <p>{dispute.issue}</p>
//           <p className="text-sm text-gray-500">{dispute.created_at}</p>
//         </div>
//       </div>
//       <div className="mt-4">
//         <label htmlFor="resolution" className="block font-semibold mb-2">
//           قم بتقديم حل للنزاع:
//         </label>
//         <textarea
//           id="resolution"
//           className="w-full p-2 border border-gray-300"
//           rows="4"
//           value={resolution}
//           onChange={(e) => setResolution(e.target.value)}
//         ></textarea>
//         <label htmlFor="sendTo" className="block font-semibold mt-4 mb-2">
//           إرسال الحل إلى:
//         </label>
//         <select
//           id="sendTo"
//           className="w-full p-2 border border-gray-300 mb-4"
//           value={sendTo}
//           onChange={(e) => setSendTo(e.target.value)}
//         >
//           <option value="client">العميل</option>
//           <option value="freelancer">المستقل</option>
//         </select>
//         <button
//           className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
//           onClick={handleResolveDispute}
//         >
//           حل النزاع
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dispute;
