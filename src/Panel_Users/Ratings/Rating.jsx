import React, { useEffect, useState } from "react";

import moment from "moment";
import "moment/locale/ar";
import { FaBriefcase, FaRegClock, FaUser, FaClock } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import axios from "./../../axios/axios";
const RatingComponent = ({ clientId }) => {
  const [service, setService] = useState([]);
  const [servicesWithRatings, setServicesWithRatings] = useState([]);
  const [sellerComment, setSellerComment] = useState({});
  const [commentSeller, setCommentSeller] = useState({});
  const { user, setUser } = useAuth();
  // useEffect(() => {
  //   const fetchRetingUser = async () => {
  //     const response =  axios.get(`/rating/${user.id}`);
  //     const data = response.data;
  //     console.log(response.data);
  //     setService(data);
  //   };
  //   fetchRetingUser();
  // },[]);
  useEffect(() => {
    const fetchUSerRating = async () => {
      const response = axios.get(`/rating/${user.id}`);
      const data = (await response).data.ratings;
      console.log(data);
      setService(data);
    };
    fetchUSerRating();
  }, []);

  // useEffect(() => {
  //   const filteredServices = service.filter((service) => service.ratings && service.ratings.length > 0);
  //   setServicesWithRatings(filteredServices);
  //   console.log(servicesWithRatings);
  // }, [service]);

  const handleCommentChange = (e, ratingId) => {
    setSellerComment({ ...sellerComment, [ratingId]: e.target.value });
  };

  const handleCommentSubmit = async (e, ratingId) => {
    console.log(ratingId);
    e.preventDefault();
    try {
      const response = await axios.post(`/comments`, {
        comment: sellerComment[ratingId],
      });
      alert("Comment added successfully");
      setSellerComment({ ...sellerComment, [ratingId]: "" });
      setCommentSeller(response.data.Comment);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const formatDateTime = (dateTime) => {
    return moment(dateTime).locale("ar").fromNow();
  };

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="star-rating text-3xl">
        {[...Array(fullStars)].map((_, index) => (
          <span key={index} className="star text-yellow-300">
            &#9733;
          </span>
        ))}
        {hasHalfStar && <span className="star text-white">&#9733;</span>}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
          <span key={index} className="star text-gray-300">
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 flex flex-col">
      <div className="flex justify-between bg-white border-b-2">
        <p className="text-gray-700 font-bold p-2">تقييم الخدمة</p>
        <p className="text-gray-700 font-bold p-2">عرض جميع تقييمات الخدمة</p>
      </div>
      <div className="flex flex-col shadow-sm">
        {
          // servicesWithRatings.map((service) =>
          service.map((rating) => (
            <div key={rating.id} className="bg-white mb-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <p className="bg-[#221d1d] text-white px-2 py-1 ml-2">
                  تم تسليم
                </p>
                <div className="font-medium text-gray-700 pt-2 pb-2">
                  {/* <p className="">{service.title}</p> */}
                  <p className="inline text-[15px] ml-4 text-gray-500">
                    <FaBriefcase className="inline text-center text-green-500 ml-2" />
                    التصميم الجرافيكي
                  </p>
                  <p className="inline text-[15px]">
                    <FaRegClock className="inline ml-2" />{" "}
                    {formatDateTime(service.created_at)}
                  </p>
                </div>
              </div>
              <div className="border-b-2">
                <div className="flex justify-between p-2 border-b">
                  <p className="text-lg">الجودة :</p>
                  <StarRating rating={rating.quality_score} />
                </div>
                <div className="flex justify-between p-2 border-b">
                  <p>التسليم</p>
                  <StarRating rating={rating.deadline_adherence_score} />
                </div>
                <div className="flex justify-between p-2 border-b">
                  <p>التواصل</p>
                  <StarRating rating={rating.communication_score} />
                </div>
                <div className="flex justify-between p-2">
                  <p>سرعة التنفيذ</p>
                  <StarRating rating={rating.delivery_speed_score} />
                </div>
              </div>
              <div className="">
                <div className="flex mt-2 p-3">
                  <div className="">
                    <img
                      className="w-10 h-10 me-4 rounded-full"
                      src={`http://127.0.0.1:8000/` + rating.user.image}
                      alt={rating.user.firstName}
                    />
                  </div>
                  <div className="font-medium text-gray-800">
                    <p className="">
                      {rating.user.firstName} {rating.user.lastName}
                    </p>
                    <p className="inline text-sm text-gray-500">
                      <FaUser className="inline" />{" "}
                      {rating.user.user_type === "client" ? "عميل" : "مستقل"}
                    </p>
                    <p className="inline">
                      <FaClock className="inline mr-5" />{" "}
                      {formatDateTime(rating.created_at)}
                    </p>
                  </div>
                </div>
                <div className="m-auto w-[90%] mb-2 p-2 bg-gray-100 rounded-lg shadow-sm">
                  <p className="text-gray-700 ">{rating.comment}</p>
                </div>
                <div className="flex bg-white pr-4">
                  {/* <div> */}
                    {rating.feedback &&
                      rating.feedback.map((reply) => (
                        <div> 
                         <div
                          key={reply.id}
                          className=" mb-2 w-full mr-2 rounded-lg shadow-sm"
                        >
                          <div className="flex ">
                            <div>
                              {/* <p className="text-gray-700 text-md">
                                <FaUser className="inline" />{" "}
                                {reply.contract.freelancer.user_type ==
                                  "freelancer" && "منفذ الخدمة"}
                                  </p> */}
                                <div className="flex ">
                                  <div className="">
                                    <img
                                      className="w-10 h-10 me-4 rounded-full"
                                      src={
                                        `http://127.0.0.1:8000/` +
                                        reply.contract.freelancer.image
                                      }
                                      alt={reply.contract.freelancer.firstName}
                                    />
                                  </div>
                                  <div className="font-medium text-gray-800">
                                    <p className="">
                                      {reply.contract.freelancer.firstName}{" "}
                                      {reply.contract.freelancer.lastName}
                                    </p>
                                    <p className="inline text-sm text-gray-500">
                                      <FaUser className="inline" />{" "}
                                      {reply.contract.freelancer.user_type ===
                                      "client"
                                        ? "عميل"
                                        : "مستقل"}
                                    </p>
                                    <p className="inline">
                                      <FaClock className="inline mr-5" />{" "}
                                      {formatDateTime(
                                        reply.contract.freelancer.created_at
                                      )}
                                    </p>
                                  </div>
                                </div>
                              
                            </div>
                            
                          </div>
            
                          
                         
                        </div>
                        <div className="m-auto mt-2 w-full mb-2 p-2 bg-gray-100 rounded-lg shadow-sm">
                  <p className="text-gray-700 ">{reply.comment}</p>
                </div>
                        </div>
                      
                        
                        
                      ))}
                  {/* </div> */}
                </div>
              </div>
              {/* <div className="bg-white rounded-sm p-2">
                <h2 className="text-md font-bold mb-2">ارسل رد</h2>
                <form onSubmit={(e) => handleCommentSubmit(e, rating.id)} className="space-y-4">
                  <textarea
                    value={sellerComment[rating]}
                    onChange={(e) => handleCommentChange(e, rating.id)}
                    placeholder="اكتب ردك هنا"
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <button type="submit" className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700">
                    إرسال
                  </button>
                </form>
              </div> */}
            </div>
            // )
          ))
        }
      </div>
    </div>
  );
};

export default RatingComponent;
