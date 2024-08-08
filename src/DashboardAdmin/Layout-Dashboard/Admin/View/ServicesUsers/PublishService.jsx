import React, { useState, useEffect } from "react";
import axios from "../../../../../axios/axios";

const PublishService = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Fetch services data from the database or API
    const fetchServicesData = async () => {
      try {
        const response = await axios.get('/services/pending');
        const data = response.data;
        setServices(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServicesData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleApprove = (e, request) => {
    const response = axios.post(`/service/${request.id}/status`, { status: 'approved' });
    const data = response.data;
  };

  const handleReject = (e, request) => {
    e.preventDefault();
    const response = axios.post(`/service/${request.id}/status`, { status: 'refund' });
    const data = response.data;
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = services.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(services.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">لوحة تحكم طلبات الخدمات</h1>

      <div className="list">
        {currentItems.map((request) => (
          <>
          <div className="bg-gray-50 rounded-md shadow-md p-4">
            <div className="bg-white  p-4 rounded-md shadow-md">
              <div className="flex justify-between">
                <div className="w-1/2 p-2 text-wrap text-right text">
                  <h3 className="text-lg font-bold mb-2">{request.title}</h3>
                  <p className="text-gray-600 mb-3">{request.description}</p>
                </div>
                <div className="w-1/2">
                  <img
                    src={"http://localhost:8000/" + request.image}
                    className="h-auto max-w-full rounded-lg"
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-between ">
                <div className="flex items-center">
                  <span className="text-gray-700">الفئة:</span>
                  <span className="text-sm font-medium ml-2">
                    {request.category}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-700">الحالة:</span>
                  <span className="text-sm font-medium ml-2">
                    {request.status === "pending"
                      ? "معلق"
                      : request.status === "approved"
                      ? "مقبول"
                      : "مرفوض"}
                  </span>
                </div>
                <div className="flex justify-end gap-2 items-center mt-4">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md focus:outline-none"
                    onClick={(e) => handleApprove(e, request)}
                  >
                    قبول الطلب
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none ml-2"
                    // onClick={handleReject(e,request)}
                    onClick={(e) => handleReject(e, request)}
                  >
                    رفض الطلب
                  </button>
                </div>
              </div>
            </div>
          </div>{" "}
        </>
        ))}
      </div>

      <div className="pagination flex justify-center mt-4">
        {currentPage > 1 && (
          <button
            className="px-4 py-2   mb-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none ml-3"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`px-4 py-2  ml-1  mb-2 rounded-md focus:outline-none ${
              pageNumber === currentPage
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        {currentPage < pageNumbers.length && (
          <button
            className="px-4 py-2  mb-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none mr-2"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PublishService;