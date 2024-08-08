import axios from "../../axios/axios";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function AddPortfolio() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
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

  const handleThumbnailChange = (e) => {
    const selectedFile = e.target.files[0];
    setSelectedImage2(URL.createObjectURL(selectedFile)); // Display thumbnail preview
    setFormData({ ...formData, thumbnailFile: selectedFile });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setSelectedImage(URL.createObjectURL(selectedFile)); // Display image preview
    setFormData({ ...formData, imageFile: selectedFile });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('thumbnail', formData.thumbnailFile);
    data.append('image', formData.imageFile);
    data.append('link', formData.link);

    axios.post('/portfolio', data)
      .then((response) => {
        toast.success('تم نشر العمل بنجاح!');
        setFormData({
          title: '',
          description: '',
          thumbnailFile: '',
          imageFile: '',
          link: '',
        });
        setSelectedImage(null);
        setSelectedImage2(null);
        setErrors({
          title: '',
          description: '',
          thumbnailFile: '',
          imageFile: '',
          link: '',
        });
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const apiErrors = error.response.data.errors;
          setErrors(apiErrors);
          toast.error('حدث خطأ أثناء رفع العمل. الرجاء المحاولة مرة أخرى.');
        } else {
          toast.error('حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.');
        }
      });
  };

  return (
    <div className="flex flex-col container mx-auto pt-4 font-arabic">
      <form
        className="bg-white shadow-lg mb-3 rounded-lg p-8 w-full max-w-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-right">إضافة عمل سابق</h2>
        <hr className="w-1/4 mt-2 mb-2 border-2 rounded bg-gray-400" />

        <div className="mb-2">
          <label className="block mt-6 text-gray-700 font-bold mb-2" htmlFor="title">
            العنوان العمل
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <div className="error text-red-500">{errors.title}</div>
          )}
        </div>

        <div className="mb-2">
          <label className="block mt-6 text-gray-700 font-bold mb-2" htmlFor="description">
            وصف العمل
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 ${errors.description ? 'border-red-500' : ''}`}
            placeholder="اكتب الوصف بالعمل الخاص بك"
          />
          {errors.description && (
            <div className="error text-red-500">{errors.description}</div>
          )}
        </div>

        <div className="mb-2 flex md:flex-row flex-col justify-between gap-2">
          <div className="flex flex-col w-full">
            <p className="mb-4 mt-2">الصورة الرئيسية للعمل</p>
            <label htmlFor="imageFile" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-4 pb-4">
                <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" strokeLinecap="round" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                {selectedImage && (
                  <img className="h-44 max-w-xl object-cover" src={selectedImage} alt="Selected Thumbnail" />
                )}
                {!selectedImage && (
                  <>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </>
                )}
              </div>
              <input onChange={handleImageChange} id="imageFile" type="file" name="imageFile" className="hidden" />
            </label>
            {errors.imageFile && (
              <div className="error text-red-500">{errors.imageFile}</div>
            )}
          </div>

          <div className="flex flex-col w-full">
            <p className="mb-4 mt-2">الصورة المصغرة للعمل</p>
            <label htmlFor="thumbnailFile" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
              <div className="flex flex-col items-center justify-center pt-4 pb-4">
                <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" strokeLinecap="round" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                {selectedImage2 && (
                  <img className="h-44 max-w-xl object-cover" src={selectedImage2} alt="Selected Image" />
                )}
                {!selectedImage2 && (
                  <>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </>
                )}
              </div>
              <input onChange={handleThumbnailChange} id="thumbnailFile" type="file" name="thumbnailFile" className="hidden" />
            </label>
            {errors.thumbnailFile && (
              <div className="error text-red-500">{errors.thumbnailFile}</div>
            )}
          </div>
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="link">
            رابط العمل
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.link ? 'border-red-500' : ''}`}
            type="text"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
          />
          {errors.link && (
            <div className="error text-red-500">{errors.link}</div>
          )}
        </div>

        <div className="mt-2">
          <button
            type="submit"
            className="bg-green-500 w-1/2  hover:bg-green-700 text-white font-bold  p-3  rounded focus:outline-none focus:shadow-outline"
          >
            نشر العمل
          </button>
        </div>
      </form>
    </div>
  );
}
