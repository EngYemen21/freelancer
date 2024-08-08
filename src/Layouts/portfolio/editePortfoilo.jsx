import { useParams } from "react-router-dom";
import axios from "../../axios/axios";
import { useEffect, useState } from "react";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function EditePortfolio(){
    const {id}=useParams()
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);

    const [formData, setFormData] = useState({
        title: '', // Add a default value for the 'title' property
        description: '',
        thumbnailFile: '',
        imageFile: '',
        link: '',
      });
      const [errors, setErrors] = useState({
        title: '', 
        description: '',
        thumbnailFile: '',
        imageFile: '',
        link: '',
      });
    useEffect(()=>{
        const fatchPortfolio =async ()=>{
            try {
                const response=await axios.get(`portfolio/${id}/details`)
                
               
                setFormData({
                    title: response.data.title,
                    description: response.data.description,
                    thumbnailFile:response.data.thumbnail,
                    imageFile: response.data.image,
                    link: response.data.url,
                   
                  });
               
            } catch (error) {
                // setErrors(error.response.data)
                console.log(error);

                
            }
            
        }
       
        fatchPortfolio();
      
       
    },[])
    
  
 
    const handleThumbnailChange = (e) => {
       
        const selectedFile1 = e.target.files[0];
        const updatedFormData1 = { ...formData, thumbnailFile: selectedFile1 };
        setFormData(updatedFormData1);
        const file1 = e.target.files[0];
        const reader1 = new FileReader();
        reader1.onload = (e) => setSelectedImage2(e.target.result); // Set image data in state
        reader1.readAsDataURL(file1);
   
    };
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        const updatedFormData = { ...formData, imageFile: selectedFile };
        setFormData(updatedFormData);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => setSelectedImage(e.target.result); // Set image data in state
        reader.readAsDataURL(file);
      
      };

    

    
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    

    
      const handleSubmit =  (e) => {
      
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('thumbnail', formData.thumbnailFile);
        data.append('image', formData.imageFile);
        data.append('link', formData.link);
        // console.log("dhjdd",data.get('link'));
        // try {
        //     const response=await axios.put(`portfolio/${id}`)
        //     const data =response.data
        //     setFormData(data)
        // } catch (error) {
        //     // setErrors(error.response.data)
        //     console.log(error);

            
        // }
        // console.log(errors.title)
       
        axios.post(`portfolio/${id}`,data)
          .then((response) => {
            // تم إنشاء الخدمة بنجاح
            toast.success('تم تحديث العمل بنجاح!');
            // setFormData('')
            console.log(response.data.message);
          })
          .catch((error) => {
            const apiErrors = error.response.data.errors; 
            setErrors(apiErrors);

          });
     };
    

    // const handleSubmit = async (event) => {
    //   event.preventDefault();
  
     
  
    //   // إعادة تعيين حقول المدخلات
    //   setTitle('');
    //   setDescription('');
    //   setThumbnailFile(null);
    //   setImageFile(null);
    //   setLink('');
    // };
    return (
        <div className="flex flex-col   bg-gray-100">
        <form
          className="bg-white shadow-lg mb-3 rounded-lg p-8 w-full max-w-full"

          onSubmit={handleSubmit}
        >
        <h2 className="text-2xl font-bold text-right">تعديل بيانات العمل</h2>
        <hr className="w-1/3  mt-2 mb-2 border-2 rounded bg-gray-400"/>


         
  
          <div className="mb-2">
            <label className="block mt-6  text-gray-700 font-bold mb-2" htmlFor="title">
           العنوان العمل 
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
           
            />
          </div>
          {errors.title && (
        <div className="error  text-red-500">{errors.title[0]}</div>
      )}
  
          <div className="mb-2">
            
          <label className="block mt-6  text-gray-700 font-bold mb-2" htmlFor="description">
           وصف العمل 
            </label>
            <textarea  id="description"
            name="description"
            value={formData.description}
             
            onChange={handleChange}
               rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 " placeholder="اكتب الوصف بالعمل الخاص بك"></textarea>

       
          </div>
          {errors.description && (
        <div className="error  text-red-500">{errors.description[0]}</div>
      )}
  
          <div className="mb-2 flex md:flex-row flex-col justify-between gap-2">
           
<div className="flex flex-col w-full">
    <p className="mb-4 mt-2">  الصورة الرئيسية للعمل</p>
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  ">
      
        <div className="flex flex-col items-center justify-center pt-4 pb-4">
            <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" strokeLinecap="round" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            {selectedImage ? (
        <img className=" h-44 max-w-xl object-fit: cover" src={selectedImage} alt="Selected Image" />
      ):(<>
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
      </>)}
        </div>
        <input   onChange={handleImageChange} id="dropzone-file" type="file" name="imageFile" className="hidden" />
    </label>
</div> 
{errors.imageFile && (
        <div className="error text-red-500">{errors.imageFile[0]}</div>
      )}
  
<div className="flex flex-col w-full">
<p className="mb-4 mt-2">  الصورة المصغرة للعمل</p>

<label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  ">
        <div className="flex flex-col items-center justify-center pt-4 pb-4">
            <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" strokeLinecap="round" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            {selectedImage2 ? (
        <img className=" h-44 max-w-xl object-fit: cover" src={selectedImage2} alt="Selected Image" />
      ):(<>
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
      </>)}
            
        </div>
        <input    onChange={handleThumbnailChange} id="dropzone-file" type="file" name="thumbnailFile" className="hidden" />
    </label>
</div> 
{errors.thumbnailFile && (
        <div className="error  text-red-500">{errors.thumbnailFile[0]}</div>
      )}
  
          </div>
  
         
  
          <div className="mb-2">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="link">
             روابط العرض (اختياري)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
            />
          </div>
          {errors.link && (
        <div className="error  text-red-500">{errors.link[0]}</div>
      )}
  
  
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 md:w-1/2 w-full  rounded-md focus:outline-none focus:shadow-outline"
              type="submit"
            >
             رفع
            </button>
          </div>
        </form>
      </div>
    );
  }
  
