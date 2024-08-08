import React from "react";
import { useEffect, useState } from "react";
import axios from "../axios/axios";
// import { FaComment, FaHeart, FaUser } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nav from "../Pages/Nav";

import logo from "../assets/service1.webp";
import { FaStar, FaCartPlus } from "react-icons/fa";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
import FilterServices from "./FilterService";

export default function Services() {
  const [services, setServices] = useState([]);
 const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await axios.get("/services");
      const data = response.data;
      setServices(data);
      console.log(data);
    }
 
    fetchServices();
  }, []);

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
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[23%]  bg-white border-l-2">
          <FilterServices />
        </div>

        <div className=" md:w-[77%] m-auto w-full mb-6  md:px-20 px-10 bg-gray-50  text-right">
          <div className=" md:mt-4 ">
            <div className="mb-6 mt-6 text-center block relative  ">
              <form action="">
                <input
                  className=" w-full md:w-1/2 border-1 py-3 hover:border-amber-500 text-right shadow-sm outline-none"
                  type="text"
                  name="search"
                  placeholder="ابحث مثل : تصميم"
                  id=""
                />
                <input
                  className=" absolute  left-0  outline-none md:left-[220px]  bg-amber-500 transition ease-in-out delay-150   hover:scale-[1.1] duration-300 border-1 px-6 py-3.5 "
                  type="submit"
                  value="ابحث"
                />
              </form>
            </div>

            <div className="flex w-full mb-2  flex-wrap gap-4 justify-evenly md:flex-row-reverse cursor-pointer  md:justify-evenly ">
              <div className="border-2   shadow-md md:p-10 p-6 transition ease-in-out delay-150 bg-white text-black hover:-translate-y-1 hover:scale-110  duration-300">
                <p>
                  <NavLink to="/Project">التصميم</NavLink>
                </p>
              </div>
              <div className="border-2   shadow-md md:p-10 p-6 transition ease-in-out delay-150 bg-white text-black hover:-translate-y-1 hover:scale-110  duration-300">
                <p>
                  <NavLink to="/Project"> البرمجيات</NavLink>
                </p>
              </div>
              <div className="border-2   shadow-md md:p-10 p-6 transition ease-in-out delay-150 bg-white text-black hover:-translate-y-1 hover:scale-110  duration-300">
                <NavLink to="/Project"> التسويق</NavLink>
              </div>
              <div className="border-2   shadow-md md:p-10 p-6 transition ease-in-out delay-150 bg-white text-black hover:-translate-y-1 hover:scale-110  duration-300">
                <NavLink to="/Project"> الاستشارات</NavLink>
              </div>
              <div className="border-2   shadow-md md:p-10 p-6 transition ease-in-out delay-150 bg-white text-black hover:-translate-y-1 hover:scale-110  duration-300">
                <NavLink to="/Services"> الكتابة والترجمه</NavLink>
              </div>
            </div>
          </div>

          <div className="mt-5 shadow-sm    ">
            <p className="text-2xl p-2  ">خدمات برمجيات</p>
            <Slider {...settings}>
              {services.map((service) => (
                  <div
                  key={service.id}
                  className="  bg-white  border-2 h-fit text-black rounded-xl"
                >
                  <div>
                    <div className="flex justify-center  h-fit w-full">
                      <div className="bg-white shadow-lg rounded-lg w-72   ">
                        <img 
                        src={ "http://localhost:8000/Image_Services/" + service.image }
 
                        alt="Service" className=" w-full  " />
                        <div className="p-4 h-32 overflow-hidden text-right">
                          <p>
                           {service.title}
                          </p>
                          <p className="mt-2">
                           {service.category}
                          </p>
                        </div>

                        <div className="border-t-2 flex  flex-row-reverse  justify-between  border-amber-500">
                          <div className="flex flex-row-reverse  ">
                            <div>
                        
                      
                              <img
                                src={service.image}
                                alt="Provider Icon"
                                className="w-10 h-10 mr-2 rounded-full  block mt-3"
                              />
                            </div>
                            <div className="mt-2 mr-2 text-right ">
                              <h4 className="text-md font-bold "> 
                              {
                            service.users && (<>
                             {service.users.firstName}
                            </>)
                          }
                              
                               </h4>
                              <div className="flex flex-row justify-between ">
                                <p className="text-gray-600 ">
                                  مهندس ومطور مواقع الويب{" "}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col   items-end m-2">
                            <div className="flex gap-2">
                              <p className="text-green-500 font-semibold ">
                                {service.price}$
                              </p>
                              <span>(0)</span>{" "}
                              <FaCartPlus className="mt-1 inline-block" />
                            </div>

                            <div className="flex m-2 text-gray-300 justify-start w-full ">
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                            </div>
                          </div>
                        </div>

                        <NavLink to={`/details-service/${service.id}`}>
                          <button className="p-2 text-center bg-amber-500 rounded-md shadow-sm w-full hover:bg-amber-400">
                            تصفح
                          </button>
                        </NavLink>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="mt-5 borde-2    ">
            <p className="text-2xl p-2  ">خدمات تسويق</p>
            <Slider {...settings}>
              {data.map((d) => (
                <div
                  key={d.name}
                  className="  bg-white  border-2 h-fit text-black rounded-xl"
                >
                  <div>
                    <div className="flex justify-center  h-fit w-full">
                      <div className="bg-white shadow-lg rounded-lg w-72   ">
                        <img src={logo} alt="Service" className=" w-full  " />
                        <div className="p-4 h-32 overflow-hidden text-right">
                          <p>
                            ....رنامج يقوم بربط بين طالب العمل وصاحب العمل ببث
                            مباشر على حسب معايير{" "}
                          </p>
                        </div>

                        <div className="border-t-2 flex  flex-row-reverse  justify-between  border-amber-500">
                          <div className="flex flex-row-reverse  ">
                            <div>
                              <img
                                src={logo}
                                alt="Provider Icon"
                                className="w-10 h-10 mr-2 rounded-full  block mt-3"
                              />
                            </div>
                            <div className="mt-2 mr-2 text-right ">
                              <h4 className="text-md font-bold "> {d.name} </h4>
                              <div className="flex flex-row justify-between ">
                                <p className="text-gray-600 ">
                                  مهندس ومطور مواقع الويب{" "}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col   items-end m-2">
                            <div className="flex gap-2">
                              <p className="text-green-500 font-semibold ">
                                {d.price}$
                              </p>
                              <span>(0)</span>{" "}
                              <FaCartPlus className="mt-1 inline-block" />
                            </div>

                            <div className="flex m-2 text-gray-300 justify-start w-full ">
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                            </div>
                          </div>
                        </div>

                        <NavLink to="/details-service">
                          <button className="p-2 text-center bg-amber-500 rounded-md shadow-sm w-full hover:bg-amber-400">
                            تصفح
                          </button>
                        </NavLink>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="mt-5 borde-2    ">
            <p className="text-2xl p-2  ">خدمات كتابة وترجمة</p>
            <Slider {...settings}>
              {data.map((d) => (
                <div
                  key={d.name}
                  className="  bg-white  border-2 h-fit text-black rounded-xl"
                >
                  <div>
                    <div className="flex justify-center  h-fit w-full">
                      <div className="bg-white shadow-lg rounded-lg w-72   ">
                        <img src={logo} alt="Service" className=" w-full  " />
                        <div className="p-4 h-32 overflow-hidden text-right">
                          <p>
                            ....رنامج يقوم بربط بين طالب العمل وصاحب العمل ببث
                            مباشر على حسب معايير{" "}
                          </p>
                        </div>

                        <div className="border-t-2 flex  flex-row-reverse  justify-between  border-amber-500">
                          <div className="flex flex-row-reverse  ">
                            <div>
                              <img
                                src={logo}
                                alt="Provider Icon"
                                className="w-10 h-10 mr-2 rounded-full  block mt-3"
                              />
                            </div>
                            <div className="mt-2 mr-2 text-right ">
                              <h4 className="text-md font-bold "> {d.name} </h4>
                              <div className="flex flex-row justify-between ">
                                <p className="text-gray-600 ">
                                  مهندس ومطور مواقع الويب{" "}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col   items-end m-2">
                            <div className="flex gap-2">
                              <p className="text-green-500 font-semibold ">
                                {d.price}$
                              </p>
                              <span>(0)</span>{" "}
                              <FaCartPlus className="mt-1 inline-block" />
                            </div>

                            <div className="flex m-2 text-gray-300 justify-start w-full ">
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                            </div>
                          </div>
                        </div>

                        <NavLink to="/details-service">
                          <button className="p-2 text-center bg-amber-500 rounded-md shadow-sm w-full hover:bg-amber-400">
                            تصفح
                          </button>
                        </NavLink>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="mt-5 borde-2    ">
            <p className="text-2xl p-2  ">خدمات الاستشارات</p>
            <Slider {...settings}>
              {data.map((d) => (
                <div
                  key={d.name}
                  className="  bg-white  border-2 h-fit text-black rounded-xl"
                >
                  <div>
                    <div className="flex justify-center  h-fit w-full">
                      <div className="bg-white shadow-lg rounded-lg w-72   ">
                        <img src={logo} alt="Service" className=" w-full  " />
                        <div className="p-4 h-32 overflow-hidden text-right">
                          <p>
                            ....رنامج يقوم بربط بين طالب العمل وصاحب العمل ببث
                            مباشر على حسب معايير{" "}
                          </p>
                        </div>

                        <div className="border-t-2 flex  flex-row-reverse  justify-between  border-amber-500">
                          <div className="flex flex-row-reverse  ">
                            <div>
                              <img
                                src={logo}
                                alt="Provider Icon"
                                className="w-10 h-10 mr-2 rounded-full  block mt-3"
                              />
                            </div>
                            <div className="mt-2 mr-2 text-right ">
                              <h4 className="text-md font-bold "> {d.name} </h4>
                              <div className="flex flex-row justify-between ">
                                <p className="text-gray-600 ">
                                  مهندس ومطور مواقع الويب{" "}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col   items-end m-2">
                            <div className="flex gap-2">
                              <p className="text-green-500 font-semibold ">
                                {d.price}$
                              </p>
                              <span>(0)</span>{" "}
                              <FaCartPlus className="mt-1 inline-block" />
                            </div>

                            <div className="flex m-2 text-gray-300 justify-start w-full ">
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                            </div>
                          </div>
                        </div>

                        <NavLink to="/details-service">
                          <button className="p-2 text-center bg-amber-500 rounded-md shadow-sm w-full hover:bg-amber-400">
                            تصفح
                          </button>
                        </NavLink>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
