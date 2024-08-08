import React, { useState, useEffect } from "react";
import axios from "./../axios/axios"; // Assuming axios is configured
import Slider from "react-slick"; // Import Slick Slider component
import { useNavigate } from "react-router-dom";
import { FaCartPlus, FaStar } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";

const FilterServices = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const { categoryName } = useParams();
  const navigate = useNavigate();

  console.log(categoryName);
  useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        const usersData = response.data;
        setUsers(usersData.data);
        console.log(users);
      })
      .catch((error) => {
        console.error(error);
      });
    fetchMoreCategories();
    fetchCategories();
  }, []);
  const fetchMoreCategories = async () => {
    try {
      const response = await axios.get(`filter-services/${categoryName}`);
      setCategory(response.data.services);
      console.log(category);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(category);
  const fetchCategories = async () => {
    try {
      const response = await axios.get("categories");
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCategoryChange = (event) => {
    const newSelectedCategories = [...selectedCategories];
    if (event.target.checked) {
      newSelectedCategories.push(event.target.value);
      setCategory("");
    } else {
      const index = newSelectedCategories.indexOf(event.target.value);
      newSelectedCategories.splice(index, 1);
    }
    setSelectedCategories(newSelectedCategories);
    fetchServicesByCategory(newSelectedCategories);
  };

  const fetchServicesByCategory = async (selectedCategories) => {
    let queryString = "filter-services";
    navigate(); // Update URL to /services/123 with id parameter

    if (selectedCategories.length > 0) {
      queryString += `?categoryIds=${selectedCategories.join(",")}`;
    }

    try {
      const response = await axios.get(queryString);
      setServices(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const renderServices = () => {
    // history.replace('/services/');
    return (
      <>
        <div className="flex flex-row  flex-wrap  w-full p-2 gap-2 ">
          {services.map((service) => (
            <div
              key={service.id}
              className=" border-2 h-fit text-black rounded-xl"
            >
              <div>
                <div className="flex justify-between h-fit w-full">
                  <div className="bg-white shadow-lg rounded-lg w-72">
                    <img
                      src={"http://localhost:8000/" + service.image}
                      alt="Service"
                      className="w-full h-44"
                    />
                    <div className="p-3 overflow-hidden text-right">
                      <p>{service.title.split(" ").slice(0, 5).join(" ")}</p>
                      <p className="mt-2">{service.category}</p>
                    </div>

                    <div className="border-t-2 flex flex-row flex-wrap justify-between">
                      <div className="flex flex-row justify-between place-items-center w-full">
                        <div className="w-fit mr-2">
                          <img
                            src={"http://localhost:8000/" + service.image}
                            alt="Provider Icon"
                            className="w-10 h-10 mr-4 rounded-full block mt-3"
                          />
                        </div>
                        <div className="mt-2 mr-2 h-fit w-full">
                          <h4 className="text-md font-bold">
                           

                            {service.users &&
                              service.users.firstName && ( 
                                <p className="text-gray-500">
                                  {" "}
                                  {service.users.firstName}
                                </p>
                              )}
                          </h4>
                        </div>
                        <div className="ml-1.5">
                          <p className="text-green-500 mt-2 font-semibold">
                            {service.price}$
                          </p>
               
                        </div>
                      </div>

                      <div className="flex flex-row w-full place-items-center justify-between m-1.5">
                        <div className="">
                          <p className="text-gray-600">مطور مواقع الويب </p>
                        </div>

                        <div className="flex m-2 text-gray-300">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                      </div>
                    </div>
                    <NavLink to={`/details-service/${service.id}`}>
                      <button className="p-2 text-center bg-green-500 text-white rounded-md shadow-sm w-full hover:bg-green-400">
                        تصفح
                      </button>
                    </NavLink>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };
  const renderServicesfilter = () => {
   
    return (
      <>
       <div className="mt-5 border-2 flex flex-col items-center md:flex-row flex-wrap gap-2 bg-white rounded-xl">
      {category.length > 0 ? (
        <>
          {category.map((service) => (
            <div key={service.id} className="m-2">
              <div className="flex justify-center h-fit w-full">
                <div className="bg-white shadow-lg rounded-lg w-72">
                  <img
                    src={"http://localhost:8000/" + service.image}
                    alt="Service"
                    className="w-full h-36 object-cover" // Set image size and object-cover for responsive scaling
                  />
                  <div className="p-2 h-20 w-full text-right">
                    <p className="text-base line-clamp-2 overflow-hidden whitespace-wrap text-ellipsis">
                      {service.title}
                    </p>
                  </div>

                  <div className="border-t-2 flex flex-row justify-between border-amber-500">
                    <div className="flex flex-row">
                      <div>
                        <img
                          src={"http://localhost:8000/" + service.image}
                          alt="Provider Icon"
                          className="w-10 h-10 mr-2 rounded-full block mt-3"
                        />
                      </div>
                      <div className="mt-2 mr-3 text-right">
                        <h4 className="text-md font-bold">
                          {/* {service.users && service.users.firstName && ( */}
                            <p className="text-gray-500">{service.users.firstName}</p>
                          {/* // )} */}
                        </h4>
                        <div className="flex flex-row mb-2 justify-between">
                          <span className="text-gray-600">{service.category.name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end mt-2 mb-2">
                      <div className="flex flex-row ml-1">
                        <p className="text-green-500 font-semibold">{service.price}$</p>
                        <p>
                          <span className="text-gray-600">(0)</span> <FaCartPlus className="inline-block" />
                        </p>
                      </div>
                      <div className="flex m-2 ml-0 text-gray-300 justify-end w-fit">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                    </div>
                  </div>

                  <NavLink to={`/details-service/${service.id}`}>
                    <button className="p-2 text-center bg-green-500 text-white rounded-md shadow-sm w-full hover:bg-green-400">
                      تصفح
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="h-32 w-full text-center pt-14">لم يتم إضافة الخدمات.</p>
      )}
    </div>
      </>
    );
  };
  return (

    <>
    
        <div className="w-1/3 m-auto mt-2" >
               <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input className="placeholder:italic  placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
            </label>
        </div>
   
    <div className="">
    
        
      <div className="flex flex-col md:flex-row">
        
        <div className="md:w-full  bg-white shadow-md border-r border-gray-300">
     
          <label
            htmlFor="categories"
            className="block text-gray-700 text-2xl font-bold mt-4 mb-2 px-4 py-2"
          >
            تصنيفات
          </label>
          <div className="overflow-y-auto px-4 py-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center p-2  mb-2">
                <input
                  type="checkbox"
                  id={category.name}
                  name={category.name}
                  value={category.name}
                  checked={selectedCategories.includes(category.name)}
                  onChange={handleCategoryChange}
                  className="ml-3 accent-blue-500"
                />
                <label htmlFor={category.name} className="text-gray-700">
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        {category ? (
          <>{renderServicesfilter()}</>
        ) : (
          <>
            <div className=" ">
              {services.length > 0 && (
                <div className="flex flex-col w-full  mb-4">
                  <h2 className="text-xl font-bold mb-2">الخدمات المختارة:</h2>
                  {renderServices()}
                </div>
              )}
              {services.length === 0 && selectedCategories.length > 0 && (
                <p className="text-gray-600">لا توجد خدمات لهذه الفئات.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default FilterServices;
