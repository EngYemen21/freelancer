import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { FaFileImage, FaFileUpload, FaIdCard } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Verification() {
    const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [previewFrontImage, setPreviewFrontImage] = useState(null);
  const [previewBackImage, setPreviewBackImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('front_image', frontImage);
    formData.append('back_image', backImage);

    try {
      const response = await axios.post('/identity-verifications', formData);
      setMessage(response.data.message);
      toast.success('تم رفع هوية بنجاح وانتظار المراجعه من قبل ادارة الموقع !');
    } catch (error) {
      console.error('Error uploading identity verification:', error);
      setMessage('Failed to submit identity verification.');
    }
  };

  return (
    <div className="container mx-auto mt-3 font-arabic p-2 bg-gray-50 rounded-lg shadow-lg w-[100%] md:w-[80%] lg:w-[90%]">
      <button
            type="button"
            className="text-gray-900 md:w-1/3 w-full border-emerald-300 border-b-2 hover:bg-green-200  font-medium text-lg px-10 py-2.5 sm:mb-2 mb-6 text-center inline-flex items-center  me-2 "
          >
        
            <p className="   border-white shadow-sm">
              <FaIdCard className="inline-block" /> رفع الهوية 
            </p>
          </button>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="mb-4 border-2 p-4">
          <label className="block text-sm font-medium text-gray-700">الصورة الأمامية</label>
          <div className="flex justify-between place-items-center gap-2 mt-2">

            <div>
                  <label className="flex place-items-center cursor-pointer">
              <FaFileImage className="text-2xl" /> 
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setFrontImage, setPreviewFrontImage)}
                className="hidden"
              />
              <span className="ml-2">اختيار ملف</span>
            </label>
            </div>
            <div>
                  {previewFrontImage && (
              <img src={previewFrontImage} alt="Front Preview" className="h-30 w-60 object-cover rounded-md" />
            )}
            </div>
          
          
          </div>
        </div>
        <div className="mb-4 border-2 p-4">
          <label className="block text-sm font-medium text-gray-700">الصورة الخلفية</label>
          <div className="flex justify-between place-items-center gap-2 mt-2">
            <div>
            <label className="flex items-center cursor-pointer">
              <FaFileImage className="text-2xl" /> 
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setBackImage, setPreviewBackImage)}
                className="hidden"
              />
              <span className="ml-2">اختيار ملف</span>
            </label>

            </div>
            <div>

            {previewBackImage && (
              <img src={previewBackImage} alt="Back Preview" className="h-30 w-60 object-cover rounded-md" />
            )}
            </div>
      
          </div>
        </div>
        <button type="submit" className="self-end bg-blue-500 text-white p-2 rounded flex items-center gap-2">
          <FaFileUpload /> 
          <span>إرسال</span>
        </button>
      </form>
      {/* {message && <p className="mt-4 text-center">{message}</p>} */}
    </div>
  );
};