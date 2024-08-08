import React, { useState, useEffect } from 'react';

import ClientReview from '../Reviews/ClientReview';
import axios from '../../../../../axios/axios';

export const OfferList = () => {
  const [offers, setOffers] = useState([]);
  const [currentOffer, setCurrentOffer] = useState(null);

  useEffect(() => {
    // استدعاء API لجلب العروض عندما يتم تحميل الكمبوننت
    axios.get('/bids')
   
      .then(response => {
        setOffers(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching offers:', error);
      });
  }, []);

  const handleOfferClick = (offer) => {
    setCurrentOffer(offer);
  };

  return (
    <div className='overflow-x-auto'>
      <div className="container mx-auto text-right">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">عروض الخدمات</h1>
          <div className="overflow-x-auto">
            <table className="w-full border min-w-full border-gray-200 rounded-md">
              <thead>
                <tr>
                  <th className="py-2 px-2">اسم العارض</th>
                  <th className='py-2 '>تاريخ العرض</th>
                  <th className='py-2 '>السعر المقترح</th>
                  <th className='py-2 '>مدة التسليم المقترحة</th>
                  <th className='py-2 '>حالة العرض</th>
                  <th className='py-2 '>عرض</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer.id} onClick={() => handleOfferClick(offer)}>
                    <td className='py-2 '>{offer.freelancer.firstName}</td>
                    <td className='py-2 '>{offer.created_at}</td>
                    <td className='py-2 '> {offer.bid_amount}</td>
                    <td className='py-2 '>{offer.dateTime}</td>
                    <td>
                      <div>
                        {offer.status === 'pending' && (
                          <span className="bg-yellow-500 text-white px-2 py-1 rounded-md">قيد الانتظار</span>
                        )}
                        {offer.status === 'in_progress' && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-md">مقبول</span>
                        )}
                        {offer.status === 'rejected' && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-md">مرفوض</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-blue">عرض</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {currentOffer && (
            <div className="mt-4">
              <div className="mb-4 border border-gray-200 rounded-md p-4">
                <h4 className="font-bold">{currentOffer.offererName}</h4>
                <p className="text-gray-600">عرض بتاريخ {currentOffer.offerDate}</p>
                <div className="mt-2">
                  <p>السعر المقترح: {currentOffer.proposedPrice}</p>
                  <p>مدة التسليم المقترحة: {currentOffer.proposedDeliveryTime}</p>
                </div>
                <div className="mt-2">
                  <p>رسالة العرض: {currentOffer.offerMessage}</p>
                </div>
              </div>

              <div className="mt-4">
                <h5 className="font-bold">مقارنة مع أفضل عرض:</h5>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>عرضك</th>
                      <th>أفضل عرض</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>السعر</td>
                      <td>{currentOffer.proposedPrice}</td>
                      <td>{offers[0].proposedPrice}</td>
                    </tr>
                    <tr>
                      <td>مدة التسليم</td>
                      <td>{currentOffer.proposedDeliveryTime}</td>
                      <td>{offers[0].proposedDeliveryTime}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4">
                <h5 className="font-bold">تقييمات العميل:</h5>
                {currentOffer && <ClientReview
                  clientName={currentOffer.clientName}
                  clientRating={currentOffer.clientRating}
                  reviews={currentOffer.reviews}
                />}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// import React, { useState } from 'react';
// import ClientReview from "../Reviews/ClientReview"
// export const OfferList = () => {
//     const [offers, setOffers] = useState([
//         {
//          id: 1,
//          offererName: 'John Doe',
//          offerDate: '2024-04-23',
//          proposedPrice: 100,
//          proposedDeliveryTime: '1 days',
//          offerStatus: 'Pending',
//          offerMessage: 'I can complete this project in 3 days for $100.',
//          clientName: 'Jane Smith',
//          clientRating: 4.5,
//          completedProjects: 10,
//          clientCountry: 'USA',
//          reviews: [
//           { reviewerName: 'John Doe', rating: 5, comment: 'Excellent work!' },
//           { reviewerName: 'Jane Smith', rating: 4, comment: 'Good job, but could be better.' },
//          ],
//         },
//         {
//             id: 1,
//             offererName: 'Salam ',
//             offerDate: '2024-04-23',
//             proposedPrice: 200,
//             proposedDeliveryTime: '2 days',
//             offerStatus: 'Rejected',
//             offerMessage: 'I can complete this project in 3 days for $100.',
//             clientName: 'Jane Smith',
//             clientRating: 2.5,
//             completedProjects: 2,
//             clientCountry: 'YEM',
//             reviews: [
//              { reviewerName: 'Ahmed Doe', rating: 5, comment: 'Excellent work!' },
//              { reviewerName: 'Ali Smith', rating: 4, comment: 'Good job, but could be better.' },
//             ],
//            },
//            {
//             id: 1,
//             offererName: 'mohammed Doe',
//             offerDate: '2024-04-23',
//             proposedPrice: 50,
//             proposedDeliveryTime: '0 days',
//             offerStatus: 'Approved',
//             offerMessage: 'I can complete this project in 3 days for $100.',
//             clientName: 'Jane Smith',
//             clientRating: 2.5,
//             completedProjects: 10,
//             clientCountry: 'YEM',
//             reviews: [
//              { reviewerName: 'saif Doe', rating: 5, comment: 'Excellent work!' },
//              { reviewerName: 'عبدالعزيز ', rating: 4, comment: 'Good job, but could be better.' },
//             ],
//            },
//         // ... المزيد من العروض
//        ]);
      
//        const [currentOffer, setCurrentOffer] = useState(null);
      
//        const handleOfferClick = (offer) => {
//         setCurrentOffer(offer);
//        };

//   return (
//     <div className=' overflow-x-auto'>
//     <div className="container mx-auto text-right">
//     <div className="flex flex-col">
//       <h1 className="text-3xl font-bold mb-4">عروض الخدمات</h1>
//       <div className="overflow-x-auto">
//         <table className="w-full border min-w-full border-gray-200 rounded-md">
//           <thead>
//             <tr>
//               <th className="py-2 px-2">اسم العارض</th>
//               <th className='py-2 '>تاريخ العرض</th>
//               <th className='py-2 '>السعر المقترح</th>
//               <th className='py-2 '>مدة التسليم المقترحة</th>
//               <th className='py-2 '>حالة العرض</th>
//               <th className='py-2 '>عرض</th>
//             </tr>
//           </thead>
//           <tbody>
//             {offers.map((offer) => (
//               <tr key={offer.id} onClick={() => handleOfferClick(offer)}>
//                 <td className='py-2 '>{offer.offererName}</td>
//                 <td className='py-2 '>{offer.offerDate}</td>
//                 <td className='py-2 '> {offer.proposedPrice}</td>
//                 <td className='py-2 '>{offer.proposedDeliveryTime}</td>
//                 <td>
//                             <div>
//                     {offer.offerStatus === 'Pending' && (
//                         <span className="bg-yellow-500 text-white px-2 py-1 rounded-md">قيد الانتظار</span>
//                     )}
//                     {offer.offerStatus === 'Approved' && (
//                         <span className="bg-green-500 text-white px-2 py-1 rounded-md">مقبول</span>
//                     )}
//                     {offer.offerStatus === 'Rejected' && (
//                         <span className="bg-red-500 text-white px-2 py-1 rounded-md">مرفوض</span>
//                     )}
//                     </div>
//                 </td>
//                 <td>
//                   <button className="btn btn-sm btn-blue">عرض</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {currentOffer && (
//         <div className="mt-4">
//           <div className="mb-4 border border-gray-200 rounded-md p-4">
//             <h4 className="font-bold">{currentOffer.offererName}</h4>
//             <p className="text-gray-600">عرض بتاريخ {currentOffer.offerDate}</p>
//             <div className="mt-2">
//               <p>السعر المقترح: {currentOffer.proposedPrice}</p>
//               <p>مدة التسليم المقترحة: {currentOffer.proposedDeliveryTime}</p>
//             </div>
//             <div className="mt-2">
//               <p>رسالة العرض: {currentOffer.offerMessage}</p>
//             </div>
//           </div>

//           <div className="mt-4">
//             <h5 className="font-bold">مقارنة مع أفضل عرض:</h5>
//             <table className="w-full">
//               <thead>
//                 <tr>
//                   <th></th>
//                   <th>عرضك</th>
//                   <th>أفضل عرض</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>السعر</td>
//                   <td>{currentOffer.proposedPrice}</td>
//                   <td>{offers[0].proposedPrice}</td>
//                 </tr>
//                 <tr>
//                   <td>مدة التسليم</td>
//                   <td>{currentOffer.proposedDeliveryTime}</td>
//                   <td>{offers[0].proposedDeliveryTime}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <div className="mt-4">
//             <h5 className="font-bold">تقييمات العميل:</h5>
//             {currentOffer && <ClientReview 
//                 clientName={currentOffer.clientName} 
//                 clientRating={currentOffer.clientRating} 
//                 reviews={currentOffer.reviews} 
//             />}
//           </div>
         
//         </div>
//       )}
//     </div>
//   </div>
//   </div>
//   );
// };

