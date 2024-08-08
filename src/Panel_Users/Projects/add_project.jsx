import React, { useEffect, useState } from 'react';

import Nav from '../../Pages/Nav';
// import axios from '../../axios/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from './../../axios/axios';
    
    export default function Addproject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [dateTime, setDateTime] = useState('');
  // const [categoy, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  // const [file, setFile] = useState(null);  
  const [skills, setSkills] = useState('');

  const [formError, setFormError] = useState(false);



  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategory();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };


  const [formData, setFormData] = useState({
    category: '',
  });




  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !description || !budget || !dateTime || !categories) {
      setFormError(true);
      return;
    }
    
    try {
      const skillsArray =skills.split(',').map(skill => skill.trim());
      const response = await axios.post('projects', 
        {
          title:title,
          description:description,
          budget:budget,
          skills:skillsArray,
          category_id:formData.category,
          dateTime:dateTime,
        }
      );
      console.log('Project created:', response.data.project);
    
      toast.success('تم إضافة المشروع للمراجعة من قبل إدارة الموقع  !');
    //   setTitle('');
    //   setDescription('');
    //   setBudget('');
    //   setDateTime('');
    //   setCategory('');

      setFormError(false);
    } catch (error) {
      console.error('Error creating project:', error);
     
      toast.success('فشل في ارسال المشروع , يرجى تأكيد من بياناتك او قم بالمحاولة لاحقا !');
    }
  };
  

  return (
    <>
    
    
  
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">اضف المشروع </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            عنوان المشروع (مختصر)
          </label>
          <input
            type="text"
            placeholder='عنوان المشروع مثل: مصمم لتصميم لوحة اعلانية'
            id="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-4 py-2 rounded border ${
              formError && !name ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring ${
              formError && !name ? 'ring-red-500' : 'ring-blue-200'
            }`}
          />
          {formError && !name && (
            <p className="text-red-500 text-sm mt-1">Please enter a name</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-1">
            وصف المشروع  (مفصل)
          </label>
          <textarea
          cols="30" rows="10"
          
            id="description"
            placeholder='ادخال توصيف بشكل مفصل حول المشروع '
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full min-h-[100px] h-auto resize-none px-4 py-2 rounded border ${
              formError && !description ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring ${
              formError && !description ? 'ring-red-500' : 'ring-blue-200'
            } overflow-y-auto`}
          ></textarea>
          {formError && !description && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a description
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="placeholder" className="block font-medium mb-1">
               إدخل المهارات المطلوبة
          </label>
          <textarea
      
          
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className={`w-full min-h-[100px] h-auto resize-none px-4 py-2 rounded border ${
              formError && !skills ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring ${
              formError && !skills ? 'ring-red-500' : 'ring-blue-200'
            } overflow-y-auto`}
          ></textarea>
          {formError && !skills && (
            <p className="text-red-500 text-sm mt-1">
              ادخل المهارات المطلوبة
            </p>
          )}
        </div>




        {/* <div className="mb-4">
          <label htmlFor="placeholder" className="block font-medium mb-1">
               ادخل التصنيفات للمشروع
          </label>
          <textarea
      
          
            id="categories"
            value={categories}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full min-h-[100px] h-auto resize-none px-4 py-2 rounded border ${
              formError && !categories ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring ${
              formError && !categories ? 'ring-red-500' : 'ring-blue-200'
            } overflow-y-auto`}
          ></textarea>
          {formError && !categories && (
            <p className="text-red-500 text-sm mt-1">
                 ادخل التصنيفات للمشروع
            </p>
          )}
        </div> */}

          <div className="md:flex justify-around gap-4 mb-2">
            <div className="mb-4">
              <label htmlFor="category" className="block font-medium mb-1">
                حدد تصنيف المشروع
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none"
              >
                <option value="" disabled>اختر تصنيف المشروع</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {/* {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )} */}
            </div>
            <div className="mb-4">
          <label htmlFor="price" className="block font-medium mb-1">
            حدد السعر المتوقعة
          </label>
          <select
            id="price"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={`w-full px-4 py-2 rounded border ${
              formError && !budget ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring ${
              formError && !budget ? 'ring-red-500' : 'ring-blue-200'
            }`}
          >
            <option value="" disabled>Select a price</option>
            <option value="5000">5000</option>
            <option value="15000">10000</option>
            <option value="20000">20000</option>
            <option value="25000">25000</option>
            <option value="40000">40000</option>
            <option value="50000">50000</option>
            <option value="70000">70000</option>
            <option value="100000">100000</option>

          </select>
          {formError && !budget && (
            <p className="text-red-500 text-sm mt-1">
              Please select a price
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block font-medium mb-1">
          حدد المدة المتوقعة لاستلم المشروع (عدد الايام)
          </label>
          <input
          
            type="data"
            id="time"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className={`w-full px-4 py-2 rounded border ${
                formError && !dateTime ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring ${
                formError && !dateTime ? 'ring-red-500' : 'ring-blue-200'
              }`}
            />
            {formError && !dateTime && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a time to implement
              </p>
            )}
        </div>
            </div>


        
        <button
          type="submit"
          className="bg-blue-500 w-full hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          نشر
        </button>
      </form>
    </div>
    </> );
};

