// ProjectApprovalDashboard.js

import React, { useState, useEffect } from "react";
import axios from "../../../../../axios/axios";

const GigProject = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/projects/pending");
      setProjects(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleApprove = async (projectId) => {
    try {
      await axios.put(`/projects/${projectId}/approve`);
      alert("Project approved successfully");
      // إعادة تحميل القائمة بالمشاريع بعد الموافقة
      fetchProjects();
    } catch (error) {
      console.error("Error approving project:", error);
      alert("Failed to approve project");
    }
  };

  const handleReject = async (projectId) => {
    const reason = prompt("Enter reason for rejection:");
    try {
      await axios.put(`/api/projects/${projectId}/reject`, { reason });
      alert("Project rejected successfully");
      // إعادة تحميل القائمة بالمشاريع بعد الرفض
      fetchProjects();
    } catch (error) {
      console.error("Error rejecting project:", error);
      alert("Failed to reject project");
    }
  };

  return (
    <div className="font-arabic tracking-wider">
      {/* <h2 className='text-2xl p-4 m-2 '>المشاريع   </h2>
      {projects.map(project => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>Expected Price: ${project.budget}</p>
        
        
          <hr />
        </div>
      ))} */}

      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">لوحة تحكم طلبات الخدمات</h1>

        <div className="list">
          {projects.map((project) => (
            <>
              <div
                key={project.id}
                className="bg-gray-50 rounded-md shadow-md p-4"
              >
                <div className="bg-white  p-4 rounded-md shadow-md">
                  <div className="flex justify-between">
                    <div className="w-1/2 p-2 text-wrap text-right text">
                      <h3 className="text-lg font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {project.description}
                      </p>
                      <p className="text-gray-600 mb-3">
                        {" "}
                        السعر المتوقع: ${project.budget}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2 items-center mt-4">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md focus:outline-none"
                        onClick={() => handleApprove(project.id)}
                      >
                        قبول
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none ml-2"
                        onClick={() => handleReject(project.id)}
                      >
                        رفض
                      </button>
                    </div>
                  </div>
                </div>
              </div>{" "}
            </>
          ))}
        </div>

        {/* <div className="pagination flex justify-center mt-4">
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
      </div> */}
      </div>
    </div>
  );
};

export default GigProject;
