import React from "react";
import UserProfile from "../../Pages/UserProfile";
import UserDropdown from "./UserDropdown"
import { FaSearch } from "react-icons/fa";
import NotificationDropdown from "./DropDown/NotificationDropdown";



export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className=" border-2 border-x-green-900  w-full hidden md:flex   md:flex-row md:flex-nowrap   p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          {/* <div>
              <a
            className="text-red-500  text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard  
          </a>
          </div> */}
          <form className="md:flex hidden flex-row flex-wrap  w-1/2   mr-3">
            {/* <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full  leading-snug font-normal  text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <FaSearch size={30} color="gray"/>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="px-3 border-none   py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div> */}
             <div className="relative">
      <input
        type="text"
        className="border border-gray-300 rounded-md w-full py-2 px-3  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder='ابحث اي شي'
        value={''}
        onChange={''}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <FaSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
    </div>
          </form>
          <ul className="flex-col  items-center gap-4  md:flex md:flex-row justify-end   w-1/4 list-none hidden">
           
           {/* <UserDropdown /> */}
           <NotificationDropdown/>
           <UserDropdown/>
         
          
          
         </ul>
        
        
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
