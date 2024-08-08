import React, { useEffect, useState } from "react";
import axios from "../../../../../axios/axios";

const CategoryService = () => {
//   const [categories, setCategories] = useState([
//     { id: 1, name: "تصميم وتطوير" },
//     { id: 2, name: "كتابة المحتوى" },
//     { id: 3, name: "ترجمة" },
//     { id: 4, name: "كتابة المحتوى" },
//     { id: 5, name: "ترجمة" },
//   ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [category, setCategory] = useState([]);
  const [Editecategory, setEditecategory] = useState(false);


useEffect(() => {
  // Fetch services data from the database or API
  const FetchCategory = async () => {
    try {
      const response = await axios.get('/categories');
      const data = response.data;
      setCategory(data);
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  FetchCategory();
}, []);
//   const handleDeleteCategory = (categoryId) => {
//     // categoryId=category.filter((category) => category.id === categoryId)
//     console.log(categoryId)
//     try {
//       const response =axios.post(`/category/delete`,{CategoryID:categoryId});
//       const data = response.data;
//       // setCategory(data);
//       console.log(data)
//     } catch (error) {
//       console.log(error);
//     }
//     // console.log(category.filter((category) => category.id !== categoryId));
//     // setCategory(category.filter((category) => category.id !== categoryId));
//   };

  const handleCreateCategory = (newCategory) => {
    setCategory([...category, newCategory]);
  };

//   const handleEditCategory = (updatedCategory) => {
//     // setCategory(
//     //   category.map((category) =>
//     //     category.id === updatedCategory.id ? updatedCategory : category
//     //   )
//     // );
//     setEditecategory(!Editecategory)
//     console.log(updatedCategory);
    
//   };

  const handleCancelForm = () => {
    setSelectedCategoryId(null);
  };

  // const CategoryList = () => {
  //   return (
  //    <>
  //    </>
  //   );
  // };
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/categories/${categoryId}`);
      setCategories(categories.filter((category) => category.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleSaveCategory = async () => {
    try {
        // console.log(editingCategory.name)
      await axios.post(`/categories/${editingCategory.id}`, {
        name: editingCategory.name,
      });
      setCategories(
        categories.map((category) =>
          category.id === editingCategory.id ? editingCategory : category
        )
      );
      setEditingCategory(null);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  const handleCategoryNameChange = (e) => {
    setEditingCategory({ ...editingCategory, name: e.target.value });
  };

  const CategoryForm = ({ category, onSubmit, onCancel }) => {
    const [name, setName] = useState(category ? category.name : "");

    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        const response =axios.post('/store-category',{name});
        const data = response.data;
        // setCategory(data);
        console.log(data)
      } catch (error) {
        console.log(error);
      }


      setName("");
      onCancel();
    };

    return (
    
      <div className="shadow-md rounded-md p-4">
        <h5 className="text-xl font-bold mb-4">
          {category ? Editecategory : "إنشاء فئة خدمة جديدة"}
        </h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm  pb-2 font-medium text-gray-700">
              اسم الفئة:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md focus:outline-none"
            >
              حفظ
            </button>
            <button
              type="button"
              className="text-white bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md focus:outline-none"
              onClick={onCancel}
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    );
  };
  
 return (
    <div className="container mx-auto px-4">
      {/* <h1 className="text-3xl font-bold mb-4">قائمة المشاريع</h1> */}

      <div className="flex justify-between mb-4">
        {/* <CategoryList categories={categories} onDeleteCategory={handleDeleteCategory} /> */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setSelectedCategoryId({})}
        >
          إنشاء فئة خدمة جديدة
        </button>
      </div>

      {selectedCategoryId ? (
        <CategoryForm
          category={categories.find((category) => category.id === selectedCategoryId)}
          onSubmit={handleEditCategory}
          onCancel={handleCancelForm}
        />
      ) : null}
       <div className="  bg-gray-50 gap-4">
       <div className="flex flex-row flex-wrap text-center gap-4 justify-center p-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white rounded-md justify-between items-center p-6 border border-gray-200"
        >
          {editingCategory && editingCategory.id === category.id ? (
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={editingCategory.name}
                onChange={handleCategoryNameChange}
                className="rounded-md border border-gray-300 px-3 py-2 w-full mb-2"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md focus:outline-none"
                  onClick={handleSaveCategory}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="text-white bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded-md focus:outline-none"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <span className="cursor-pointer block p-2">{category.name}</span>
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md focus:outline-none"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  حذف
                </button>
                <button
                  type="button"
                  className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md focus:outline-none"
                  onClick={() => handleEditCategory(category)}
                >
                  تعديل
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
      </div>
    </div>
  );
};

export default CategoryService;