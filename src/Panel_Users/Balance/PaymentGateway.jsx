import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { FaPaypal } from "react-icons/fa";
import { ReactDOMServer } from "react-dom/server";

const PaymentGateway = () => {
  const location = useLocation();
  const [balance, setBalance] = useState("");
  const [createChatService, setCreateChatService] = useState([]);
  const { serviceId, price, buyerID ,sellerID } = location.state;
  const { projectID,bidID, projectPrice,type, client ,freelancerID } = location.state;
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentData, setPaymentData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const handleGetBalance = async () => {
      const response = await axios.get("/balance");
      const data = response.data;
      setBalance(data);
     
      console.log(data);
    };
    handleGetBalance();
  }, []);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePayment = async () => {
    if (paymentMethod === "alkuraimi" &&(!paymentData.accountNumber || !paymentData.accountName) ) {
      setError("فضلا ادخل كل التفاصيل المطلوبة لاجراء عمليه الدفع.");
      return;
    }

    if (paymentMethod === "paypal" && !paymentData.email) {
      setError("فضلا ادخل كل التفاصيل المطلوبة لاجراء عمليه الدفع.");
      return;
    }

    try {
      const response = await axios.post("/payment/process", {
        service_id: serviceId || null,
        projectID:projectID || null,
        user_id: buyerID || client,
        payment_method: paymentMethod,
        amount: price || projectPrice,
        bidID:bidID,
        type:type,
        freelancerID:freelancerID,
      });
      console.log(response.data.chat.conversable_type)
      console.log(response.data.success)
      if (response.data.success) {
      
        console.log(response.data.chat.conversable_type)
       
        setCreateChatService(response.data);
        if(response.data.chat.conversable_type=="App\\Models\\AcceptedBid")
        {
          navigate('/accept-bid/', { state: {projectID, $chat:response.data.chat} });

        }
        else {
                      navigate(`/chat-service/${response.data.contract.id}`,{state:{chat:response.data.chat}});

        }
      } else {
        setError(response.data.message || "فشل اجراء عمليه الدفع.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("An error occurred processing your payment.");
    }
  };
  return (
    <div className="p-6">
      <div className=" container mx-auto text-center text-md  bg-gray-100 p-2">
        {error && <div className="text-red-500">{error}</div>}
      </div>


      <div
        id="crypto-modal"
        className="  flex flex-wrap justify-center items-center  "
      >
        <div className=" p-2 w-full max-w-3xl  ">
          <div className=" bg-white rounded-lg shadow ">
            <div className="p-2 md:p-3 border-b rounded-t ">
              <h3 className="text-md font-semibold text-gray-900">طرق الدفع</h3>
            </div>

            <div className="p-2 md:p-3">
              <p className="text-md font-normal text-gray-500">
                يمكنك من اختيار احد طرق الدفع المتاحة لك.
              </p>
              <ul className="my-2 flex justify-between">
               
                <li>
                  <button
                    onClick={() => handlePaymentMethodChange("platform")}
                    className={` ${
                      paymentMethod === "platform"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    } flex items-center p-3 text-base font-bold text-gray-900 rounded-lg  hover:bg-gray-100 group hover:shadow  `}
                  >
                    <FaPaypal color="blue" size={25} />

                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {" "}
                      الدفع عبر حسابك في - المنصة
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePaymentMethodChange("alkuraimi")}
                    className={` ${
                      paymentMethod === "alkuraimi"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    } flex items-center p-3 text-base font-bold text-gray-900 rounded-lg ] hover:bg-gray-100 group hover:shadow  `}
                  >
                    <FaPaypal color="blue" size={25} />

                    <span className="flex-1 ms-3 whitespace-nowrap">
                      خدمة الكريمي - حاسب
                    </span>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => handlePaymentMethodChange("paypal")}
                    className={` ${
                      paymentMethod === "paypal"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                    } flex items-center p-3 text-base font-bold text-gray-900 rounded-lg  hover:bg-gray-100 group hover:shadow  `}
                  >
                    <FaPaypal color="blue" size={25} />
                    {/* <svg aria-hidden="true" svg className="h-5"viewBox="0 0 75.591 75.591" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="a" gradientTransform="matrix(0 -54.944 -54.944 0 23.62 79.474)" gradientUnits="userSpaceOnUse" x2="1"><stop offset="0" stop-color="#ff1b2d"/><stop offset=".3" stop-color="#ff1b2d"/><stop offset=".614" stop-color="#ff1b2d"/><stop offset="1" stop-color="#a70014"/></linearGradient><linearGradient id="b" gradientTransform="matrix(0 -48.595 -48.595 0 37.854 76.235)" gradientUnits="userSpaceOnUse" x2="1"><stop offset="0" stop-color="#9c0000"/><stop offset=".7" stop-color="#ff4b4b"/><stop offset="1" stop-color="#ff4b4b"/></linearGradient><g transform="matrix(1.3333 0 0 -1.3333 0 107.2)"><path d="m28.346 80.398c-15.655 0-28.346-12.691-28.346-28.346 0-15.202 11.968-27.609 26.996-28.313.44848-.02115.89766-.03314 1.3504-.03314 7.2574 0 13.876 2.7289 18.891 7.2137-3.3227-2.2036-7.2074-3.4715-11.359-3.4715-6.7504 0-12.796 3.3488-16.862 8.6297-3.1344 3.6999-5.1645 9.1691-5.3028 15.307v1.3349c.13821 6.1377 2.1683 11.608 5.302 15.307 4.0666 5.2809 10.112 8.6297 16.862 8.6297 4.1526 0 8.038-1.2679 11.361-3.4729-4.9904 4.4643-11.569 7.1876-18.786 7.2144-.03596 0-.07122.0014-.10718.0014z" fill="url(#a)"/><path d="m19.016 68.025c2.6013 3.0709 5.9607 4.9227 9.631 4.9227 8.2524 0 14.941-9.356 14.941-20.897s-6.6891-20.897-14.941-20.897c-3.6703 0-7.0297 1.851-9.6303 4.922 4.0659-5.2809 10.111-8.6297 16.862-8.6297 4.1519 0 8.0366 1.2679 11.359 3.4715 5.802 5.1906 9.4554 12.735 9.4554 21.133 0 8.397-3.6527 15.941-9.4533 21.131-3.3234 2.205-7.2088 3.4729-11.361 3.4729-6.7504 0-12.796-3.3488-16.862-8.6297" fill="url(#b)"/></g></svg> */}
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      محفظة Strip{" "}
                    </span>
                  </button>
                </li>
              </ul>
              <div>
                <a
                  href="#"
                  className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                >
                  <svg
                    className="w-3 h-3 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  ادفع قيمة الخدمات بشكل أمن.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* {console.log(balance)} */}
        {paymentMethod === "platform" && (
          <div className=" container mx-auto">
            <div className="flex gap-2 mt-1 mb-2">
              <p className="bg-green-500 hover:bg-green-800  w-1/3  text-white rounded-md p-3">
                رصيدك الحالي: {balance.total_earnings}$
              </p>
              <p className="bg-blue-500 hover:bg-blue-800 w-1/3  text-white rounded-md p-3">
                سعر المطلوب لدفع : {price || projectPrice}$
              </p>
            </div>

            {balance.total_earnings >= (price || projectPrice) ? (
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handlePayment}
              >
                ادفع الآن
              </button>
            ) : (
              <p>لا يوجد رصيد كافٍ</p>
            )}
          </div>
        )}
        {paymentMethod === "alkuraimi" && (
          <div>
            <p>
              خدمة الكترونية يقدمها مصرف الكريمي وعبر حاسب سيتمكن العملاء من
              الدفع عبر تطبيق . إدفع مقابل الخدمة
              بإستخدام خدمة حاسب في تطبيق الكريمي جوال إلى حسابنا رقم
              3004408852.
               وقم بتزويدنا بتفاصيل العملية عن طريق ملء الحقول ببيانات
              دقيقة أثناء عملية تأكيد الطلب.
            </p>
            <input
              type="text"
              placeholder="رقم الحساب"
              className="border p-2 mb-2 w-full"
              onChange={(e) =>
                setPaymentData({
                  ...paymentData,
                  accountNumber: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="اسم الحساب"
              className="border p-2 mb-2 w-full"
              onChange={(e) =>
                setPaymentData({ ...paymentData, accountName: e.target.value })
              }
            />
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={handlePayment}
            >
              ادفع الآن
            </button>
          </div>
        )}
        {paymentMethod === "paypal" && (
          <div>
            <input
              type="text"
              placeholder="البريد الإلكتروني"
              className="border p-2 mb-2 w-full"
              onChange={(e) =>
                setPaymentData({ ...paymentData, email: e.target.value })
              }
            />
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={handlePayment}
            >
              ادفع الآن
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentGateway;