
import React, { useEffect, useState } from 'react';
import axios from '../../../../../axios/axios';
// import { TailwindProvider } from 'tailwindcss-react';
export default function OffersProject (){

  const [offers, setOffers] = useState([]);
  const [currentOffer, setCurrentOffer] = useState(null);

  useEffect(() => {
    // استدعاء API لجلب العروض عندما يتم تحميل الكمبوننت
    axios.get('/projects')
   
      .then(response => {
        setOffers(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching offers:', error);
      });
  }, []);

  // بيانات المشاريع والعروض

  // عرض بطاقة مشروع
  const ProjectCard = ({ project }) => (
    <div className="mb-4 border border-gray-200 border-3 font-arabic tracking-wide rounded-md p-4">
      <div className='flex justify-between'>
          <h4 className="font-bold">{project.title}</h4>
          <div>
          {project.status.status === 'Pending' && (
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-md">بإنتظار العروض </span>
          )}
          {project.status.status === 'Completed' && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-md">مكتمل تم التسليم</span>
          )}
           {project.status.status === 'In Progress' && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-md">جاري التنفيذ</span>
          )}
            {project.status.status === 'awaiting_confirmation' && (
            <span className="bg-blue-500 text-white px-2 py-1 rounded-md"> بانتظار موافقة المشتري</span>
          )}
          {project.status.status === 'Cancelled' && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-md">مرفوض</span>
          )}
        </div>
      </div>
    
      
      <p className="text-gray-600">
        {project.category.name} - {project.budget} 
      </p>

      <p className="mt-2">{project.description}</p>
     
    </div>
    
  );

  // عرض بطاقة عرض خدمة
  const OfferCard = ({ offer }) => (
    <div className="mb-4 border border-b-2 font-arabic tracking-wide border-gray-200 bg-gray-100 mr-12 rounded-md p-4">
      <div className="flex justify-between">
        <div>
          {/* <h5 className="font-bold">{offer.freelancer.firstName}</h5> */}
          <p className="text-gray-600">عرض بتاريخ {offer.created_at          }</p>
        </div>
       
      </div>
      <div className="mt-2">
        <p>السعر المقترح: {offer.bid_amount} </p>
        <p>مدة التسليم المقترحة: {offer.dateTime}</p>
      </div>
      <div className="mt-2">
        <p>رسالة العرض: {offer.bid_description}</p>
      </div>

    </div>
  );



  // عرض قائمة عروض الخدمات لمشروع
  const ProjectOffers = ({projectID,  offerss }) => (
    <div className="mt-2">
   
      <h5 className="font-bold font-arabic p-2">العروض على المشروع:</h5>
     
      <ul>
        {offerss.map((offer) => (
          <li key={offer.id}>
               {console.log(offer)}
            <OfferCard offer={offer} />
          </li>
        ))}
      </ul>
    </div>
  );


  // عرض قائمة المشاريع
  const Projects = () => (
    <div>
      <h2 className='p-2 font-arabic tracking-wide font-bold text-xl'>المشروع</h2>
      {offers.map((project) => (
        <div key={project.id} className="mb-4">
          <ProjectCard project={project} />
          <ProjectOffers projectID={project.id}  offerss={project.bids} />
      
        </div>
      ))}
    </div>
  );

  return (
    <>
     <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4 mt-2 font-arabic tracking-wide ">  قائمة المشاريع مع العروض</h1>
      <Projects />  {/* استدعاء مكون Projects */}
    </div>
    
    </>
   
  );
}