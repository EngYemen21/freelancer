import React, { useEffect } from 'react';
import { FaMonero } from 'react-icons/fa';
import { useState } from 'react';
import axios from '../../../../../axios/axios';
import moment from 'moment';
export default function WithdrawalsHistory () {
    const [expandedWithdrawalId, setExpandedWithdrawalId] = useState(null);
    const [withdrawals,setWithdrawals]=useState([]);
    const [requests, setRequests] = useState([]);
    
   useEffect(()=>{

    const getWithdrawal = async() => {
      const response=await axios.get('/withdrawals');
      const data=response.data;
      setWithdrawals(data)
      console.log(data);


    }
    getWithdrawal();
   },[])

    const getStatusColor = (status) => {
        switch (status) {
          case 'Completed':
            return 'text-green-500';
          case 'Pending':
            return 'text-yellow-500';
          case 'cenceled':
            return 'text-red-500';
          default:
            return 'text-gray-500';
        }
      };
    // const withdrawals = [
    //     {
    //       id: 1,
    //       user: {
    //         name: "John Doe",
    //         avatar: "avatar.jpg",
    //       },
    //       date: "2022-10-15",
    //       amount: 100,
    //       method: "Bank Transfer",
    //       status: "قيد الانتظار",
    //     },
    //     {
    //       id: 2,
    //       user: {
    //         name: "Jane Smith",
    //         avatar: "avatar.jpg",
    //       },
    //       date: "2022-11-02",
    //       amount: 50,
    //       method: "PayPal",
    //       status: "قيد الانتظار",
    //     },
    //     // ... أضف المزيد من سجلات السحب هنا
    //   ];
      const [updatedWithdrawals, setUpdatedWithdrawals] = useState(withdrawals);

      const handleExpandWithdrawal = (withdrawalId) => {
        if (expandedWithdrawalId === withdrawalId) {
          setExpandedWithdrawalId(null);
        } else {
          setExpandedWithdrawalId(withdrawalId);
        }
      };
    
 
      // const handleAcceptWithdrawal = (withdrawalId) => {
      //   // تحديث حالة السحب إلى مقبول
      //   const updatedWithdrawalsList = updatedWithdrawals.map((withdrawal) => {
      //     if (withdrawal.id === withdrawalId) {
      //       return { ...withdrawal, status: 'Completed' };
      //     }
      //     return withdrawal;
      //   });
      const handleAcceptWithdrawal = (id) => {
        // console.log(id)
        axios.post(`/withdrawal-requests/${id}/approve`)
          .then(() => setWithdrawals(withdrawals.map(req => req.id === id ? { ...req, status: 'Completed' } : req)))
          .catch(error => console.error(error));
      };
    
      const handleRejectWithdrawal = (id) => {
        axios.post(`/withdrawal-requests/${id}/reject`)
          .then(() => setWithdrawals(withdrawals.map(req => req.id === id ? { ...req, status: 'cancelled' } : req)))
          .catch(error => console.error(error));
      };
    
        // setUpdatedWithdrawals(updatedWithdrawalsList);
    
        // إجراءات إضافية (مثل إشعار المستخدم) يمكن إضافتها هنا
      
    
      // const handleRejectWithdrawal = (withdrawalId) => {
      //   // تحديث حالة السحب إلى مرفوض
      //   const updatedWithdrawalsList = updatedWithdrawals.map((withdrawal) => {
      //     if (withdrawal.id === withdrawalId) {
      //       return { ...withdrawal, status: 'cenceled' };
      //     }
      //     return withdrawal;
      //   });
    
      //   setUpdatedWithdrawals(updatedWithdrawalsList);
    
      //   // إجراءات إضافية (مثل إشعار المستخدم) يمكن إضافتها هنا
      // };
    
      return (
        <div className=' overflow-x-auto'>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-4"> عمليات السحب الاموال </h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">اسم العميل</th>
                <th className="py-2 px-4 border-b">التاريخ الطلب</th>
                <th className="py-2 px-4 border-b">المبلغ</th>
                <th className="py-2 px-4 border-b">رقم الحساب</th>
                
                <th className="py-2 px-4 border-b">طريقة الدفع</th>
                <th className="py-2 px-4 border-b">الحالة</th>
                <th className="py-2 px-4 border-b">الاجراء</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal.id}>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center">
                      <img
                        src={withdrawal.user.firstName}
                        alt={withdrawal.user.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span>{withdrawal.user.firstName}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">{moment(withdrawal.withdrawal_date).format('dddd, D MMMM YYYY, h:mm A')}</td>
                  <td className="py-2 px-4 border-b">{withdrawal.amount}</td>
                  <td className="py-2 px-4 border-b">444444</td>
                  <td className="py-2 px-4 border-b">{withdrawal.withdrawal_method}</td>
                  <td className={`py-2 px-4 border-b ${getStatusColor(withdrawal.withdrawal_status)}`}>
                    {withdrawal.withdrawal_status}
                  </td>
                  <td className="py-2 px-4 border-b flex  flex-col place-items-center">
                    {withdrawal.withdrawal_status === 'pending' && (
                      <>
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded  mb-2"
                          onClick={() => handleAcceptWithdrawal(withdrawal.id)}
                        >
                          قبول
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleRejectWithdrawal(withdrawal.id)}
                        >
                          رفض
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>

      );
}