import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "../axios/axios";

import { FaCartPlus, FaStar } from "react-icons/fa";
import { NavLink } from "react-router-dom";
export default function Sliders() {
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        const categoriesData = response.data;
        setCategories(categoriesData);
        //  console.log(categories)
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/users")
      .then((response) => {
        const usersData = response.data;
        setUsers(usersData);
        console.log(users);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("/services")
      .then((response) => {
        const servicesData = response.data;
        setServices(servicesData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} SamplePrevArrow`}
        // style={{ ...style, background: "green" }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} SamplePrevArrow`}
        // style={{ ...style,  background: "green"  }}
        onClick={onClick}
      />
    );
  }
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
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
          initialSlide: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <> 
    <div className="bg-gray-50 p-2">
        <h2 className="md:text-2xl text-center tracking-tighter text-1xl">
      
    الخدمات المتوفرة في موقعنا
  </h2>
  <hr className=" w-56 h-[0.15rem] mx-auto mt-4 bg-gray-400 border-0 rounded 0"/>
  </div>

   <div className=" w-full container m-auto mb-6   ">
     

      <div className="mt-5 pt-2 shadow-sm">
        <Slider {...settings} className="">
          {services.map((service) => (
            // <div className="bg-blue-500">
            <div    key={service.id}>
              <div className=" mr-2 ">
                <div
               
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
                            {service.title.split(" ").slice(0, 5).join(" ")}
                          </p>
                          {/* <p className="mt-2">{service.category}</p> */}
                          <div></div>
                        </div>

                        <div className="border-t-2 flex flex-row-reverse justify-between border-emerald-500">
                          <div className="flex flex-row-reverse    ">
                            <div>
                              <img
                                src={"http://localhost:8000/" + service.image}
                                alt="Provider Icon"
                                className="w-10 h-10 mr-2 rounded-full  block mt-2"
                              />
                            </div>
                            <div className="mt-2 h-fit mr-3 text-right">
                              <h4 className="text-sm font-bold ">
                                {" "}
                                {service.users && service.users.firstName}
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
                                <span className="text-sm ml-1">(0)</span>{" "}
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
                          <button className="p-2 text-center bg-emerald-500 text-white rounded-md shadow-sm w-full hover:bg-emerald-400">
                            تصفح
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

    
    </div>
  
    
  
   
    </>
    
 
  );
}
