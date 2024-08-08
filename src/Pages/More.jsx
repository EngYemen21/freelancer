import { useState } from "react";
import {FaSuitcase,FaFolderOpen, FaUsers ,FaAngleDown, FaBars, FaUserCircle, FaPlus } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route ,NavLink } from "react-router-dom";

export default function More() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleMenu2 = () => {
    setIsOpen2(!isOpen2);
  };


  // const handleToggleSidebar = () => {
  //   setShowSidebar(!showSidebar);
  // };

  return (
    <div className="flex">
    
      <div className=" absolute bg-white  sidebar border-4  shadow-lg">
        <ul className="navigation">
        <li className="py-2 px-4 mt-2 text-right  hover:bg-slate-200 border-b-2  rounded-lg">
          <NavLink to="/More">  تصفح المشاريع</NavLink>
          <FaSuitcase className="inline ml-2 text-gray-500 text-2xl" size={25} />

        </li>
        <li className="py-2 px-4 mt-2 text-right  hover:bg-slate-200 border-b-2 rounded-lg">
          <NavLink to="/More">  تصفح الخدمات</NavLink>
          <FaFolderOpen className="inline ml-2 text-gray-500 text-2xl" size={25} />

        </li>
        <li className="py-2 px-4 mt-2 text-right  hover:bg-slate-200 border-b-2  rounded-lg">
          <NavLink to="/More">  تصفح المستقلين</NavLink>
          <FaUsers className="inline ml-2 text-gray-500 text-2xl" size={25} />

        </li>
        <li className="py-2 px-4 mt-2 text-right  hover:bg-slate-200 border-b-2 rounded-lg">
          <NavLink to="/More">  تصفح المجتمع</NavLink>
          <FaUsers className="inline ml-2 text-gray-500 text-2xl" size={25} />

        </li>
   
        <li className="py-2 px-4 mt-2 text-right  hover:bg-slate-200 border-b-2 rounded-lg">
          <NavLink to="/More">  إضافة مشروع </NavLink>
          <FaPlus className="inline ml-2 text-gray-500 text-2xl" size={25} />

        </li>
        <li className="py-2 px-4 mt-2 text-right  hover:bg-slate-200 border-b-2  rounded-lg">
          <NavLink to="/More">  إضافة خدمة </NavLink>
          <FaPlus className="inline ml-2 text-gray-500 text-2xl" size={25} />

        </li>
        <li className="py-2 px-4 mt-2 text-right border-b-2 rounded-lg">
        تصنيفات المشاريع
          {/* <FaBars className="inline ml-1 text-gray-500 text-2xl" size={25} /> */}
          {/* <NavLink to="/More">  إضافة مشروع </NavLink> */}
          <button
        className="py-2 px-4 ml-2 hover:bg-slate-200 rounded-lg"
        onClick={toggleMenu2}
      >  
       <FaAngleDown className="inline ml-1 text-gray-500 text-2xl" size={25} />
    
        {/* <NavLink to="/Nested1">قائمة متداخلة 1</NavLink> */}
      </button>
      <ul className={` ${isOpen2 ? 'block' : 'hidden'} bg-white text-gray-800 pt-1`}>
      <li className="py-2 px-4 ml-2 hover:bg-slate-200 rounded-lg ">
                <NavLink to="/SubMenu1">   مشاريع برمجيات   </NavLink>
              </li>
              <li className="py-2 px-4 ml-2 hover:bg-slate-200 rounded-lg ">
                <NavLink to="/SubMenu1">  مشاريع تصاميم   </NavLink>
              </li>
              <li className="py-2 px-4 ml-2 hover:bg-slate-200 rounded-lg">
                <NavLink to="/SubMenu2">  مشاريع تسويق  </NavLink>
              </li>
              <li className="py-2 px-4 ml-2 hover:bg-slate-200 rounded-lg">
                <NavLink to="/SubMenu2">مشاريع ترجمة وكتابة  </NavLink>
              </li>
           
            </ul>
        </li>
        <li className="py-2 px-4 mt-2 text-right border-b-2   rounded-lg">
        عرض المزيد
           
        <button
        className="py-2 px-4 ml-2 hover:bg-slate-200 rounded-lg"
        onClick={toggleMenu}
      >   
       <FaAngleDown className="inline ml-1 text-gray-500 text-2xl" size={25} />
       
        {/* <NavLink to="/Nested1">قائمة متداخلة 1</NavLink> */}
      </button>
      <ul className={` ${isOpen ? 'block' : 'hidden'} bg-white text-gray-800 pt-1`}>
      <li className="py-2 px-4 ml-2 hover:bg-slate-200 rounded-lg  ">
                <NavLink to="/SubMenu1">  عن الوسيط الحر  </NavLink>
              </li>
              <li className="py-2 px-4 ml-2 hover:bg-slate-200 rounded-lg ">
                <NavLink to="/SubMenu1">  كيف اضمن حقوقي</NavLink>
              </li>
              <li className="py-2 px-4 ml-2 hover:bg-slate-200 rounded-lg">
                <NavLink to="/SubMenu2">  الاسئلة الشائعة</NavLink>
              </li>
              <li className="py-2 px-4 ml-2 hover:bg-slate-200 rounded-lg">
                <NavLink to="/SubMenu2">     الدعم الفني</NavLink>
              </li>
              <li className="py-2 px-4 ml-2 hover:bg-slate-200 rounded-lg">
                <NavLink to="/SubMenu2">  سياسة الخصوصية</NavLink>
              </li>
              <li className="py-2 px-4 ml-2 hover:bg-slate-200 rounded-lg">
                <NavLink to="/SubMenu2">  شروط الاستخدام </NavLink>
              </li>
            </ul>

          </li>
          <li className="py-2 px-4 mt-2 text-right  hover:bg-slate-200 rounded-lg">
          <NavLink to="/More"> تغير الوضع</NavLink>
          <FaBars className="inline ml-2 text-gray-500 text-2xl" size={25} />

        </li>
        {/* إضافة المزيد من عناصر القائمة هنا */}
      </ul>
      </div>
    

  </div>
  );
}
