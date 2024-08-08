import React, { useState, useEffect } from "react";
import ImageUSer from "../assets/react.svg";
import {
  FaCartPlus,
  FaConnectdevelop,
  FaEye,
  FaIdCard,
  FaPhone,
  FaStar,
} from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import axios from './../axios/axios';


export default function Freelancer() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategories] = useState([]);
    const [calculateOverallScore, setCalculateOverallScore] = useState();


  const [userData, setUserData] = useState([]);

  const fetchCategories = async () => {
    try {
        const response = await axios.get(`/categories`);
        const data=(await response.data)
        setCategories(data);
        console.log(response.data)
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users`);
        const data=(await response.data)
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error(error); 
      }
    };
    fetchCategories();
    fetchUserData();

  }, []);
  const handleCategoryChange = (e) => {
    console.log(e.target.value)
    const { value, checked } = e.target;
    setSelectedCategories(prevState => {
        const updatedCategories = checked 
            ? [...prevState, value] 
            : prevState.filter(category => category !== value);
            console.log(updatedCategories)
        // fetchProjects(updatedCategories);
        return updatedCategories;
    });
  };
  useEffect(()=>{

    const fetchRatingUser = async () => {
  
   
  const response = await axios.get(`/get/${userData.id}/rating`);
  const data =(await response.data.overall_score);
  setCalculateOverallScore(data);
 
};
fetchRatingUser();
},[])
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const response = await axios.get(`/users`);
//         const data = response.data;
//         setServiceData(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Failed to fetch service:", error);
//       }
//     };

//     fetchServices();
//   }, []);
  //   },[])
//   console.log("userData", userData[0].firstName);
  //   console.log("setServiceData",serviceData)
  return (
    <>
      <section className=" font-arabic bg-gray-50">
      <div className="flex flex-col sm:flex-row  ">
      <div className="md:w-[30%]   border-l-2">
          
          <div className="bg-white h-auto  p-3 ml-2">
              <label className="text-xl m-2  tracking-wider text-gray-700 font-semibold" htmlFor="category"> التصنيفات:</label>
              {categories.map(category => (
                  <div key={category.id} className="m-4 mb-2 tracking-wider text-gray-700 font-semibold bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 ">
                      <input
                      className="me-3 p-2 m-2   font-medium text-green-500 "
                          type="checkbox"
                          value={category.id}
                          checked={selectedCategory.includes(category.id.toString())}
                          onChange={handleCategoryChange}
                      />
                      <label>{category.name}</label>
                  </div>
              ))}
          </div>
        </div>
        <div className=" w-full   text-center flex flex-wrap">
        {userData.length > 0 &&
    userData.map((userData) => (
                    <div key={userData.id} className="bg-white md:w-1/4 w-full flex flex-col  p-4 m-2  shadow-lg ">
                    <img
                      src={"http://localhost:8000/" + userData.image}
                      alt=""
                      className="bg-green-300 block mx-auto rounded-full w-28 h-28"
                    />
                    <div className="">
                      <p className="text-md pt-2"> {userData.firstName}</p>
                      <span> {userData.Specialization}</span>
                      {/* <span> admin </span> */}
                      <div className="flex flex-row justify-center gap-1 m-2">
                        <FaStar color="gray" /> <FaStar color="gray" />{" "}
                        <FaStar color="gray" /> <FaStar />{" "}
                        {/* <span className="text-[12px]">({userData.averageRating.toFixed(1) || 0.0})</span> */}
                        <span className="text-[12px]">({calculateOverallScore} || )</span>
                      </div>
                      <div>
                        <p className="text-[15px]">
                          اخر ظهور : <span>منذ يوم</span> <FaEye className="inline" />
                        </p>
                        <button className="px-11 py-2 w-full mt-2 shadow-md border-none outline-none  rounded-md bg-blue-500 text-white">
                          <NavLink to={`/user-profile/${userData.id}`}>
                            {" "}
                            {/* <FaPhone className="inline ml-2" /> */}
                    الملف الشخصي
                          </NavLink>
                        </button>
                      </div>
                    </div>
                  </div>
                

            ))}
        

     
        </div>
        </div>
      </section>
    </>
  );
}
