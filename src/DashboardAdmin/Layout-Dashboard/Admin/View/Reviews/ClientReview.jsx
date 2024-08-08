import React from 'react';
//import { TailwindProvider } from 'tailwindcss-react';

const ClientReview = ({ clientName, clientRating, reviews }) => {
  return (
    <div className="mb-2 border border-gray-200 rounded-md p-4">
      <h5 className="font-bold">{clientName}</h5>
      <p className="text-gray-600">تقييم: {clientRating} / 5</p>
      {reviews.map((review) => (
        <div className="mt-2">
          <p>{review.reviewerName}: {review.rating} / 5</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ClientReview;