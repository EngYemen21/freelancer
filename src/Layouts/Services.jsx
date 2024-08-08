import React from "react";
import { useEffect, useState } from "react";
import axios from "../axios/axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import { FaStar, FaCartPlus } from "react-icons/fa";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
import FilterServices from "./FilterService";
import { useAuth } from "../contexts/AuthContext";

export default function Services() {
  const [services, setServices] = useState([]);
  
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user, setUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errors, setErrors] = useState({
    categoriesError: null,
    usersError: null,
    servicesError: null,
  });

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/services/${searchTerm}/search`);
      setSearchResults(response.data);
      console.log(searchResults);
    } catch (error) {
      console.error("Error searching services:", error);
    }
  };

  useEffect(() => {
    axios.get("/categories").then((response) => {
        const categoriesData = response.data;
        setCategories(categoriesData);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setErrors((prevErrors) => ({...prevErrors,categoriesError: "Failed to fetch categories.", }));
      });
    axios.get("/users").then((response) => {
        const usersData = response.data;
        setUsers(usersData);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setErrors((prevErrors) => ({ ...prevErrors,usersError: "Failed to fetch users.",}));
      });

    axios.get("/services").then((response) => {
        const servicesData = response.data;
        setServices(servicesData);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setErrors((prevErrors) => ({...prevErrors, servicesError: "Failed to fetch services.", }));
      });
  }, []);

 

  const getServiceOwner = (userId) => {
    return users.find((user) => user.id === userId);
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <>
      <div className="flex flex-row">
      
        <div className="  w-full mb-6  md:px-12 px-8 bg-gray-50  text-right">
          <div className=" md:mt-4 ">
            <div className="mb-6 mt-6 text-center block relative  ">
              <form className="max-w-md mx-auto">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-black border border-green-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Web, Logos..."
                    required
                  />
                  <button
                    type="submit"
                    onClick={handleSearch}
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            <div className="flex w-full mb-2  flex-wrap gap-4 justify-evenly md:flex-row-reverse cursor-pointer  md:justify-evenly ">
              <div className="border-2 text-md border-green-100  shadow-md md:p-10 p-6 transition ease-in-out delay-150 bg-white text-black hover:-translate-y-1 hover:scale-110  duration-300">
                <p>
                  <NavLink to="/Project">التصميم</NavLink>
                </p>
              </div>
              <div className="border-2 text-md border-green-100  shadow-md md:p-10 p-6 transition ease-in-out delay-150 bg-white text-black hover:-translate-y-1 hover:scale-110  duration-300">
                <p>
                  <NavLink to="/Project"> البرمجيات</NavLink>
                </p>
              </div>
              <div className="border-2 border-green-100  text-md shadow-md md:p-10 p-6 transition ease-in-out delay-150 bg-white text-black hover:-translate-y-1 hover:scale-110  duration-300">
                <NavLink to="/Project"> التسويق</NavLink>
              </div>
              <div className="border-2 border-green-100  text-md shadow-md md:p-10 p-6 transition ease-in-out delay-150 bg-white text-black hover:-translate-y-1 hover:scale-110  duration-300">
                <NavLink to="/Project"> الاستشارات</NavLink>
              </div>
              <div className="border-2 border-green-100   shadow-md md:p-10 p-6 text-md transition ease-in-out delay-150  text-black hover:-translate-y-1 hover:scale-110  duration-300">
                <NavLink to="/Services"> الكتابة والترجمه</NavLink>
              </div>
            </div>
          </div>
          <div>
            {searchTerm && searchResults.length > 0 ? (
              <>
                <div className=" flex flex-wrap justify-between font-arabic">
                 

                  {searchResults.map((service) => (
                    
                    <>
                      <div className=" md:w-[18rem]  sm:w-1/3 ">
                        <div
                          key={service.id}
                          className="border-2 h-fit  flex flex-col text-black rounded-xl"
                        >
                          <div className="w-full ">
                            <div className="  h-fit">
                              <div className="bg-white shadow-lg  rounded-lg ">
                                <img
                                  src={"http://localhost:8000/" + service.image}
                                  alt="Service"
                                  className="w-full h-36"
                                />
                                <div className="p-2 overflow-hidden text-right">
                                  <p>
                                    {service.title
                                      .split(" ")
                                      .slice(0, 5)
                                      .join(" ")}
                                  </p>
                                  <p className="mt-2">{service.category}</p>
                                </div>

                                <div className="border-t-2 flex flex-row justify-between border-emerald-500">
                                  <div className="flex flex-row    ">
                                    <div>
                                      <img
                                        src={
                                          "http://localhost:8000/" +
                                          service.image
                                        }
                                        alt="Provider Icon"
                                        className="w-10 h-10 mr-2 rounded-full  block mt-2"
                                      />
                                    </div>
                                    <div className="mt-2 h-fit mr-3 text-right">
                                      <h4 className="text-sm font-bold ">
                                        {" "}
                                        {service.users &&
                                          service.users.firstName}
                                      </h4>
                                      <div className="flex flex-row mb-2  justify-between ">
                                        <span className="text-sm  text-gray-600 ">
                                          {service.users.field}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="  mt-2 mb-2 ml-1 ">
                                    <div className="flex flex-row ">
                                      <p className="text-green-500   ">
                                        {service.price}$
                                      </p>

                                      <p>
                                        {" "}
                                        <span className="text-sm ml-1">
                                          (0)
                                        </span>{" "}
                                        <FaCartPlus className="text-sm inline-block " />
                                      </p>
                                    </div>

                                    <div className="flex  ml-0 text-gray-300 w-fit ">
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                      <FaStar />
                                    </div>
                                  </div>
                                </div>

                                <NavLink to={`/details-service/${service.id}`}>
                                  <button className="p-2 text-center bg-emerald-500  text-white rounded-md shadow-sm w-full  font-arabic hover:bg-emerald-400">
                                    تصفح
                                  </button>
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}

                </div>
              </>
            ) : (
              <>
                <div className="mt-5  shadow-sm">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xl  m-6 p-2 ">{category.name}</p>
                        </div>
                        <button className="bg-emerald-400 py-1 md:px-12  px-4 m-[20px] text-white rounded-md ">
                          <NavLink to={`/services/${category.id}`}>
                            المزيد
                          </NavLink>
                        </button>
                      </div>

                      <Slider {...settings} className="">
                        {services
                          .filter(
                            (service) => service.category_id === category.id
                          )
                          .map((service) => (
                            // <div className="bg-blue-500">
                            // <>
                              <div  key={service.id} className=" md:w-[17rem] w-full">
                                <div
                                 
                                  className="border-2 h-fit  flex flex-col text-black rounded-xl"
                                >
                                  <div className="w-full ">
                                    <div className="  h-fit">
                                      <div className="bg-white shadow-lg  rounded-lg ">
                                        <img
                                          src={
                                            "http://localhost:8000/" +
                                            service.image
                                          }
                                          alt="Service"
                                          className="w-full h-36"
                                        />
                                        <div className="p-2 overflow-hidden text-right">
                                          <p>
                                            {service.title
                                              .split(" ")
                                              .slice(0, 5)
                                              .join(" ")}
                                          </p>
                                          <p className="mt-2">
                                            {service.category}
                                          </p>
                                        </div>

                                        <div className="border-t-2 flex flex-row-reverse justify-between border-emerald-500">
                                          <div className="flex flex-row-reverse    ">
                                            <div>
                                              <img
                                                src={
                                                  "http://localhost:8000/" +
                                                  service.image
                                                }
                                                alt="Provider Icon"
                                                className="w-10 h-10 mr-2 rounded-full  block mt-2"
                                              />
                                            </div>
                                            <div className="mt-2 h-fit mr-3 text-right">
                                              <h4 className="text-sm font-bold ">
                                                {" "}
                                                {service.users &&
                                                  service.users.firstName}
                                              </h4>
                                              <div className="flex flex-row mb-2  justify-between ">
                                                <span className="text-sm  text-gray-600 ">
                                                  {service.users.field}
                                                </span>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="  mt-2 mb-2 ml-1 ">
                                            <div className="flex flex-row ">
                                              <p className="text-green-500   ">
                                                {service.price}$
                                              </p>

                                              <p>
                                                {" "}
                                                <span className="text-sm ml-1">
                                                  (0)
                                                </span>{" "}
                                                <FaCartPlus className="text-sm inline-block " />
                                              </p>
                                            </div>

                                            <div className="flex  ml-0 text-gray-300 w-fit ">
                                              <FaStar />
                                              <FaStar />
                                              <FaStar />
                                              <FaStar />
                                            </div>
                                          </div>
                                        </div>

                                        <NavLink
                                          to={`/details-service/${service.id}`}
                                        >
                                          <button className="p-2 text-center text-white font-semibold bg-emerald-500 rounded-md shadow-sm w-full hover:bg-emerald-400">
                                            تصفح
                                          </button>
                                        </NavLink>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                        
                          ))}
                      </Slider>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
