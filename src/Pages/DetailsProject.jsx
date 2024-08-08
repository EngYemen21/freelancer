import { FaStar } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
// import ImageUSer from "../assets/logo.svg"

import { useEffect, useState } from "react";

import axios from "../axios/axios";
import BidsProject from "../Panel_Users/Projects/BidsProject";

export default function DetailsProject() {
  const { id } = useParams();
  // console.log(id);
  const [project, setProject] = useState([]);

  

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`/projects/${id}`);
      setProject(response.data.project);
  
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const stages = [
    { name: "نشر المشروع", status: "complete" },
    { name: "تلقي العروض", status: project?.status?.status == "Pending" ? "complete" : project?.status?.status == "In Progress" || project?.status?.status == "Completed" ? "complete" : "current" },
    { name: "تنفيذ المشروع", status: project?.status?.status == "In Progress" ? "complete" : project?.status?.status == "Completed" ? "complete" : "current" },
    { name: "استلام المشروع", status: project?.status?.status == "Completed" ? "complete" : "current" },
  ];
  


  return (
    <>
      <section className=" font-arabic overflow-x-hidden ">
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
              {console.log(project)}
              <img
                src={
                  project.client && (
                    <>{"http://127.0.0.1:8000/" + project.client?.image}</>
                  )
                }
                alt=""
                className="w-10 h-10 rounded-full m-2 "
              />

              <div className="flex flex-col items-start  m-2">
                <p className="text-lg pb-1">
                  
                  <NavLink to={`/user-profile/${project.client?.id}`}>
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

            <div className="flex md:flex-row flex-col    md:justify-around  ">
              <div className="flex flex-col items-start w-full  ">
                <p className="text-lg   pr-4 text-indigo-900  font-bein  hover:text-blue-800  ">
                  <NavLink >{project.title}</NavLink>
                </p>

                <p className="text-sm  text-right p-4 pt-3 mb-2 font-arabic-Cairo  w-[90%] mx-auto  ">
                  {project.description}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-evenly  border-b-2 p-2 border-b-emerald-300 border">
              <p>
                الزمن :{project.duration_in_days}
                {"  "} إيام
              </p>
              <p>العروض : 3</p>
              <p>الميزانية:{project.budget}</p>
            </div>
            <div className=" text-lg text-right mr-2 font-arabic  ">
              <p className="p-2 pt-4  border-t-2 "> المهارات المطلوبة</p>
            </div>
            <div className="mr-2 ">
              <ul className="*:rounded-lg *:m-2 *:border *:cursor-pointer *:w-fit *:inline-block *:border-green-700 *:bg-white  *:py-1 *:px-4 ">
                <li>JavaSript</li>
                <li>Laravel Php</li>
                <li>HTML</li>
                <li>JavaSript</li>
                <li>Laravel Php</li>
              </ul>
            </div>
            {
            project.status && (project.status.status ==='Pending') ? (
              <>
               <BidsProject projectUserID={project.user_id} />
              </>
            ):(<></>)
            }

       

           
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
                        سعر المشروع
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
    <p className="bg-red-700 text-white px-2 py-1">انتظار موافقة المشتري  </p>
  ): (<></>)
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
                    <div className="flex px-4 py-5 text-sm text-gray-700 border-b border-gray-200 gap-x-16 dark:border-gray-700">
                      <div className="text-black font-bold w-1/2 ">
                        عدد العروض  
                      </div>
                      <div>({3})</div>
                    </div>
                   
                  </div>
                </div>
         
             

                <div className="  w-full flex    items-center justify-between    p-4 mt-2  shadow-lg ">
                  <div className="flex items-center justify-between w-full  ">
                    <div className="flex flex-row">
                      <div>
                        <img
                          className="w-8 h-8 rounded-full"
                          src={
                            project.client && (
                              <>{"http://127.0.0.1:8000/" + project.client.image}</>
                            )
                          }
                        />
                      </div>
                      <div className="">
                      
                        <p className="text-sm mr-2 text-gray-500 truncate ">
                          {/* {getuser.Specialization} */}
                        </p>
                      </div>
                    </div>

                    <div>
                      {/* {user.id !== services.user_id && (
                        <> */}
                          {/* <div className=" text-white p-2  bg-green-500 hover:bg-green-400 border-2 rounded-lg text-sm  border-gray-200 ">
                            <button 
                            // onClick={CreateConversion}
                            >
                              تواصل مع  البائع
                            </button>
                          </div> */}
                        {/* </>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
