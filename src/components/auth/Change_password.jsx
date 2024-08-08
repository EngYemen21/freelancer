import { useState } from "react";
import axios from "../../axios/axios";

import { useAuth } from "../../contexts/AuthContext";

  import Swal from "sweetalert2";

  const ChangePassword = () => {
      const { user } = useAuth();
      const [ validationErrors, setValidationErrors] = useState({});
      const [ formData, setFormData] = useState({
          cpassword:"", npassword:"", cnpassword:""
      });
         const handleChange = (e) => {
          setFormData({
              ...formData,
              [e.target.name]: e.target.value
          });
      }
      const handleSubmit = async(e) => {
          e.preventDefault();
          const errors = {};
  
          if(!formData.cpassword.trim()){
              errors.cpassword = "Current Password is Required";
          }
          if(!formData.npassword.trim()){
              errors.npassword = "New Password is Required";
          }
          if(!formData.cnpassword.trim()){
              errors.cnpassword = "Confirm New Password is Required";
          }else if(formData.npassword != formData.cnpassword){
              errors.cnpassword = "New Password and Confirm New Password Is Not Match";
          }
  
          if(Object.keys(errors).length > 0 ){
              setValidationErrors(errors);
              return;
          }
  
          try{
              const response = await axios.post("/changepassword",{
                  ...formData,
                  userId:user.id
              });
  
              if (response.data.status == "success") {
                  Swal.fire({
                      icon: "success",
                      title: "Change Password",
                      text: "Password Change successfully",
                  }).then(() => {
                  
                  });
                  
                  
              } else {
                  Swal.fire({
                      icon: "error",
                      title: "CHange Password Failed",
                      text: response.data.message || "An error occurred while processing your request. Please try again later.",
                  });
              }
              
          }catch(error){
              Swal.fire({
                  icon: "error",
                  title: "Change Password Failed",
                  text: "An error occurred while processing your request. Please try again later.",
              });
          }
  
      }   
  
      return(
          <>
           
           <section className="h-screen ">
  <div className="flex  h-full">
    <div className="w-full p-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-5 text-2xl font-bold text-right text-gray-800 uppercase">
        تغير كلمة المرور
      </h2>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="password"
            name="cpassword"
            placeholder="Enter current Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8e2de2]"
            onChange={handleChange}
          />
          {validationErrors.cpassword && (
            <span className="text-red-500">{validationErrors.cpassword}</span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="npassword"
            placeholder="Enter New Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8e2de2]"
            onChange={handleChange}
          />
          {validationErrors.npassword && (
            <span className="text-red-500">{validationErrors.npassword}</span>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="cnpassword"
            placeholder="Enter Confirm New Password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8e2de2]"
            onChange={handleChange}
          />
          {validationErrors.cnpassword && (
            <span className="text-red-500">{validationErrors.cnpassword}</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-emerald-500 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-[#8e2de2]"
        >
          تعديل
        </button>
      </form>
    
    </div>
  </div>
</section>
          </>
  
      )
  }
  export default ChangePassword ;