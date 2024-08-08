import { FaBullhorn, FaCode, FaLanguage, FaPallet, FaUsers } from "react-icons/fa";

export default function Categoy(){
    return (
     <>
       <div className="bg-gray-50 pb-2">
             <p className="text-xl md:pt-4  text-center  tracking-tighter sm:text-2xl p-2 "> أهم المجالات المتوفرة  </p>
       <p className="text-center font-normal pt-2">اتصفح اهم المجالات (الخدمات - المشاريع - المنافذين) </p>
       
<hr className=" w-56 h-[0.15rem] mx-auto m-4 bg-gray-400 border-0 rounded 0"/>

     </div>
       <section className="  bg-white "> 

            
    <div className="container mx-auto  ">
   
    
       
       <div className=" flex md:justify-center  flex-col md:flex-row  flex-wrap  gap-3 md:gap-0  md:m-4 ">
        <div className="flex-1 text-center border-t-4 outline-none hover:border-t-emerald-500 md:hover:-translate-y-1 md:hover:scale-100 transition ease-in-out delay-250  shadow-xl   px-4 py-4 m-2 "> 
             <FaCode className="h-12 w-12  border-1 rounded-md mx-auto text-center flex"/>
             <p className="text-lg mt-2 mb-2 "> برمجة و تطوير</p>
        </div>
        <div className="flex-1 text-center border-t-4 outline-none hover:border-t-emerald-500 md:hover:-translate-y-1 md:hover:scale-100 transition ease-in-out delay-250  shadow-xl p-2  m-2 "> 
             <FaPallet className="h-12 w-12  border-1 rounded-md mx-auto text-center flex"/>
             <p className="text-lg mt-2 mb-2 "> التصميم والرسومات</p>
        </div>

        <div className="flex-1 text-center border-t-4 outline-none hover:border-t-emerald-500 md:hover:-translate-y-1 md:hover:scale-100 transition ease-in-out delay-250  shadow-xl  p-2 m-2 "> 
             <FaBullhorn className="h-12 w-12 border-1 rounded-md mx-auto text-center flex"/>
             <p className="text-lg  mt-2 mb-2 "> التسويق و المبيعات</p>
        {/* <p className=" font-thin">    التسويق الكتروني - التواصل الاجتماعي   </p> */}
        </div>

        <div className="flex-1 text-center border-t-4 outline-none hover:border-t-emerald-500 md:hover:-translate-y-1 md:hover:scale-100 transition ease-in-out delay-250  shadow-xl p-2  m-2 "> 
             <FaLanguage className="h-12 w-12 border-1 rounded-md mx-auto text-center flex"/>
             <p className="text-lg mt-2 mb-2 "> الكتابة والترجمه</p>
             {/* <p className=" font-thin">    الترجمة العامة - كتابة البحوث - التقارير</p> */}
        </div>

        <div className="flex-1 text-center border-t-4 outline-none hover:border-t-emerald-500 hover:-translate-y-1 hover:scale-100 transition ease-in-out delay-250  shadow-xl  p-2 m-2 "> 
             <FaUsers className="h-12 w-12 border-1 rounded-md mx-auto text-center flex"/>
             <p className="text-xl mt-2 mb-2 "> الاستشارات</p>
             {/* <p className=" font-thin">    نصائح استشارات طلب الخبرات</p> */}
        </div>
    
        

       </div>
       </div>
        </section>
     </>
      
    )
}