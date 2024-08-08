import React from "react";
import { useEffect ,useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../axios/axios";
function AccountFeed() {
    const [formData, setFormData] = useState({
      sender_name: '',
      sender_whatsapp: '',
      amount: '',
      transaction_number: '',
      transaction_document: null,
    });
  
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleFileChange = (e) => {
      setFormData({
        ...formData,
        transaction_document: e.target.files[0],
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('sender_name', e.target.sender_name.value);
      formData.append('sender_whatsapp', e.target.sender_whatsapp.value);
      formData.append('amount', e.target.amount.value);
      formData.append('transaction_number', e.target.transaction_number.value);
      formData.append('transaction_document', e.target.transaction_document.files[0] || null);
  
      try {
        console.log(e.target.transaction_document.files[0]);
        const response = await axios.post('/transactions', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        e.target.reset();
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
   
    

    return (
      <>
        <section className="md:flex md:justify-center ">
          <div className="w-full mb-4 shadow-md border-2">
            <div className="border-b-2 shadow-sm  rounded-md p-2  ">
              
<p className="text-gray-800   bg-gray-50 p-2 mb-2"> يمكنك من تغذية حسابك من الرصيد من اجل شرء الخدمات او دفع مستحقات
                من يقوم بمهام معين من خلال فئة المشاريع عن طريق ادخال المبلغ
                المراد ايداعه عبر نقطة حاسب الكريمي 9999999 باسم محمد بندر{" "}</p>
{/* <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/> */}
<p className="text-gray-800  bg-gray-50 p-2 mb-2"> 
او ارسال المبلغ حواله باسم محمد بندر محمد احمد بعد ذلك قم بادخال
                رقم الحواله وصورة سند التحويل او يمكنك من ارسال الينا عبر
                الواتساب 737257230 مستندات التحويل من اجل ايداع في حسابك المبلغ
                المحدد</p>

                <p className="text-gray-800  bg-gray-50 p-2 mb-2"> 
المنصة سوف تستقبل الطلب وتحقق منها وتستكمل الاجراءات لتنفيذ الخدمة
</p>

             
            </div>
 


      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="sender_name">
         اسم المرسل الكامل
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="sender_name"
          name="sender_name"
          value={formData.sender_name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="sender_whatsapp">
         رقم الوتساب
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="sender_whatsapp"
          name="sender_whatsapp"
          value={formData.sender_whatsapp}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="amount">
       المبلغ بالريال السعودي
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="transaction_number">
        رقم العملية التحويل
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="transaction_number"
          name="transaction_number"
          value={formData.transaction_number}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="transaction_document">
         ارفق صورة لعملية التحويل
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="file"
          id="transaction_document"
          name="transaction_document"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          ارسال
        </button>
      </div>
    </form>
          </div>
        </section>
      </>
    );
  }
  
  export default AccountFeed;