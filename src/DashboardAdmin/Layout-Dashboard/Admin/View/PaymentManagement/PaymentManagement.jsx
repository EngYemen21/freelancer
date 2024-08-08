import { useState, useEffect } from "react";
import axios from "../../../../../axios/axios";
import moment from "moment";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchPayments = async () => {
      const response = await axios.get("/payments");
      setPayments(response.data);
    };
    fetchPayments();
  }, []);

  // Calculate pagination data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  // Pagination navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h1 className="p-4 m-2 font-arabic tracking-wider text-2xl">
        إدارة المدفوعات
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full text-right table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2">Payment ID</th>
              <th className="px-4 py-2">Sender</th>
              <th className="px-4 py-2">Payment Method</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((payment) => (
              <tr
                key={payment.id}
                className="border-b hover:bg-gray-100 transition-colors duration-300"
              >
                <td className="px-4 py-2">{payment.id}</td>
                <td className="px-4 py-2">{payment.user.firstName}</td>
                <td className="px-4 py-2">{payment.payment_method}</td>
                <td className="px-4 py-2">{payment.amount}</td>
                <td className="px-4 py-2">
                  {moment(payment.created_at).format(
                    "dddd, D MMMM YYYY, h:mm A"
                  )}
                </td>
                <td
                  className={`px-4 py-2 ${
                    payment.status === "Pending"
                      ? "text-yellow-500"
                      : payment.status === "Approved"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination navigation */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`mx-2 px-4 py-2 rounded-md ${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentManagement;