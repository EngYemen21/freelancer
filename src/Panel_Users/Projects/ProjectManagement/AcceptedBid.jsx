import React, { useState, useEffect } from 'react';

import { NavLink, useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import axios from './../../../axios/axios';
import ChatProject from './ChatProject';

const AcceptedBid = ({ projectId }) => {
    const location =useLocation();
    const id= location.state ? location.state.id : null;
    const chat=location.state ? location.state.$chat : null;

  const [bids, setBids] = useState([]);
  const [selectedBid, setSelectedBid] = useState(null);

const [project, setProject] = useState([]);


useEffect(() => {
    fetchPRoject();
  }, []);

  
const fetchPRoject =async() =>{
const response=await axios.get(`projects/${id}`);
const data=response.data;
setProject(response.data.project);
console.log(data.project);
}
const stages = [
  { name: "نشر المشروع", status: "complete" },
  { name: "تلقي العروض", status: project?.status?.status == "Pending" ? "complete" : project?.status?.status == "In Progress" || project?.status?.status == "Completed" ? "complete" : "current" },
  { name: "تنفيذ المشروع", status: project?.status?.status == "In Progress" ? "complete" : project?.status?.status == "Completed" ? "complete" : "current" },
  { name: "استلام المشروع", status: project?.status?.status == "Completed" ? "complete" : "current" },
];

  return (
    <div>
    
      <section className='font-arabic overflow-x-hidden'>
      <div className="flex justify-center    ">
          <div className="w-full max-w-4xl b ">
            <div className="flex  pt-5 justify-center pr-20 ">
              {stages.map((stage, index) => (
                <div key={index} className="relative flex-0  right-0 left-0">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      stage.status === "complete"
                        ? "bg-green-500"
                        : stage.status === "current"
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div
                    className={`mt-2 ml-20  text-center ${
                      stage.status === "complete"
                        ? "text-green-500"
                        : stage.status === "current"
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {stage.name}
                  </div>
                  {index < stages.length - 1 && (
                    <div
                      className={`absolute top-5 left-1/3 w-full h-1 transform -translate-x-1/2 ${
                        stage.status === "complete"
                          ? "bg-green-500"
                          : stage.status === "current"
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex overflow-x-hidden justify-center sm:flex-row flex-col w-full">
          <div className="shadow-sm border-2 m-2 sm:w-[60%]   border-b-2 ">
            <div className="flex flex-row gap-1   justify-start   ">
              <img
                src={
                  project.client && (
                    "http://127.0.0.1:8000/" + project.client.image
                  )
                }
                alt=""
                className="w-10 h-10 rounded-full m-2 "
              />

              <div className="flex flex-col items-start  m-2">
                <p className="text-lg pb-1">
                  <NavLink to="/user-profile">
                    {project.client && <>{project.client.firstName}</>}
                  </NavLink>
                </p>
                <p className="text-sm">
                  {project.client && <>{project.client.Specialization}</>}
                </p>
              </div>
              <div className="flex flex-row gap-3 text-gray-200 mt-4 mr-12">
                <FaStar className="" /> <FaStar /> <FaStar /> <FaStar />
              </div>
            </div>

            <div className="flex md:flex-row flex-col border-b-2    md:justify-around  ">
              <div className="flex flex-col items-start w-full  ">
                <p className="text-lg   pr-4 text-indigo-900  font-bein  hover:text-blue-800  ">
                  <NavLink to="/detailsProject">{project.title}</NavLink>
                </p>

                <p className="text-sm  text-right p-4 pt-3 mb-2 font-arabic-Cairo  w-[90%] mx-auto  ">
                  {project.description}
                </p>
              </div>
            </div>
            <div>
              {/* {console.log(chat , project.id)}
              {console.log(chat)} */}

               <ChatProject projectId={project?.id} chat={chat[0] || chat}/>
            </div>
         
         

        {/* <BidsProject/> */}

           
          </div>
          <div className="mt-2 ">
            <div className="w-full  p-4 bg-white border border-gray-200 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-lg  ">
                  بطاقة المشروع
                </h5>
              </div>
              <div className=" w-full   bg-white ">
                <div id="detailed-pricing" className=" shadow-lg h-fit">
                  <p className="text-md border-2 border-gray-600 font-bold p-2">
                    بطاقة معلومات المشروع
                  </p>
                  <div className="text-center font-arabic  ">
                    <div className="flex px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                      <div className="text-black font-bold w-1/2 ">
                        سعر الخدمة
                      </div>
                      <div>{project.budget}$</div>
                    </div>

                    <div className="flex px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                      <div className="text-black font-bold w-1/2 ">
                       الحالة
                      </div>
                      <div>
                      {
                    project?.status?.status === 'Pending' ? (
    <p className="bg-blue-700 text-white px-2 py-1">تلقى العروض</p>
  ) : project?.status?.status === 'In Progress' ? (
    <p className="bg-green-700 text-white px-2 py-1">جاري التنفيذ</p>
  ) : project?.status?.status === 'Completed' ? (
    <p className="bg-red-700 text-white px-2 py-1">تم استلام المشروع</p>
  ) : project?.status?.status === 'awaiting_confirmation' ? (
    <p className="bg-red-700 text-white px-2 py-1">  بإنتظار موافقة صاحب المشروع</p>
  ) : (
    <></>
  )
}
                      </div>
                    </div>



                   
                    <div className="flex px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                      <div className="text-black font-bold w-1/2 ">
                        تاريخ النشر{" "}
                      </div>
                      <div>{project.dateTime}</div>
                    </div>
                    <div className="flex px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                      <div className="text-black font-bold w-1/2 ">
                        مدة التنفيذ
                      </div>
                      <div>
                    
                        {project.duration_in_days}
                      </div>
                    </div>
                    {/* <div className="flex px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                      <div className="text-black font-bold w-1/2 ">
                        عدد الخدمات المباعة منها
                      </div>
                      <div>({})</div>
                    </div> */}
                    <div className=" flex px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                      <div className="text-black font-bold w-1/2 ">
                        تقييم البائع
                      </div>
                      <div> {  }<FaStar className="text-yellow-300 inline mb-1 mr-1 text-center" size={15}/>4.5 </div>
                    </div>
                  </div>
                </div>
                {/* {
                  user.id !== services.user_id && ( */}
                    {/* <form action="">
                      <button
                        type="button"
                        // onClick={createOrderService}
                        className=" text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center mt-6 w-full me-2 mb-2"
                      >
                        شراء الخدمة
                      </button>
                    </form> */}
                    
             

            
              </div>
            </div>
          </div>
        </div>
      </section>
      <ul>
        {/* {bids.map(bid => (
          <li key={bid.id}>
            <p>{bid.freelancer_name}: {bid.bid_amount}</p>
            <p>{bid.bid_description}</p>
            <button onClick={() => setSelectedBid(bid)}>Select</button>
          </li>
        ))} */}
      </ul>
      {/* {selectedBid && (
        <div>
          <h4>Selected Bid</h4>
          <p>{selectedBid.freelancer_name}: {selectedBid.bid_amount}</p>
          <button onClick={handleAcceptBid}>Accept Bid</button>
        </div>
      )} */}
    </div>
  );
};

export default AcceptedBid;
