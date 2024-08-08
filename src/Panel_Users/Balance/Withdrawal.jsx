import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../axios/axios";
function Withdrawal() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [amount, setAmount] = useState();
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);


  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Reset errors

    if (amount <= 0 ) {
      setErrors(['Invalid amount.']);
      return;
    }


    try {
     
      const response = await axios.post("/withdraw", {
        amount,
        selectedMethod,
        // reason,
      });
      console.log(response.data)
      if (response.data.success===true) {
        setMessage('Withdrawal request submitted successfully.');
        setErrors([]);
      } else {
        setMessage('');
        setErrors(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting withdrawal request:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(Object.values(error.response.data.errors).flat());
      } else {
        // setErrors([error.data.message]);
      }
    }
  };
  // console.log(errors.amount[0])
  return (
    <>
      <section className="flex justify-center m-4 ">
        <div className=" mb-4  bg-gray-50 shadow-md border-2">
          <div className="border-b-2 shadow-sm bg-white rounded-md m-4 p-2 ">
            <p className="text-blue-800 text-md p-2 border-b-2 w-1/2  text-md">خدمة سحب - الارباح</p>
            <p className="  tracking-wide">
            يمكنك من تقديم طلب سحب المبلغ عن طريق ادخال المبلغ المراد سحبه
                من حسابك 
                يجب ان يكون مبلغ المراد سحبه لا يتجاوز مبلغ المتوفر في حسابك ثم
                بعد ذلك قم باختيار طريقة السحب المتوفرة في هذه المنصة <br />
                وانتظر حتى يصل اليك اشعار اليك والتي سوف تبلغك بامكانك استلام
                المال عبر نقطة حاسب او وان كاش او النجم
            </p>
          </div>

          <div className="">
          {message && <p className="text-red-500 text-center">{message}</p>}
      {errors.length > 0 && (
        <div className="errors">
          <ul className="text-red-500 text-center bg-gray-50 w-1/2 mx-auto">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
            <form action="" onSubmit={handleSubmit}>
              <div className="bg-white border-b-2 rounded-md p-2 m-4 ">
                <label htmlFor="">المبلغ</label>
                <input
                  type="number"
                  placeholder="المبلغ"
                  name="amount"
                  className="px-3 block m-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"

                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                
              

                <label
                  htmlFor="paymentMethod"
                  className="block font-medium text-gray-700"
                >
                  اختار طريقة السحب
                </label>
                <select
                  id="paymentMethod"
                  className="block m-2 appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                >
                  <option value=""> اختيار طريقة السحب </option>
                  <option value="نقطة حاسب ">نقطة حاسب </option>
                  <option value="وان كاش">وان كاش</option>
                  <option value="النجم"> النجم</option>
                </select>
                
              

                <div className="bg-green-500 text-center text-white  rounded-md  md:w-1/3 w-full p-2 ">
                <button type="submit">ارسال</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Withdrawal;
