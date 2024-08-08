import React from "react"
import freelancer from "../assets/freelancer-background.avif"
import PCfreelancer from "../assets/freelancer-on-pc.svg"
import '../App.css'
export default function Header(){
    return (
    <header className="background-Header bg-neutral-50  p-2  bg-no-repeat bg-cover bg-center" style={{backgroundImage: `url(${freelancer})`}}>
      <div className="container mx-auto  md:justify-between flex flex-col mt-6  md:flex-row  ">
      <div className=" text-white text-center md:pt-10  md:basis-1/2">
        <p className=" m-4 text-xl">إحصل على عمل لإنجازة   <span className="text-emerald-500 text-2xl ">عن بعد</span> </p>
        <p className="text-md">أنجز مشاريعك بسهولة وأمان عبر الوسيط الحر اول منصة رائدة في اليمن </p>
       <div className="p-2 md:pt-8 ">
       <form>   
    <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-emerald-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 focus:ring-emerald-800">Search</button>
    </div>
</form>
        </div>         

        </div>
       
        <div className="hidden  md:flex  basis-1/2">
            <img src={PCfreelancer} alt="" />

          </div>
       
      </div>
     

    </header>
    )
}