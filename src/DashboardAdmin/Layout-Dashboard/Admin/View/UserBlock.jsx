import { useEffect, useState } from "react";
import axios from "../../../../axios/axios";
// import axios from './../../../../axios/axios';
export default function UserBlock(){
  const [users,setUser]=useState([]);

  useEffect(()=>{
    const fetchuserBlocked=async ()=>{
      const response=await axios.get('/get-user-blocked');
      const data=response.data.user;
      setUser(data);
      console.log(data);

    }
  fetchuserBlocked();
  },[])
    // const [users, setUsers] = useState([
    //     {
    //       id: 1,
    //       name: "John Doe",
    //       accountType: "مستقل",
    //       email: "moh@gmail.com",
    //       creationDate: "2022-01-01",
    //     //   status: "Active"
    //     },
    //     // قائمة المستخدمين الأخرى
    //   ]);
    
      const handleAccept =async (userId) => {
        const response=await axios.head(`/user-unblocked/${userId}`);

        // تنفيذ الإجراء المناسب عند النقر على زر القبول بناءً على معرف المستخدم
        console.log("تم رفع الحظر بنجاح:", response);
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
                  {user.firstName}
                </td>
                <td className="w-fit px-2 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.user_type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.created_at}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700">
                <button  onClick={() => handleAccept(user.id)} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">رفع الحظر</button>
                {/* <button type="button" onClick={() => handleReject(user.id)} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">رفض</button> */}
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