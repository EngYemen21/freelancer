import React, { useState, useEffect } from 'react';
import axios from '../../../../axios/axios';

export default function VerifyUser(){
  const [verifications, setVerifications] = useState([]);

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    try {
      const response = await axios.get('/identity-verifications');
      setVerifications(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error fetching verifications:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.post(`/identity-verifications/${id}/status`, { status });
      alert(response.data.message);
      fetchVerifications(); // تحديث قائمة عمليات التحقق بعد تغيير الحالة
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    }
  };

  return (
    <div className="container mx-auto mt-6 p-4 bg-gray-50 rounded-lg shadow-lg w-[90%] md:w-[60%] lg:w-[40%]">
      <h2 className="text-xl font-semibold mb-4">إدارة عمليات التحقق من الهوية</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">المستخدم</th>
            <th className="px-4 py-2">الصورة الأمامية</th>
            <th className="px-4 py-2">الصورة الخلفية</th>
            <th className="px-4 py-2">الحالة</th>
            <th className="px-4 py-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {verifications.map((verification) => (
            <tr key={verification.id}>
              <td className="border px-4 py-2">{verification.user_id}</td>
              <td className="border px-4 py-2">
                <img src={`http://127.0.0.1:8000/storage/${verification.front_image}`} alt="Front" className="h-20 w-20 object-cover" />
              </td>
              <td className="border px-4 py-2">
                <img src={`http://127.0.0.1:8000/${verification.back_image}`} alt="Back" className="h-20 w-20 object-cover" />
              </td>
              <td className="border px-4 py-2">{verification.status}</td>
              <td className="border px-4 py-2">
                {verification.status === 'pending' && (
                  <div className="flex gap-2">
                    <button onClick={() => updateStatus(verification.id, 'approved')} className="bg-green-500 text-white px-2 py-1 rounded">
                      قبول
                    </button>
                    <button onClick={() => updateStatus(verification.id, 'rejected')} className="bg-red-500 text-white px-2 py-1 rounded">
                      رفض
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};