import React, { useState } from "react";
import { FaClock, FaUser } from "react-icons/fa";
import axios from './../../axios/axios';

const AddRating = ({ contracts,project }) => {
    // const [sendComment,setSendComment]=useState(true)
    const [newComment,setNewComment]=useState(true)
    // console.log(services.id)
    console.log(contracts)
    // console.log(contracts)
  const [rating, setRating] = useState({
    quality_score: 0,
    delivery_speed_score: 0,
    communication_score: 0,
    deadline_adherence_score: 0,
    overall_score: 0,
    // comment: "",
  });

  const handleRatingClick = (scoreType, newScore) => {
    setRating((prevRating) => ({
      ...prevRating,
      [scoreType]: newScore,
      overall_score: (
        (prevRating.quality_score +
          prevRating.delivery_speed_score +
          prevRating.communication_score +
          prevRating.deadline_adherence_score) /
        4
      ).toFixed(2),
    }));
  };

  const handleCommentChange = (event) => {
    setRating((prevRating) => ({
      ...prevRating,
      comment: event.target.value,
    }));
  };


  const handleSubmit = async () => {
    try {
      console.log( contracts);
      
      await axios.post("/ratings", {
        // service_id: 96 ,
        // project_id:null,
        contract_id: contracts[0].id,
        // client_id: orders.buyer_id,
        // comment:NewComment,
        ...rating,
      });
      // Reset the rating state after successful submission
      setRating({
        quality_score: 0,
        delivery_speed_score: 0,
        communication_score: 0,
        deadline_adherence_score: 0,
        overall_score: 0,
        comment: "",
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="bg-gray-50">
     
        <div className=" flex flex-col shadow-sm p-2 bg-white">
          <div className="flex gap-1 justify-between pt-3">
        <div>الجودة:</div>
        <div className="flex">
           {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={`quality_${star}`}
            className={`w-5 h-5 ms-2   ${
              star <= rating.quality_score
                ? "text-yellow-300"
                : "text-gray-300 dark:text-gray-500"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
            onClick={() => handleRatingClick("quality_score", star)}
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}  
        </div>
       
      </div>
      {/* <div className="flex gap-1 justify-between"> */}
      <div className="flex gap-1 justify-between pt-3">

        <div>سرعة التوصيل:</div>
        <div className="flex">
             {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={`delivery_${star}`}
            className={`w-5 h-5 ms-2  ${
              star <= rating.delivery_speed_score
                ? "text-yellow-300"
                : "text-gray-300 dark:text-gray-500"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
            onClick={() => handleRatingClick("delivery_speed_score", star)}
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}  
        </div>
     
      {/* </div> */}
      </div>
      <div className="flex gap-1 justify-between pt-3">
        <div>التواصل:</div>
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={`communication_${star}`}
                        className={`w-5 h-5 ms-2  ${
                        star <= rating.communication_score
                            ? "text-yellow-300"
                            : "text-gray-300 dark:text-gray-500"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        onClick={() => handleRatingClick("communication_score", star)}
                    >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    ))}
        </div>
      
      </div>
      <div className="flex  justify-between  gap-1 pt-3">
        <div>الالتزام بالموعد النهائي</div>
        <div className="flex">
    {[1, 2, 3, 4, 5].map((star) => (
            <svg
                key={`deadline_${star}`}
                className={`w-5 h-5 ms-2  ${
                star <= rating.deadline_adherence_score
                    ? "text-yellow-300"
                    : "text-gray-300 dark:text-gray-500"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                onClick={() => handleRatingClick("deadline_adherence_score", star)}
            >
                {" "}
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />{" "}
            </svg>
            ))}
        </div>
      
      </div>  
    <div className="m-4 ">
           <form action="POST">
                        </form>
                    
                            <form action="POST" className="mt-2 w-full">
                            <textarea
                        id="comment"
                        value={rating.comment}
                        onChange={handleCommentChange}
                        rows="3"
                        className="w-full border border-gray-300 rounded p-2"
                        ></textarea>        
                       <button onClick={handleSubmit} className="bg-green-500  px-6 text-white py-2 rounded-md " type="button">أضف رد</button>
                        </form>
                     

                       
                    </div>
        </div>
        
        
 
    </div>
  );
};

export default AddRating;
