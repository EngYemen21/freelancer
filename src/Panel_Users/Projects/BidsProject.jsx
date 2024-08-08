import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios/axios";
import moment from "moment";
import "moment/locale/ar";
import { useAuth } from "../../contexts/AuthContext";
export default function BidsProject(projectUserID) {
    const navigate=useNavigate()
    const { user, setUser } = useAuth();  

  const { id } = useParams();
  const [commission, setCommission] = useState(0);
  const [bids, setBids] = useState([]);
  const [AcceptBids, setAcceptBids] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "amount") {
      calculateCommission(value);
    }
  };

  const calculateCommission = (amount) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      setCommission(0);
    } else if (numericAmount < 100000) {
      const Comisso = numericAmount * 0.1;
      setCommission(numericAmount - Comisso);
    } else {
      const Comisso = numericAmount * 0.05;
      setCommission(numericAmount - Comisso);
    }
  };
  useEffect(() => {
    moment.locale("ar");
    const fetchBid = async () => {
      const response = await axios.get(`bid/${id}`);
      const data = response.data;
      setBids(data);
     
    };
    fetchBid();
  },[]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/projects/${id}/bids`, formData);
      alert("تم تقديم العرض بنجاح!");
    } catch (error) {
      console.error("حدث خطأ أثناء تقديم العرض:", error);
      alert("حدث خطأ أثناء تقديم العرض. حاول مرة أخرى.");
    }
  };
  const hendlLogin=(e)=>{
    e.preventDefault();

    navigate('/Login',{replace:true});
  }


  const hendleAcceptedBid  = async (e ,bidID ,freelancerID ,projectID,amount) => {
    e.preventDefault();
    try {
      navigate('/payment-gateway/', { state: {bidID:bidID, projectID:projectID ,freelancerID:freelancerID, projectPrice:amount, client:user.id ,type:'project'} });
      
 
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <>
    
      <div className="text-right font-arabic  mx-4 border-b-2 mb-10 ">
        {user ?(<>    { user.id != projectUserID.projectUserID &&(
          <> 
           <div>
          <p className="p-2 text-xl border-t-2  text-right">اضف العرض</p>
        </div>

        <form action="" method="post">
          <div className="">
            <label htmlFor="" className="block p-2 ">
              مدة التسليم (الايام)
            </label>
            <input
              type="number"
              name="duration_in_days"
              placeholder="مدة التسليم بالايام"
              id=""
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div>
            <label htmlFor="" className="block  p-2">
              قيمة العرض{" "}
            </label>
            <input
              type="number"
              name="amount"
              placeholder="  ادخل قيمة العرض المناسب "
              id=""
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <p className="text-sm m-2 text-gray-500">
              المستحقاتك بعد خصم العمولة :{" "}
              <span>${commission.toFixed(2)} </span>
            </p>
          </div>
          <div>
            <label htmlFor="" className="block  p-2">
              تفاصيل العرض{" "}
            </label>
            <textarea
              name="description"
              id=""
              className="w-full h-52 text-right"
              onChange={handleChange}
            ></textarea>
          </div>
          <input
            type="submit"
            value="إرسال العرض"
            onClick={handleSubmit}
            className="border-2 w-full p-2 font-arabic mt-2 mb-2 bg-emerald-500 px-6 rounded-md text-white  hover:bg-emerald-300 text-center"
          />
        </form>
          </>
        )

        }</>):(<p className="bg-gray-100 font-arabic  p-4 m-4">   يرجى  انشاء حساب على منصة لكي  تستطيع تقديم العرض على المشروع  <button onClick={hendlLogin}> <span className="border-1 bg-green-500 px-4 py-2 rounded-md  text-white  w-fit m-2 mt-4 flex place-items-center ">انشاء حساب </span></button>
       </p>)}
    
      
      </div>

      {bids.map((bid) => (
        <>
          <div
            key={bid.id}
            className="flex flex-row gap-1   md:justify-between  "
          >
            <div className="flex  gap-2">
              <img
                src={"http://127.0.0.1:8000/" + bid.freelancer.image}
                alt=""
                className="w-10 h-10 rounded-full  "
              />
             
              <div className="flex flex-col items-stretch  font-arabic text-right">
                <div className="flex gap-4 items-center">
                <p className="text-lg pb-1">  <NavLink to={`/user-profile/${bid.freelancer.id}`}>{bid.freelancer.firstName}</NavLink> </p>
                     <div className="flex flex-row  text-gray-200 text-xl mt-2 justify-end h-full">
                        
                <FaStar className="" /> <FaStar /> <FaStar /> <FaStar />
              </div>
         
                </div>
             

                <p className="text-sm font-arabic">
                  {bid.freelancer.Specialization}|
                  <span className="text-sm ">
                    {" "}
                    {moment(bid.created_at).fromNow()}{" "}
                  </span>
                </p>
              </div>
            </div>

          </div>
          <p className="text-md m-2 text-right font-arabic border-b-2 pb-2">
            {bid.bid_description}
          </p>
          {/* {console.log( bid.project.user_id )} */}
          {
            bid.project.user_id === user.id &&(
              <>
                 <div className="flex gap-4 m-2 ">
            <button
              onClick={(e) => hendleAcceptedBid(e, bid.id, bid.freelancer_id, bid.project.id ,bid.bid_amount)}

           
            className="">
            <div className="border-2 p-2 text-sm   font-arabic bg-red-500  hover:bg-emerald-300 px-4 rounded-md text-white h-fit  py-2 text-left">
             قبول العرض
            </div>
            </button>
            <button>
            <div className="border-2 p-3  text-sm font-arabic bg-emerald-500  hover:bg-emerald-300 px-4 rounded-md text-white h-fit  py-2 text-left">
              <NavLink to={`/user-profile/${bid.freelancer.id}`}>تواصل مع المشتقل</NavLink>
            </div>
            </button>
          </div>
              </>
            )
          }
       
        </>
      ))}
    </>
  );
}




