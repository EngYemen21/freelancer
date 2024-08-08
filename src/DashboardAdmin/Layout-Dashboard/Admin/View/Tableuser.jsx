import React, { useState, useEffect } from "react";
import axios from "../../../../axios/axios";
import { FaEllipsisV } from "react-icons/fa";

const UserActionsDropdown = ({ userId, onEdit,onBanUser, onDelete, isOpen, toggleDropdown }) => {
  return (
    <div className="relative inline-block text-left">
      <button onClick={() => toggleDropdown(userId)} className="flex items-center focus:outline-none">
        <FaEllipsisV />
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button onClick={() => onEdit(userId)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              تعديل بيانات المستخدم
            </button>
            <button onClick={() => onDelete(userId)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              حذف مستخدم
            </button>
            <button onClick={() => onBanUser(userId)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              حظر مستخدم
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">تعديل بيانات المستخدم</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">الاسم الأول</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">الاسم الأخير</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded"
            />
          </div>
          {/* إضافة حقول إضافية حسب احتياجك */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              حفظ
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function TableUser() {
  const [users, setUsers] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    axios.get("/users")
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  

  const handleDeleteUser = (userId) => {
    axios.delete(`/users/${userId}`)
      .then(response => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const handleBanUser = async (userId) => {
    try {
      const response = await axios.post(`/ban-user/${userId}`);
      // alert(response.data.message);
      console.log(response.data.message)
      // fetchUsers(); // تحديث قائمة المستخدمين بعد الحظر
    } catch (error) {
      console.error('Error banning user:', error);
      alert('Failed to ban user');
    }
  };
  const handleEditUser = (userId) => {
    const user = users.find(user => user.id === userId);
    setEditingUser(user);
  };

  const handleSaveUser = (updatedUser) => {
    axios.post(`/users/${updatedUser.id}/update`, updatedUser)
      .then(response => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setEditingUser(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const toggleDropdown = (userId) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-1/2 divide-y text-center divide-gray-400">
          <thead>
            <tr>
              <th className="w-full px-2 py-2 text-sm font-semibold tracking-wider">ID</th>
              <th className="w-full px-2 py-2 text-sm font-semibold uppercase tracking-wider">اسم المستخدم</th>
              <th className="w-full px-2 py-2 text-sm font-semibold uppercase tracking-wider">الصورة</th>
              <th className="w-full px-2 py-2 text-sm font-semibold uppercase tracking-wider">نوع الحساب</th>
              <th className="w-full px-2 py-2 text-sm font-semibold uppercase tracking-wider">البريد الالكتروني</th>
              <th className="w-full px-2 py-2 text-sm font-semibold uppercase tracking-wider">المدينة</th>
              <th className="w-full px-2 py-2 text-sm font-semibold uppercase tracking-wider">تاريخ انشاء الحساب</th>
              <th className="w-full px-2 py-2 text-sm font-semibold uppercase tracking-wider">التخصص</th>
              <th className="w-full px-2 py-2 text-sm font-semibold uppercase tracking-wider">خيارات</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-400">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="w-full px-2 py-2 text-sm font-bold">{user.id}</td>
                <td className="px-6 py-3 whitespace-nowrap font-bold text-sm text-gray-700">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-3 whitespace-nowrap font-bold text-sm text-gray-700">
                  <img src={"http://localhost:8000/" + user.image} alt="" />
                </td>
                <td className="px-6 py-3 whitespace-nowrap font-bold text-sm text-gray-700">{user.user_type}</td>
                <td className="px-6 py-3 whitespace-nowrap font-bold text-sm text-gray-700">{user.email}</td>
                <td className="px-6 py-3 whitespace-nowrap font-bold text-sm text-gray-700">{user.city}</td>
                <td className="px-6 py-3 whitespace-nowrap font-bold text-sm text-gray-700">{user.created_at}</td>
                <td className="px-6 py-3 whitespace-nowrap font-bold text-sm text-gray-700">{user.field}</td>
                <td className="px-6 py-3 whitespace-nowrap font-bold text-sm text-gray-700">
                  <UserActionsDropdown
                    userId={user.id}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                    onBanUser={handleBanUser}
                    isOpen={openDropdown === user.id}
                    toggleDropdown={toggleDropdown}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <EditUserForm
          user={editingUser}
          onSave={handleSaveUser}
          onCancel={() => setEditingUser(null)}
        />
      )}
    </>
  );
}
