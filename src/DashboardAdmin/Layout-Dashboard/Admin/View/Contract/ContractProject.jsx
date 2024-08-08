import React, { useEffect, useState } from 'react';
import axios from '../../../../../axios/axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ContractProject = () => {
  const [contracts, setContracts] = useState([]);
  const navgiate=useNavigate()

  useEffect(() => {
    // استدعاء API لجلب العقود من Laravel backend
    axios.get('/get-acceptedBids-Contract')
      .then(response => {
        setContracts(response.data);
        console.log(contracts);
      })
      .catch(error => {
        console.error('Error fetching contracts:', error);
      });
  }, []);
 
  const originalDate = '2024-06-03T00:00:00.000000Z';
const formattedDate = moment(originalDate).format('dddd, D MMMM YYYY, h:mm A');

const calculateRemainingTime = (startDate, endDate) => {
  const start = moment(startDate);
  const end = moment(endDate);

  // التأكد من أن تاريخ النهاية أكبر من تاريخ البداية
  if (end.isBefore(start)) {
      return 'تاريخ النهاية يجب أن يكون بعد تاريخ البداية';
  }

  const duration = moment.duration(end.diff(start));

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();

  let remainingTime = '';
  if (days > 0) {
      remainingTime += `${days} أيام `;
  }
  if (hours > 0) {
      remainingTime += `${hours} ساعات `;
  }

  return remainingTime.trim();
};
const hendleNavgateToService=(serviceID)=>{
  navgiate(`/details-service/${serviceID}`)
  

}


  return (
    <div className=' overflow-x-auto'>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">عقود المشاريع</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="bg-gray-100 p-2 border-b">رقم العقد</th>
            <th className="bg-gray-100 p-2 border-b">العميل</th>
            <th className="bg-gray-100 p-2 border-b">المستقل</th>
            <th className="bg-gray-100 p-2 border-b">الحالة</th>
            <th className="bg-gray-100 p-2 border-b">المشروع</th>
            <th className="bg-gray-100 p-2 border-b">تاريخ البدء</th>
            <th className="bg-gray-100 p-2 border-b">تاريخ الانتهاء</th>
            <th className="bg-gray-100 p-2 border-b"> الوقت المتبقي</th>
            <th className="bg-gray-100 p-2 border-b">المبلغ الإجمالي</th>
            <th className="bg-gray-100 p-2 border-b"> عرض المشروع</th>
            {/* <th className="bg-gray-100 p-2 border-b">الوصف</th> */}
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract) => (
            <tr key={contract.id}>
              <td className="p-2 border-b">{contract.id}</td>
              <td className="p-2 border-b">{contract.project.client.firstName}</td>
              <td className="p-2 border-b">{contract.freelancer.firstName}</td>
              <td className="p-2 border-b">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    contract.status === 'in_progress'
                      ? 'bg-green-500'
                      : contract.status === 'pending'
                      ? 'bg-yellow-500'
                      : contract.status === 'Completed'
                      ? 'bg-blue-500'
                      : contract.status === 'cencelled'
                      ? 'bg-red-500'
                      : ''
                  }`}
                >
                  {contract.status}
                </span>
              </td>
              <td className="p-2 border-b">{contract.project.title}</td>
              <td className="p-2 border-b">{moment(contract.accepted_at).format('dddd, D MMMM YYYY, h:mm A')}</td> 
              <td className="p-2 border-b">{moment(contract.end_date).format('dddd, D MMMM YYYY, h:mm A')}</td>
              <td className="p-2 border-b">{calculateRemainingTime(contract.accepted_at,contract.end_date)}</td>
              <td className="p-2 border-b">{contract.project.budget}</td>
              <td className="p-2 border-b">
                <button onClick={()=>hendleNavgateToService(contract.service.id)}>تفاصيل</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
  );
};

export default ContractProject;