import { FaArrowCircleLeft, FaArrowCircleUp, FaCcMastercard, FaCcVisa, FaFacebook, FaPaypal, FaTelegram, FaVoicemail, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" bg-slate-50 py-4 mt-4  border-t-1">
      <div className="container mx-auto flex flex-col md:flex-row justify-between text-gray-600">
        <div className="flex flex-col space-y-4"> {/* Use space-y for consistent spacing */}
          <p className="text-2xl font-bold">الوسيط الحر</p>
          <a className="text-gray-700 hover:text-indigo-500 transition duration-300">من نحن</a>
          <a className="text-gray-700 hover:text-indigo-500 transition duration-300">الأسئلة الشائعة</a>
          <a className="text-gray-700 hover:text-indigo-500 transition duration-300">ضمان حقوقك</a>
          <a className="text-gray-700 hover:text-indigo-500 transition duration-300">شروط الاستخدام</a>
          <a className="text-gray-700 hover:text-indigo-500 transition duration-300">سياسة الخصوصية</a>
        </div>

        <div className="flex flex-col space-y-4 mt-4 md:mt-0">
          <p className="text-2xl font-bold">اتصل بنا</p>
          <div className="flex flex-row space-x-4">  
            <FaFacebook size={24} className="text-gray-700" /> 
            <FaTelegram size={24} className="text-gray-700" /> 
            <FaWhatsapp size={24} className="text-gray-700" />  
          </div>
        </div>

        <div className="flex flex-col space-y-4 mt-4 md:mt-0">  
          <p className="text-xl ">وسائل الدفع</p>
          <div className="flex flex-row space-x-4">
            <FaPaypal className="text-gray-700 text-2xl" />
            <FaCcMastercard className="text-gray-700 text-2xl" /> 
          </div>
          <p className="text-xl  mt-4">وسائل السحب</p> 
          <div className="flex flex-row space-x-4">
            <FaPaypal className="text-gray-700 text-2xl" /> 
            <FaCcMastercard className="text-gray-700 text-2xl" />  
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-gray-700">
        جميع الحقوق محفوظة © منصة الوسيط الحر 2024 LTD - All rights reserved
      </div>
    </footer>
  );
}
