import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../axios/axios";
import AccountFeed from "./AccountFeed";
import Withdrawal from "./Withdrawal";
import { Pagecach } from "./Type_wallet";
import moment from "moment";
import "moment/locale/ar";

function Balance() {
  const [transactions, setTransactions] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [errors, setErrors] = useState([]);

  const [Withdraw, setWithdraw] = useState(false);
  const [userBalance, setUserBalance] = useState([]);

  const [Alcrimi, setAlcrimi] = useState(false);
  const [cach, setcach] = useState(false);

  const [selectedRechargeBalance, setelectedRechargeBalance] = useState(false);
  function handelRechargeBalance() {
    setAlcrimi(false);
    setcach(false);
    setWithdraw(false);
    setelectedRechargeBalance(!selectedRechargeBalance);
  }
  function AlcrimiHandle() {
    setcach(false);
    setelectedRechargeBalance(false);
    setWithdraw(false);
    setAlcrimi(!Alcrimi);
  }
  function cachHandle() {
    setelectedRechargeBalance(false);

    setAlcrimi(false);
    setWithdraw(false);

    setcach(!cach);
  }
  function handelWithdraw() {
    setelectedRechargeBalance(false);

    setcach(false);
    setAlcrimi(false);
    setWithdraw(!Withdraw);
  }
  useEffect(() => {
    const fetchBalance = async () => {
      const response = await axios.get(`/balance`);
      const data = response.data;
      setUserBalance(data);
      console.log("userBalance:", data);
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/transactions");
        // let balance = 0;
        // response.data.forEach(transaction => {
        //   if (transaction.status === 'completed') {
        //     balance += transaction.amount;
        //   }
        // });
        setTransactions(response.data);
        // setCurrentBalance(balance);
        // setTransactions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setErrors(["Error fetching transactions."]);
      }
    };

    fetchTransactions();
  }, []);
  const getStatusClass = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-blue-600";
      case "failed":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };
  const formatDateTime = (dateTime) => {
    return moment(dateTime).locale("ar").fromNow();
  };
  return (
    <>
      <div className="">
        {/* <p className="text-xl font-bold border-r-amber-500 border-r-4 border-2 border-white shadow-sm m-2 p-2">
            <FaMoneyBill size={25} className="inline ml-1" />
            الرصيد
          </p> */}
        <button
          type="button"
          className="text-gray-900 md:w-1/4 w-full border-emerald-300 border-b-2 hover:bg-green-200  font-medium text-lg px-10 py-2.5 sm:mb-2 mb-6 text-center inline-flex items-center  me-2 "
        >
          <svg
            className="w-4 h-4 me-2 -ms-1 text-[#626890]"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="ethereum"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
            ></path>
          </svg>
          الرصيد
        </button>
        <div className="flex justify-center md:justify-end text-center">
          {/* <button onClick={handelRechargeBalance}>
              <div className="px-6 py-3   bg-amber-500 rounded-md shadow-sm border-2 m-2 ">
              
              </div>
            </button> */}
          <button
            type="button"
            onClick={handelRechargeBalance}
            className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2"
          >
            <svg
              className="w-4 h-4 me-2 -ms-1 text-[#626890]"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="ethereum"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
              ></path>
            </svg>
            شحن رصيد
            {/* <AccountFeed /> */}
            {/* <NavLink >شحن رصيد</NavLink> */}
          </button>

          <button
            type="button"
            onClick={handelWithdraw}
            className="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
          >
            <svg
              className="w-4 h-4 me-2 -ms-1 text-[#626890]"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="ethereum"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
              ></path>
            </svg>
            {/* <Withdrawal/> */}
            سحب رصيد
          </button>
        </div>
        <div className="flex justify-center items-center m-2">
          <button
            onClick={AlcrimiHandle}
            type="button"
            className="text-gray-900 bg-white hover:bg-gray-100 border bg-purple-600 border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 me-2 -ms-1"
              viewBox="0 0 80 80"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <linearGradient
                id="a"
                gradientTransform="matrix(0 -54.944 -54.944 0 23.62 79.474)"
                gradientUnits="userSpaceOnUse"
                x2="1"
              >
                <stop offset="0" stop-color="#ff1b2d" />
                <stop offset=".3" stop-color="#ff1b2d" />
                <stop offset=".614" stop-color="#ff1b2d" />
                <stop offset="1" stop-color="#a70014" />
              </linearGradient>
              <linearGradient
                id="b"
                gradientTransform="matrix(0 -48.595 -48.595 0 37.854 76.235)"
                gradientUnits="userSpaceOnUse"
                x2="1"
              >
                <rect
                  width="80"
                  height="80"
                  fill="white"
                  transform="translate(0.519043 0.132812)"
                />{" "}
                <stop offset="0" stop-color="#9c0000" />
                <stop offset=".7" stop-color="#ff4b4b" />
                <stop offset="1" stop-color="#ff4b4b" />
              </linearGradient>
              <g transform="matrix(1.3333 0 0 -1.3333 0 107.2)">
                <path
                  d="m28.346 80.398c-15.655 0-28.346-12.691-28.346-28.346 0-15.202 11.968-27.609 26.996-28.313.44848-.02115.89766-.03314 1.3504-.03314 7.2574 0 13.876 2.7289 18.891 7.2137-3.3227-2.2036-7.2074-3.4715-11.359-3.4715-6.7504 0-12.796 3.3488-16.862 8.6297-3.1344 3.6999-5.1645 9.1691-5.3028 15.307v1.3349c.13821 6.1377 2.1683 11.608 5.302 15.307 4.0666 5.2809 10.112 8.6297 16.862 8.6297 4.1526 0 8.038-1.2679 11.361-3.4729-4.9904 4.4643-11.569 7.1876-18.786 7.2144-.03596 0-.07122.0014-.10718.0014z"
                  fill="url(#a)"
                />
                <path
                  d="m19.016 68.025c2.6013 3.0709 5.9607 4.9227 9.631 4.9227 8.2524 0 14.941-9.356 14.941-20.897s-6.6891-20.897-14.941-20.897c-3.6703 0-7.0297 1.851-9.6303 4.922 4.0659-5.2809 10.111-8.6297 16.862-8.6297 4.1519 0 8.0366 1.2679 11.359 3.4715 5.802 5.1906 9.4554 12.735 9.4554 21.133 0 8.397-3.6527 15.941-9.4533 21.131-3.3234 2.205-7.2088 3.4729-11.361 3.4729-6.7504 0-12.796-3.3488-16.862-8.6297"
                  fill="url(#b)"
                />
              </g>
            </svg>
            عبر نقطة حاسب - الكريمي
          </button>
          <button
            type="button"
            onClick={cachHandle}
            className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
          >
            <svg
              className="w-4 h-4 me-2 -ms-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="bitcoin"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M504 256c0 136.1-111 248-248 248S8 392.1 8 256 119 8 256 8s248 111 248 248zm-141.7-35.33c4.937-32.1-20.19-50.74-54.55-62.57l11.15-44.7-27.21-6.781-10.85 43.52c-7.154-1.783-14.5-3.464-21.8-5.13l10.93-43.81-27.2-6.781-11.15 44.69c-5.922-1.349-11.73-2.682-17.38-4.084l.031-.14-37.53-9.37-7.239 29.06s20.19 4.627 19.76 4.913c11.02 2.751 13.01 10.04 12.68 15.82l-12.7 50.92c.76 .194 1.744 .473 2.829 .907-.907-.225-1.876-.473-2.876-.713l-17.8 71.34c-1.349 3.348-4.767 8.37-12.47 6.464 .271 .395-19.78-4.937-19.78-4.937l-13.51 31.15 35.41 8.827c6.588 1.651 13.05 3.379 19.4 5.006l-11.26 45.21 27.18 6.781 11.15-44.73a1038 1038 0 0 0 21.69 5.627l-11.11 44.52 27.21 6.781 11.26-45.13c46.4 8.781 81.3 5.239 95.99-36.73 11.84-33.79-.589-53.28-25-65.99 17.78-4.098 31.17-15.79 34.75-39.95zm-62.18 87.18c-8.41 33.79-65.31 15.52-83.75 10.94l14.94-59.9c18.45 4.603 77.6 13.72 68.81 48.96zm8.417-87.67c-7.673 30.74-55.03 15.12-70.39 11.29l13.55-54.33c15.36 3.828 64.84 10.97 56.85 43.03z"
              ></path>
            </svg>
            عبر محفظة كاش
          </button>
          <button
            type="button"
            className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
          >
            <svg
              className="w-4 h-4 me-2 -ms-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="paypal"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path
                fill="currentColor"
                d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
              ></path>
            </svg>
            عبر موبايل موني
          </button>
        </div>
        {Alcrimi ? (
          <>
            <AccountFeed />
          </>
        ) : (
          <></>
        )}
        {cach ? (
          <>
            <Pagecach />
          </>
        ) : (
          <></>
        )}
        {Withdraw ? (
          <>
            <Withdrawal />
          </>
        ) : (
          <></>
        )}
        {selectedRechargeBalance ? (
          <>
            <AccountFeed />
          </>
        ) : (
          <></>
        )}

        <div className="flex flex-row flex-wrap gap-2  justify-around text-center  ">
          <div className="flex-1 p-4  border-r-[#2557D6] border-r-4 border-2 rounded-md">
            <p>مجموع الارباح</p>
            <p>{userBalance.total_balance}</p>
          </div>
          <div className="flex-1 p-4  bg-white  rounded-md border-r-[#2557D6] border-r-4 border-2">
            <p>إجمالي الرصيد </p>
            <p>{userBalance.withdrawable_balance}</p>
          </div>
          <div className="flex-1 p-4  bg-white border-r-[#2557D6] border-r-4 border-2 rounded-md">
            <p> الرصيد القابل للسحب</p>
            <p>{userBalance.total_earnings}</p>
          </div>
          <div className="flex-1 p-4  bg-white border-r-[#2557D6] border-r-4  border-2 rounded-md">
            <p> الرصيد المعلق </p>
            <p>{userBalance.pending_balance}</p>
          </div>
        </div>
        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-800 ">
            <thead className="bg-gray-200 text-gray-700">
              <tr className="uppercase text-xs">
                <th className="py-3 px-6 w-1/4 text-left">التفاصيل</th>
                <th className="py-3 px-6 w-1/4 text-left">القيمة</th>
                <th className="py-3 px-6 w-1/4 text-left">مجموع الرصيد</th>
                <th className="py-3 px-6 w-1/4 text-left">نوع العمليه</th>

                <th className="py-3 px-6 w-1/4 text-left">الحالة</th>
                <th className="py-3 px-6 w-1/4 text-left">التاريخ</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {transactions.map((transaction) => {
                // let updatedBalance = currentBalance;
                // if (transaction.status === 'completed') {
                //   updatedBalance = userBalance.total_balance + transaction.amount;
                // }
                return (
                  <tr
                    key={transaction.id}
                    className="transition-all hover:bg-gray-100 border-b border-gray-300"
                  >
                    <td className="py-4 px-6">{transaction.details}</td>
                    <td className="py-4 px-6">${transaction.amount}</td>
                    <td className="py-4 px-6">${userBalance.total_balance}</td>
                    <td className="py-4 px-6">{transaction.type}</td>
                    <td
                      className={`py-4 px-6 ${getStatusClass(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </td>
                    <td className="py-4 px-6">
                      {formatDateTime(transaction.created_at)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Balance;
