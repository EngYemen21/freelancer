import ImageUser from "../../assets/person.webp"
import { useEffect, useState } from "react";
import axios from './../../axios/axios';
import { useAuth } from "../../contexts/AuthContext";

import { useParams } from "react-router-dom";
export default function Portfolio() {
    const [isOpen, setIsOpen] = useState(false);
    const [portfolio,setPortfolio]=useState({})
  const [error, setError] = useState(null);
  const { user, setUser } = useAuth();

  const { id } = useParams();
    const toggleDropdown = () => {
    
      setIsOpen(!isOpen);
    
    }
   // State to store any errors
   console.log(id)
   useEffect(() => {
    const fetchPortfolioDetails = async () => {
      try {
        const response = await axios.get(`/portfolio/${id}/details`);
        setPortfolio(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }

      
    };

    

    fetchPortfolioDetails();
  }, [id]);

  if (!portfolio) {
    return <div>Loading...</div>;
  }
    
  return (
    <>
      <section className="flex  flex-col place-items-center md:place-items-baseline  md:flex-row gap-3 justify-around bg-gray-50 mb-2   pt-4  " dir="rtl">
      
      <div className="flex flex-col  w-[90%] md:w-[60%]">
       
    <div   className=" bg-white mt-2  border-2 ">
 <div className="  mr-4  rounded-lg p-2">
   
  
 <div className="blcok text-left text-gray-900  ">
   <a
     href="#"
     className=" text-blue-800 text-xs font-medium inline-flex items-center  px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 "
   >
     <svg
       className="w-2.5 h-2.5 me-1.5"
       aria-hidden="true"
       xmlns="http://www.w3.org/2000/svg"
       fill="currentColor"
       viewBox="0 0 20 14"
     >
       <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
     </svg>
     Tutorial
   </a>
 </div>


 <h1 className=" mb-4 text-gray-900  text-3xl md:text-3xl">
  {portfolio.title}
 </h1>

 <div className="grid gap-2 justify-center">
   <div>
     <img
       className=" mb-4 max-w-xl  rounded-lg"
       src={"http://localhost:8000/" + portfolio.thumbnail      }
       alt=""
     />
   </div>
 </div>
 <div>
 <p className="text-gray-900 mt-4 ">تفاصيل العمل</p>

  
<hr className="w-48 h-1 mx-auto mt-2 mb-4 bg-gray-100 border-0 rounded dark:bg-gray-700"/>

 </div>
 <p className="text-lg font-normal text-gray-900 mb-6">
  {portfolio.description}
 </p>

</div>
</div>

        </div>

          
         
   
      
        <div className=" md:w-1/2 w-full  h-fit max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
      <div className="flex  justify-end px-4  pt-4">
        <button
          id="dropdownButton"
          className="inline-block text-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
          type="button"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>

        {isOpen && (
         <div className="relative ">
          <div
            id="dropdown"
            className="z-10 absolute left-16  text-base list-none bg-white  border-2 divide-y divide-gray-100 rounded-lg shadow w-44">
            
            <ul className="py-2" >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                 إبلغ عن مشكلة
                </a>
              </li>
          
            </ul>
          </div>
          </div>
          
        )}
      </div>
      <div className="flex flex-col items-center pb-12">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={ImageUser} // Replace with your image source
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">
          {user.firstName}  {user.lastName} 
        </h5>
        <span className="text-md text-gray-500 "> {user.field}</span>
        <div className="flex mt-2 md:mt-4">
          <a
            href="#"
            className="inline-flex items-center px-8 py-2 w-full text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
           طلب عمل مماثل
          </a>
        </div>
      </div>
    </div>
      </section>
    </>
  );
}
