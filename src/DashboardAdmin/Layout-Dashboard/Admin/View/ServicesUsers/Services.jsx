import React, { useState, useEffect } from 'react';
import axios from '../../../../../axios/axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(10);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'text-green-600';
      case 'Inactive':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  useEffect(() => {
    // Fetch services data from the database or API
    const fetchServicesData = async () => {
      try {
        const response = await axios.get('/services');
        const data = response.data;
        setServices(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServicesData();
  }, []);

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  return (
    <div className="relative overflow-x-auto  ">
      <table className="w-full text-md text-left bg-white divide-y divide-gray-400 rtl:text-right ">
        <thead className="text-xs text-gray-700 uppercase bg-white shadow-sm ">
          <tr className=" text-center text-sm font-medium">
            <th className="px-6 py-3" scope="col">
              ID
            </th>
            <th className="w-full px-2 py-2 text-sm font-semibold tracking-wider">Image</th>
            <th className="w-full px-2 py-2 text-sm font-semibold tracking-wider">Title</th>
            <th className=" px-24 py-3">Description</th>
            <th className="w-full px-2 py-2 text-sm font-semibold tracking-wider">Price</th>
            <th className="w-full px-2 py-2 text-sm font-semibold tracking-wider">Category</th>
            <th className="w-full px-2 py-2 text-sm font-semibold tracking-wider">Status</th>
            <th className="w-full px-2 py-2 text-sm font-semibold tracking-wider">Execution Time</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-400'>
          {currentServices.map((service) => (
            <tr key={service.id} className="w-full px-2 py-2 text-sm font-semibold tracking-wider">
              <td className="px-4 py-2">{service.id}</td>
              <td className="w-full px-2 py-2 text-sm font-semibold tracking-wider">
                <img
                  src={"http://localhost:8000/" + service.image}
                  alt={service.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </td>
              <td className="w-full px-2 py-2 text-sm font-semibold tracking-wider">{service.title}</td>
              <td className="w-full px-2 py-2 text-sm font-semibold tracking-wider">{service.description.substring(0, 100)}...</td>
              <td className="w-full px-2 py-2 text-sm font-semibold tracking-wider">${service.price}</td>
              <td className={`w-full px-2 py-2 text-sm font-semibold tracking-wider ${getStatusColor(service.status)}`}>
                {service.status}
              </td>
              <td className="w-full px-2 py-2 text-sm font-semibold tracking-wider">{service.delivery_time} days</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col-reverse justify-center items-center mt-4  ">
        <div className='py-4'>
        <span className="text-sm text-gray-700 dark:text-gray-400">
      Showing <span className="font-semibold text-gray-900 "> {indexOfFirstService + 1}</span> to <span className="font-semibold text-gray-900 "> {indexOfLastService}</span> of <span className="font-semibold text-gray-900"> {services.length}</span> services
  </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className={`px-3  py-1 rounded-md bg-gray-200 transition-colors ${
              currentPage === 1 ? 'cursor-not-allowed' : ''
            }`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(services.length / servicesPerPage) }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                className={`px-3 py-1 rounded-md hover:bg-gray-200 transition-colors ${
                  currentPage === pageNumber ? 'bg-gray-200' : ''
                }`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            className={`px-3 py-1 rounded-md bg-gray-200 transition-colors ${
              currentPage === Math.ceil(services.length / servicesPerPage)
                ? 'cursor-not-disabled'
                : ''
            }`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(services.length / servicesPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;