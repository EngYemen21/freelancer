import { useState, useEffect } from 'react';
import axios from '../axios/axios'; // Make sure axios instance is correctly imported
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Add_service() {
  const { user } = useAuth();
  const [userid, setUserid] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // Stores the uploaded image
  const [skills, setSkills] = useState('');

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

  useEffect(() => {
    setUserid(user.id);
  }, [user.id]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    delivery_time: '',
    // skills: [],
    file: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    delivery_time: '',
    file: '',
    // skills: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // console.log(skills);
   
     
      // console.log(skillsArray);
      // setSkills([skillsArray])
      // console.log(skills);
      // console.log(skillsArray);
    
      // setSkills((prevState) => ({
      //   ...prevState,
      //  skills:skills.split(',').map(skill => skill.trim()),
      // }));
   
      setFormData((prevState) => ({
        ...prevState,
        // skills: skillsArray,
        [name]: value,
      }));
    
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      file: selectedFile,
    }));
    const reader = new FileReader();
    reader.onload = (e) => setSelectedImage(e.target.result); // Set image data in state
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray =skills.split(',').map(skill => skill.trim());
    console.log(skillsArray);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category_id', formData.category);
    data.append('price', formData.price);
    data.append('delivery_time', formData.delivery_time);
    data.append('file', formData.file);
    // data.append('skills',skillsArray);
    skillsArray.forEach((skill) => {
      data.append('skills[]', skill);
    });

    axios
      .post('/add-service', data)
      .then((response) => {
        toast.success('تم إضافة الخدمة بنجاح. بانتظار مراجعتها من قبل الإدارة.');
        console.log(response.data.message);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          const apiErrors = error.response.data.errors;
          setErrors(apiErrors);
        }
      });
  };

  return (
    <>
      <div className="container mx-auto mt-4 p-2 bg-slate-100">
        <h1 className="text-xl mt-2 mb-4">إضافة خدمة جديدة</h1>
      </div>

      <div className="container md:w-[70%] border-1 shadow-md mx-auto p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-1">
              عنوان الخدمة (مختصر)
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border"
              placeholder="عنوان الخدمة مثل: لوحة إعلانية"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium mb-1">
              تفاصيل الخدمة
            </label>
            <textarea
              cols="30"
              rows="10"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full min-h-[100px] h-auto resize-none px-4 py-2 rounded border overflow-y-auto"
              placeholder="أدخل توصيفًا مفصلًا حول الخدمة التي تريد بيعها"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div className="mb-4">
          <label htmlFor="placeholder" className="block  mb-1">
           ادخل المهارات المطلوبة { '    '}
          
         </label>
          <textarea
          placeholder=' ضع بعد كل مهارة فاصلة'
      
          
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className={`w-full min-h-[100px] h-auto resize-none px-4 py-2 rounded border ${
              errors && !errors.skills ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring ${
              errors && !errors.skills ? 'ring-red-500' : 'ring-blue-200'
            } overflow-y-auto`}
          ></textarea>
          {errors.skills  && (
            <p className="text-red-500 text-sm mt-1">
            ادخل المهارات المطلوبة
            </p>
          )}
        </div>

          {/* <div className="mb-4">
            <label htmlFor="skills" className="block font-medium mb-1">
              إدخال المهارات المطلوبة (اختياري)
            </label>
            <select
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              multiple={true}
              className="w-full px-4 py-2 rounded border"
            >
              <option value="">-- اختر المهارات --</option>
              <option value="skill1">Skill 1</option>
              <option value="skill2">Skill 2</option>
              <option value="skill3">Skill 3</option>
            </select>
            {errors.skills && (
              <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
            )}
          </div> */}

          <div className="md:flex justify-around gap-4 mb-2">
            <div className="mb-4">
              <label htmlFor="category" className="block font-medium mb-1">
                حدد تصنيف الخدمة
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none"
              >
                <option disabled>اختر التصنيف الخدمة</option>
                {categories.map((category) => (
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
              <label htmlFor="price" className="block font-medium mb-1">
                حدد السعر المتوقع
              </label>
              <select
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none"
              >
                <option value="" disabled>
                  حدد السعر المتوقع للخدمة
                </option>
                <option value="5">5$</option>
                <option value="10">10$</option>
                <option value="15">15$</option>
                <option value="20">20$</option>
                <option value="25">25$</option>
                <option value="30">30$</option>
                <option value="40">40$</option>
                <option value="50">50$</option>
                <option value="75">75$</option>
                <option value="100">100$</option>
                <option value="150">150$</option>
              </select>
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="delivery_time" className="block font-medium mb-1">
              حدد المدة المتوقعة لتسليم الخدمة (عدد الأيام)
            </label>
            <input
              type="date"
              id="delivery_time"
              name="delivery_time"
              value={formData.delivery_time}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border-0 border-b-2 border-emerald-400 appearance-none"
              placeholder="أدخل المدة بالأيام"
            />
            {errors.delivery_time && (
              <p className="text-red-500 text-sm mt-1">{errors.delivery_time}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="file" className="block font-medium mb-1">
              ارفق ملفات حول الخدمة
            </label>
            <div className="shrink-0">
              <img
                className="h-16 w-16 object-cover rounded-full"
                src={selectedImage}
                alt="Current profile photo"
              />
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                id="file"
                name="file"
                type="file"
                onChange={handleImageChange}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </label>
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">{errors.file}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            نشر
          </button>
        </form>
      </div>
    </>
  );
}
