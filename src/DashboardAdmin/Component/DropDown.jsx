import React, { useEffect, useRef, useState } from "react";
import { Routes, Route,NavLink } from "react-router-dom";
import Tableuser from "../Layout-Dashboard/Admin/View/Tableuser";

// Handler hook for when Outside click dropdown close
let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};
// Handler hook for when Outside click dropdown close End Code====>>

const Dropdown  = ({ data ,title ,icon }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
//   const hasTitle = data.some(item => item.title);

  let domNode = useClickOutside(() => {
    setDropdownOpen(false);
  });
//   const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      {/* <!-- ====== Dropdowns Section Start --> */}
      <section className="">
     
        
            {/* one */}
            <div ref={domNode} className=" ">
           
      <button
        onClick={handleDropdownToggle}
        className={` flex  rounded-[5px] text-base items-center font-medium text-black`}
      >
       {icon} {title}
        {/* إدارة المستخدمين */}
        <span className="">
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current mr-4 mt-1"
          >
            <path d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4063 5.65625 17.6875 5.9375C17.9687 6.21875 17.9687 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1563 10.1875 14.25 10 14.25Z" />
          </svg>
        </span>
        {/* {title} */}
      </button>
      {dropdownOpen && (
      <div> 
         <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {/* <DropdownItem label="جميع المستخدمين" href="/#" />
              <DropdownItem label="Preview" href="/#" />
              <DropdownItem label="Button" href="/#" />
              <DropdownItem label="Subscribe" href="/#" /> */}
                <ul>
        {data.map((item, index) => (
          
          <DropdownItem key={index} label={item.label} href={item.href} />
        ))}
      </ul>
            </div>
          </div>
      )}
  
            </div>
            {/* End */}
          
      </section>
      {/* <!-- ====== Dropdowns Section End -->    */}
    </>
  );
};

export default Dropdown;

 const DropdownItem = ({ label, href }) => {

   
  return (
    <>

    <NavLink
      to={href}
      className="text-body-color hover:bg-[#F5F7FD] hover:text-primary block px-5 py-2 w-full text-base"
    >
     {label}
    </NavLink>
   
       </>);
};
