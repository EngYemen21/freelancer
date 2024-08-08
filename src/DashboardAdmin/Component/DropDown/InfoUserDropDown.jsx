import React from "react";
import { createPopper } from "@popperjs/core";
// import UserImage from "../../../assets/img/team-3-800x800.jpg"
// import UserImage from "../../assets/person.webp"
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const InfoUserDropDown = ({data ,image}) => {



   

    
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm  bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            {/* <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-md"
              src={<image/>}
            /> */}
            {image}

            
          </span>
        
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          " text-base z-50 bg-white   float-left py-2 list-none text-right rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4  font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
        {data[0].label}
        </a>
        <NavLink
          to="/admin/dashboard/edite-user"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
       
        >
        {data[1].label}
        </NavLink>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
         {data[2].label}
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
           {data[3].label}

        </a>
      </div>
    </>
  );
};

export default InfoUserDropDown;
