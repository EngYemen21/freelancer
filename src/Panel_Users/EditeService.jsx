import Nav from '../Pages/Nav';
import {  useState , useEffect } from 'react';

import axios from '../axios/axios';
import { useAuth } from '../contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate, useParams } from 'react-router-dom';


export default function EditeService(){
  const { user } = useAuth();
  // const [user, setUser]=useState();
  const [userid, setUserid] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate =useNavigate() 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    delivery_time: '',
    file: '',

    categories: [],
  });
  
  const { id } = useParams();


  const [isEditing, setIsEditing] = useState(false); // Track editing state

  // const toggleEditing = () => setIsEditing(!isEditing)
  useEffect(() => {
    const fetchCategory = async (id) => {
      try {
        const response = await axios.get(`/service/${id}`);
        setCategories(response.data);
        setFormData({
          title: response.data.service.title,
          description: response.data.service.description,
          category:response.data.service.category,
          price: response.data.service.price,
          delivery_time: response.data.service.delivery_time,
          file: response.data.service.image,
          categories: response.data.categories,
        });
        console.log(response.data.service)

       
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategory(id);
  }, []);

  useEffect(() => {
    setUserid(user.id);
    
  }, []);

  const [errors, setErrors] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        delivery_time: '',
        file: '',
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        const updatedFormData = { ...formData, file: selectedFile };
        setFormData(updatedFormData);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => setSelectedImage(e.target.result);
        reader.readAsDataURL(file);
        console.log(selectedFile);
        console.log(categories);
      };
    
      const handleSubmit =  (e) => {
      
        e.preventDefault();
 
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category_id', formData.category);
        data.append('price', formData.price);
        data.append('delivery_time', formData.delivery_time);
        data.append('file', formData.file);
   
      
   
        axios.post(`/edite/${id}/service`,data)
          .then((response) => {
            // تم إنشاء الخدمة بنجاح
            toast.success('تم تحديث الخدمة بنجاح!');
            setFormData('')
            navigate('/dashboard/profile', { replace: true });
            // navigate('')

            console.log(response.data.message);
          })
          .catch((error) => {
            if (error.response.status === 422) {
              setErrors(error.response.data.errors);
            }
          });
       
     };
     


    return (<>
    <div className='container mx-auto mt-4 p-2 bg-slate-100'>
    <h1 className="text-xl mt-2 mb-4 ">تعديل بيانات الخدمة </h1>
    </div>

    <div className="container md:w-[70%] border-1 shadow-md mx-auto p-4">
  
      <form onSubmit={handleSubmit} >
   
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-1">
            عنوان الخدمة (مختصر)
          </label>

          <input
            type="text"
            placeholder='عنوان الخدمة مثل:  لوحة اعلانية'
            id="title"
            name="title"
           
            value={formData.title}
             onChange={handleChange}
            className={`w-full px-4 py-2 rounded border`
          }
          />
          {errors.title && <p className="text-red-500  text-sm mt-1">{errors.title[0]}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-1">
            وصف الخدمة  (مفصل)
          </label>
          <textarea
          cols="30" rows="10"
          
          
            id="description"
            placeholder='ادخال توصيف بشكل مفصل حول الخدمة التي تريد بيعها '
            name="description" value={formData.description} onChange={handleChange}
            className={`w-full min-h-[100px] h-auto resize-none px-4 py-2 rounded border overflow-y-auto`}
          ></textarea>
          {errors.description &&<p className="text-red-500 text-sm mt-1">{errors.description} </p>}
        </div>

        <div className="mb-4">
          <label htmlFor="placeholder" className="block font-medium mb-1">
               إدخل المهارات المطلوبة(اختياري)
          </label>
          <textarea
        //   cols="30" rows="10"
          
            id="skills"
            value={formData.skills} onChange={handleChange}

            className={`w-full min-h-[100px] h-auto resize-none px-4 py-2 rounded border
           
            overflow-y-auto`}
          ></textarea>
                    {errors.skills &&<p className="text-red-500 text-sm mt-1">{errors.skills} </p>}

          {/* {formError && !skills && (
            <p className="text-red-500 text-sm mt-1">
              ادخل المهارات المطلوبة
            </p>
          )} */}
        </div>
        <div className='md:flex justify-around gap-4 mb-2'>
        <div className="mb-4 ">
  <label htmlFor="category" className="block font-medium mb-3 ">
    حدد تصنيف الخدمة
  </label>
  {/* {console.log(formData.categories)} */}
  <select
    id="category"
    name="category"
    value={formData.category}
        onChange={handleChange}
    className={`w-full px-4 py-3    bg-transparent border-0 border-b-2 border-emerald-400 appearance-none `}
  >
    <option  disabled>اختار الفئة</option>
          {formData.categories && formData.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
</div>
   <div className="mb-4">
          <label htmlFor="price" className="block font-medium mb-3">
            حدد السعر المتوقعة
          </label>
          <select
            id="price"
            className={`w-full px-4 py-3    bg-transparent border-0 border-b-2 border-emerald-400 appearance-none `}

            name="price" value={formData.price} onChange={handleChange}
            // className={`w-full px-4 py-2 rounded border ${
            //   formError && !price ? 'border-red-500' : 'border-gray-300'
            // } focus:outline-none focus:ring ${
            //   formError && !price ? 'ring-red-500' : 'ring-blue-200'
            // }`}
          >
            <option value="" disabled>Select a price</option>
            <option value="100.0">20$-50$</option>
            <option value="100.0">50$-100$</option>
            <option value="90.0">100$-150$</option>
            <option value="10.0">150$-200$</option>
            <option value="40.4">200$-400$</option>
            <option value="10.0">400$-600$</option>
            <option value="10.0">600$-1000$</option>
            <option value="10.0">1000$-1500$</option>

          </select>
          {errors.price &&  (
            <p className="text-red-500 text-sm mt-1">
           {errors.price}
            </p>
          )}
        </div>
        <div className="mb-4 flex-1">
          <label htmlFor="time" className="block font-medium mb-3">
           حدد المدة المتوقعة لتسليم الخدمة (عدد الايام)
          </label>
          <input
            type="date"
            id="time"
            name="delivery_time" value={formData.delivery_time} onChange={handleChange}
            className={`w-full px-4 py-3    bg-transparent border-0 border-b-2 border-emerald-400 appearance-none `}

            />
            {errors.delivery_time &&
              <p className="text-red-500 text-sm mt-1">
               {errors.delivery_time}
              </p>
            }
        </div>
        </div>

     
      
        <div className="mb-4">
          <label htmlFor="file" className="block font-medium mb-1">
            ارفق ملفات حول الخدمة
          </label>
         
            <div className="shrink-0">
    <img className="h-16 w-16 object-cover rounded-full" src={selectedImage} alt="Current profile photo" />
  </div>
  <label className="block">
    <span className="sr-only">Choose profile photo</span>
    <input  id="file"  name="file" onChange={handleImageChange}
     type="file" className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
  </label>
          {errors.file &&
            <p className="text-red-500 text-sm mt-1">
             {errors.file}
            </p>
          }
        </div>
        <button
          type="submit"
          className="bg-blue-500 w-full hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          نشر
        </button>
      </form>
    </div>

    
   
    {/* <ToastContainer /> */}

    </>)
}