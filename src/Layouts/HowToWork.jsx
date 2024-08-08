import { useState } from "react";
import {  FaBalanceScale, FaCartPlus,  FaCheck,  FaPlus,  FaSearch, FaTruck } from "react-icons/fa";

export default function HowToWork() {
    const [isService,setisService]=useState(true);
    const handel=()=> {
        setisService(!isService);
    }
  return (
    <div className="bg-gray-50 border-dashed border-t-8 border-emerald-500" >

    
    <div className="container mx-auto grid  justify-items-center">
       <h2 className="text-2xl tracking-tighter sm:text-2xl mt-12 m-6"> كيف يعمل موقعنا</h2>
      <div className="flex flex-row justify-around w-full  pb-3 "> 
      <button type="button" onClick={handel} className="text-white bg-emerald-500 hover:bg-emerald-300 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg md:px-14 md:py-4 px-6  ">
        المشاريع
        </button>
        <hr className=" text-3xl  bg-emerald-200 w-full  h-1   "/>
       

      
        <button type="button" onClick={handel} className="text-white bg-emerald-500 hover:bg-emerald-300 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg md:px-14 md:py-4  p-2 px-6  ">
الخدمات
</button>
      </div>
      </div>
    {
         isService ? (
            <section className="w-full border-1  bg-white py-2 md:py-4">
            <div className="container mx-auto flex flex-col md:flex-row  items-center justify-center gap-4 px-4 text-center md:gap-10 md:px-6">
              <div className="space-y-3">
               
             
              </div>
              <div className="flex w-full flex-col md:flex-row   gap-6 justify-around ">
                <div className="flex flex-col items-center justify-center space-y-2 border p-2 border-gray-200 rounded-lg shadow-sm transition-transform hover:scale-105 hover:shadow-md ">
                  <div className="flex items-center justify-center w-fit h-fit bg-gray-50 rounded-t-lg">
                    <FaSearch className="w-8 h-8" />
                  </div>
                  <div className="grid gap-1 p-4 text-center" >
                    <h3 className="text-sm font-bold tracking-wide md:text-base "  >1. تصفح الخدمات</h3>
                    <p className="text-xs  md:text-sm/relaxed ">
                    تصفح الخدمات المتوفرة وقارن بينها لتختار الأنسب لك
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 border p-2 border-gray-200 rounded-lg shadow-sm transition-transform hover:scale-105 hover:shadow-md ">
                  <div className="flex items-center justify-center w-fit h-fit bg-gray-50 rounded-t-lg ">
                    <FaCartPlus className="w-8 h-8" />
                  </div>
                  <div className="grid gap-1 p-4 text-center">
                    <h3 className="text-sm font-bold tracking-wide md:text-base">2. اطلب خدمة</h3>
                    <p className="text-xs  md:text-sm/relaxed">
                    أطلب الخدمة و تابع التنفيذ مع البائع
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 border p-2 border-gray-200 rounded-lg shadow-sm transition-transform hover:scale-105 hover:shadow-md ">
                  <div className="flex items-center justify-center w-fit h-fit bg-gray-50 rounded-t-lg ">
                    <FaTruck className="w-8 h-8" />
                  </div>
                  <div className="grid gap-1 p-4 text-center">
                    <h3 className="text-sm font-bold tracking-wide md:text-base">3. استلم الخدمه</h3>
                    <p className="text-xs md:text-sm/relaxed ">
                    استلم خدمتك بالجودة وفي الموعد المتفق عليه              </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
         ): (
            <section className="w-full border-1  bg-white mt-4 py-2 md:py-4">
            <div className="container mx-auto flex flex-col md:flex-row  items-center justify-center gap-4 px-4 text-center md:gap-10 md:px-6">
              <div className="space-y-3">
              
              </div>
              <div className="flex w-full flex-col md:flex-row  gap-6 justify-around ">
                <div className="flex flex-col items-center justify-center space-y-2 border p-2 border-gray-200 rounded-lg shadow-sm transition-transform hover:scale-105 hover:shadow-md ">
                  <div className="flex items-center justify-center w-fit h-fit bg-gray-50 rounded-t-lg">
                    <FaPlus className="w-8 h-8" />
                  </div>
                  <div className="grid gap-1 p-4 text-center" >
                    <h3 className="text-sm font-bold tracking-wide md:text-base "  >أَنْشِئْ مشروع  </h3>
                    <p className="text-xs  md:text-sm/relaxed ">
                    أضف تفاصيل مشروعك والمهارات المطلوبة لإنجازه وابدأ باستقبال عروض المستقلين عليه.                   </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 border p-2 border-gray-200 rounded-lg shadow-sm transition-transform hover:scale-105 hover:shadow-md ">
                  <div className="flex items-center justify-center w-fit h-fit bg-gray-50 rounded-t-lg ">
                    <FaBalanceScale className="w-8 h-8" />
                  </div>
                  <div className="grid gap-1 p-4 text-center">
                    <h3 className="text-sm font-bold tracking-wide md:text-base">قارن العروض  </h3>
                    <p className="text-xs  md:text-sm/relaxed">
                    من بين العروض المقدمة لمشروعك، اختر العرض المناسب لمتطلبات المشروع ثم ابدأ مباشرة مرحلة التنفيذ.

</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 border p-2 border-gray-200 rounded-lg shadow-sm transition-transform hover:scale-105 hover:shadow-md ">
                  <div className="flex items-center justify-center w-fit h-fit bg-gray-50 rounded-t-lg ">
                    <FaCheck className="w-8 h-8" />
                  </div>
                  <div className="grid gap-1 p-4 text-center">
                    <h3 className="text-sm font-bold tracking-wide md:text-base">استلم المشروع  </h3>
                    <p className="text-xs md:text-sm/relaxed ">
                    سيعمل المستقل الذي اخترته معك حتى انتهاء العمل وتسليم مشروعك بشكل كامل كما أردته.


             </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
         )
    }
    </div>
 
  );
}
