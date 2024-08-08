import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from './../../axios/axios';


const RecoveryPassword = () => {
    const [email, setEmail] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm({ email });
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            const response = await axios.post("forgotpassword", { email });
            setEmail("");
            
            if (response.data.status == "success") {
                Swal.fire({
                    icon: "success",
                    title: "Reset Password",
                    text: "New Password Send your EMail.",
                }).then(()=>{
                    setEmail("");
                    setValidationErrors({});
                    navigate('/login');
                });
                
                
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Password Reset Failed",
                    text: response.data.message || "An error occurred while processing your request. Please try again later.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Password Reset Failed",
                text: "An error occurred while processing your request. Please try again later.",
            });
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Email address is invalid";
        }
        return errors;
    };


    return (
      <section className="h-screen bg-gray-100">
  <div className="flex items-center justify-center h-full">
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-5 text-2xl font-bold text-center text-gray-800 uppercase">
        Reset Password
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8e2de2]"
            value={email}
            onChange={handleChange}
          />
          {validationErrors.email && (
            <span className="text-red-500">{validationErrors.email}</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-[#8e2de2] rounded-md hover:bg-[#4a00e0] focus:outline-none focus:ring-2 focus:ring-[#8e2de2]"
        >
          ارسال
        </button>
      </form>
      <p className="mt-5 text-center text-gray-600">
        تسجيل الدخول?{' '}
        <a href="/login" className="font-bold text-[#8e2de2] hover:underline">
         هنا
        </a>
      </p>
    </div>
  </div>
</section>
    );
};


export default RecoveryPassword;