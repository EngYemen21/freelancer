import React, { useState, useEffect } from 'react';

const Refund = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: 'client',
      clientName: 'John Doe',
      freelancerName: 'Jane Smith',
      projectTitle: 'Project A',
      reason: 'Cancellation',
      amount: 100,
      status: 'Pending',
    },
    {
      id: 2,
      type: 'freelancer',
      clientName: 'Alice Johnson',
      freelancerName: 'Bob Williams',
      projectTitle: 'Project B',
      reason: 'Refund',
      amount: 200,
      status: 'Approved',
    },
    // يمكنك إضافة المزيد من البيانات هنا...
  ]);

  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequests = () => {
    if (filterType === 'all') {
      return requests;
    } else if (filterType === 'client') {
      return requests.filter((request) => request.type === 'client');
    } else if (filterType === 'freelancer') {
      return requests.filter((request) => request.type === 'freelancer');
    }
    return [];
  };

  const searchedRequests = () => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    return filteredRequests().filter((request) => {
      const clientName = request.clientName.toLowerCase();
      const freelancerName = request.freelancerName.toLowerCase();
      const projectTitle = request.projectTitle.toLowerCase();
      const reason = request.reason.toLowerCase();

      return (
        clientName.includes(normalizedSearchTerm) ||
        freelancerName.includes(normalizedSearchTerm) ||
        projectTitle.includes(normalizedSearchTerm) ||
        reason.includes(normalizedSearchTerm)
      );
    });
  };

  return (
    <div className=' overflow-x-auto'>

    
    <div className="flex flex-col w-full p-4">
      <div className="flex items-center mb-4">
        <h2 className="font-medium mr-4">Refund Requests</h2>
        <select value={filterType} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="client">Client Requests</option>
          <option value="freelancer">Freelancer Requests</option>
        </select>
        <input
          type="text"
          placeholder="Search by client, freelancer, project title, or reason"
          value={searchTerm}
          onChange={handleSearchChange}
          className="ml-4 border border-gray-300 rounded-md px-2 py-1"
        />
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left px-2 py-1 border border-gray-300">
              Request ID
            </th>
            <th className="text-left px-2 py-1 border border-gray-300">
              Type
            </th>
            <th className="text-left px-2 py-1 border border-gray-300">
              Client
            </th>
            <th className="text-left px-2 py-1 border border-gray-300">
              Freelancer
            </th>
            <th className="text-left px-2 py-1 border border-gray-300">
              Project
            </th>
            <th className="text-left px-2 py-1 border border-gray-300">
              Reason
            </th>
            <th className="text-left px-2 py-1 border border-gray-300">
              Amount
            </th>
            <th className="text-left px-2 py-1 border border-gray-300">
              Status
            </th>
            <th className="text-left px-2 py-1 border border-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {searchedRequests().map((request) => (
            <tr key={request.id} className="border-b border-gray-300">
              <td className="text-sm px-2 py-1">{request.id}</td>
              <td className="text-sm px-2 py-1">{request.type}</td>
              <td className="text-sm px-2 py-1">{request.clientName}</td>
              <td className="text-sm px-2 py-1">{request.freelancerName}</td>
              <td className="text-sm px-2 py-1">{request.projectTitle}</td>
              <td className="text-sm px-2 py-1">{request.reason}</td>
              <td className="text-sm px-2 py-1">{request.amount}</td>
              <td className="text-sm px-2 py-1">{request.status}</td>
              <td className="text-sm px-2 py-1">
                {request.status !== 'Approved' && (
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md">
                    Process Request
                  </button>
                )}
                <button className="bg-gray-500 text-white px-2 py-1 rounded-md">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Refund;