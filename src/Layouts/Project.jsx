
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

import { NavLink } from "react-router-dom";

import axios from "../axios/axios";


export default function Project() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategories] = useState([]);

  useEffect(() => {
    
    fetchCategories();
    fetchProjects();
  }, []);



  const fetchProjects = async (selectedCategory = []) => {
    try {
      const response = await axios.get("/projects" , { params: { selectedCategory: selectedCategory.join(',') } })
      setProjects(response.data);
      console.log(response);
      // console.log(typeof response.data.projects[0].client);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchCategories = async () => {
    try {
        const response = await axios.get(`/categories`);
        setCategories(response.data);
        console.log(response)
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};


const handleCategoryChange = (e) => {
  console.log(e.target.value)
  const { value, checked } = e.target;
  setSelectedCategories(prevState => {
      const updatedCategories = checked 
          ? [...prevState, value] 
          : prevState.filter(category => category !== value);
          console.log(updatedCategories)
      fetchProjects(updatedCategories);
      return updatedCategories;
  });
};


  return (
    <>
      <section className=" bg-gray-100">
        <div className="flex  justify-between  p-4">
          <div>
            <p className=" px-6 py-2 text-xl   tracking-wider text-gray-700 font-semibold"> المشاريع المعروضة</p>
          </div>
           <div className="flex justify-end">
            <button className=" px-6 py-1 rounded-md bg-green-500 shadow-md text-white">  <NavLink to='/add_project'>اضف مشروع</NavLink>  </button>
           
          </div>
        </div>
     
        <div className="flex flex-col sm:flex-row  ">
          <div className="md:w-[30%]  mr-2 border-l-2">
          
            <div className="bg-white h-auto p-3 ml-2">
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
          <div className="w-full  bg-white  flex flex-col">
          
            <div>
            <div className="w-full  ">
              {projects.map((project) => (
                <div key={project.id} >
                  <div className="flex flex-row m-1 ">
                    <div>
                      <img
                        src={'http://127.0.0.1:8000/'+ project.client.image}
                        alt=""
                        className="w-10 h-10 rounded-full m-2 "
                      />
                    </div>

                    <div className="flex flex-col m-1">
                      <div>
                        <NavLink to={`/user-profile/${project.client.id}`} className="text-lg pb-1">
                          {/* {user.firstName} */}
                          {project.client.firstName}
                        </NavLink>
                      </div>

                      <div className=" flex ">
                        <p className="text-sm">
                          {" "}
                          {project.client.Specialization}
                        </p>
                        <p className="text-sm pr-2"> {project.client.city}</p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-3 text-gray-200 mt-3 mr-2">
                      <FaStar className="" /> <FaStar /> <FaStar /> <FaStar />{" "}
                      <FaStar />
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-full border-b-2 ">
                    <p className="text-lg   pr-4 text-indigo-900 underline font-bein underline-offset-auto hover:text-blue-800  ">
                      <NavLink to={`/detailsProject/${project.id}`}>
                        {project.title}
                      </NavLink>
                    </p>

                    <p className="text-sm  text-right p-4 pt-3 mb-2 font-arabic-Cairo  w-[90%] mx-auto  ">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-row justify-evenly  border-b-2 p-2 border-b-emerald-300 border">
                    <p>
                      الزمن :{project.duration_in_days}
                      {"  "} إيام
                    </p>
                    <p>العروض : 10</p>
                    <p>الميزانية:{project.budget}</p>
                    {/* <p>الزمن :{project.dateTime} </p> */}
                  </div>
                </div>
              ))}
            </div>
          
          </div>
          </div>
         

        
        </div>
      </section>
    </>
  );
}
