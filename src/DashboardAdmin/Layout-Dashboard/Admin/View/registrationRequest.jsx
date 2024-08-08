import React, { useState, useEffect } from "react";
import axios from "axios";
import UserDropdown from "../../../Component/UserDropdown";
export default function Tableuser(){

//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // استدعاء البيانات من API أو مصدر البيانات الخاص بك
//     axios.get("https://api.example.com/users")
//       .then(response => {
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);

//   const handleDeleteUser = (userId) => {
//     // قم بإجراء طلب لحذف المستخدم باستخدام معرف المستخدم
//     axios.delete(`https://api.example.com/users/${userId}`)
//       .then(response => {
//         // قم بتحديث قائمة المستخدمين بعد الحذف
//         setUsers(users.filter(user => user.id !== userId));
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   const handleEditUser = (userId) => {
//     // قم بتوجيه المستخدم إلى صفحة التعديل باستخدام معرف المستخدم
//     // يمكنك استخدام React Router لتنفيذ هذا الأمر
//     // مثال: history.push(`/edit-user/${userId}`);
//   };

const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      accountType: "مستقل",
      email: "moh@gmail.com",
      creationDate: "2022-01-01",
    //   status: "Active"
    },
    // قائمة المستخدمين الأخرى
  ]);

  const handleAccept = (userId) => {
    // تنفيذ الإجراء المناسب عند النقر على زر القبول بناءً على معرف المستخدم
    console.log("Accepted status for user with ID:", userId);
  };

  const handleReject = (userId) => {
    // تنفيذ الإجراء المناسب عند النقر على زر الرفض بناءً على معرف المستخدم
    console.log("Rejected status for user with ID:", userId);
  };
  return (
    <>

 <div className="overflow-x-auto ">
<table className="min-w-full divide-y text-center  divide-gray-200">
      <thead>
        <tr>
          <th className="w-[5%]  px-2 py-2 text-sm font-semibold tracking-wider">
            ID
          </th>
          <th className="w-1/2 px-4 py-2 text-sm font-semibold tracking-wider">
            اسم المستخدم
          </th>
          <th className="w-1/2 px-2 py-2 text-sm font-semibold tracking-wider">
            نوع الحساب
          </th>
          <th className="w-1/2 px-2 py-2 text-sm font-semibold tracking-wider">
            الايميل
          </th>
          <th className="w-1/2 px-2 py-2 text-sm font-semibold tracking-wider">
            تاريخ انشاء الحساب
          </th>
          <th className="w-1/3 px-2 py-2 text-sm font-semibold tracking-wider">
            الحالة
          </th>
         
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-700">
        {users.map((user) => (
          <tr key={user.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              {user.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              {user.name}
            </td>
            <td className="w-fit px-2 py-4 whitespace-nowrap text-sm text-gray-700">
              {user.accountType}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              {user.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              {user.creationDate}
            </td>
            <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700">
            <button  onClick={() => handleAccept(user.id)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">قبول</button>
            <button type="button" onClick={() => handleReject(user.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">رفض</button>
             {/* <button onClick={() => handleAccept(user.id)}
 className="bg-green-600 py-2 rounded-lg text-white px-4 border-2">قبول </button>
             <button   className="bg-red-600 px-2  h-8 text-sm font-medium text-white  rounded-s  ">رفض</button> */}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </>
  );
}

