import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Pages/Nav";
import ImageUSer from "../assets/person.webp";
import ChangePassword from "../components/auth/Change_password";
import moment from "moment";
import "moment/locale/ar";

import Datepicker from "flowbite-datepicker/Datepicker";

// import Datepicker  from 'flowbite';

import {
  FaBriefcase,
  FaCartPlus,
  FaFileAlt,
  FaFileContract,
  FaHome,
  FaMoneyBill,
  FaShoppingCart,
  FaStar,
  FaTags,
  FaTasks,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Withdraw } from "./withdraw";
// import axios from "../axios/axios";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import EditService from "./EditeService";
import axios from "../axios/axios";
import Rating from "./Ratings/Rating";
import TimeRemainingOfServices from "./TimeRemainingOfServices/TimeRemainingOfServices";
import Balance from "./Balance/Balanc";
import Verification from "../Pages/Dashboard/Verification";

export default function Dashboard_user() {
  const { user, setUser } = useAuth();
  const  navigate = useNavigate();
  const [u, setU] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {

        const response = await fetch(
          `http://127.0.0.1:8000/api/users/${user.id}`
        );
        const data = await response.json();
        setU(data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUser();
  }, []);



  
  const [balance, setBalance] = useState(false);

  const [works, setWork] = useState(false);
  const [service, setService] = useState(false);
  const [project, setProjecte] = useState(false);
  const [rating, setRating] = useState(false);
  const [account, setAccount] = useState(false);
  const [contarct, setContract] = useState(false);
  const [buy, setBuy] = useState(false);

  const [home, setHome] = useState(false);
  const [verification, setverification] = useState(false);

  const [fileNameFront, setFileNameFront] = useState("");
  const [fileNameBack, setFileNameBack] = useState("");

  const handleFileFront = (event) => {
    const file = event.target.files[0];
    setFileNameFront(URL.createObjectURL(file));
  };

  const handleFileBack = (event) => {
    const file = event.target.files[0];
    setFileNameBack(URL.createObjectURL(file));
  };

  function accountHandle() {
    setService(false);
    setverification(false);
    setBuy(false);
    setProjecte(false);
    setWork(false);
    setHome(false);
    setBalance(false);
    setAccount(!account);
    setContract(false);
  }

  function RatingeHandle() {
    setService(false);
    setverification(false);
    setBuy(false);
    setProjecte(false);
    setWork(false);
    setHome(false);
    setBalance(false);
    setAccount(false);
    setContract(false);
    setRating(!rating);
  }
  function ContractHandle() {
    setService(false);
    setverification(false);
    setBuy(false);
    setProjecte(false);
    setWork(false);
    setHome(false);
    setBalance(false);
    setAccount(false);
    setRating(false);
    setContract(!contarct);
  }

  function homeHandle() {
    setService(true);
    setBuy(true);
    setProjecte(true);
    setWork(true);
    setverification(true);
    setBalance(true);
    setAccount(true);

    setHome(true);
    setRating(true);
  }

  function BalanceHandle() {
    setService(false);
    setverification(false);
    setAccount(false);
    setBuy(false);
    setProjecte(false);
    setWork(false);
    setHome(false);
    setRating(false);
    setContract(false);
    setBalance(!balance);
  }

  function buyHandle() {
    setService(false);
    setProjecte(false);
    setAccount(false);
    setContract(false);
    setHome(false);
    setBalance(false);
    setverification(false);
    setRating(false);
    setWork(false);
    setBuy(!buy);
  }
  function projectHandle() {
    setAccount(false);
    setContract(false);
    setService(false);
    setBalance(false);
    setverification(false);
    setRating(false);
    setHome(false);
    setBuy(false);
    setWork(false);
    setProjecte(!project);
  }
  function ServiceHandle() {
    setAccount(false);
    setRating(false);
    setContract(false);
    setProjecte(false);
    setBalance(false);
    setverification(false);

    setHome(false);
    setBuy(false);
    setWork(false);
    setService(!service);
  }
  function WorksHandle() {
    setAccount(false);
    setRating(false);
    setContract(false);
    setService(false);
    setProjecte(false);
    setBalance(false);
    setverification(false);

    setHome(false);
    setBuy(false);
    setWork(!works);
  }
  function verificationHandle() {
    setAccount(false);
    setRating(false);
    setService(false);
    setProjecte(false);
    setContract(false);
    setBalance(false);

    setHome(false);
    setBuy(false);
    setverification(!verification);
  }
  const formatDateTime = (dateTime) => {
    return moment(dateTime).locale("ar").fromNow();
  };
  const TimeRemaining = ({ startDate, endDate }) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const duration = moment.duration(end.diff(start));

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return (
      <div>
        <p>
          {days} أيام، {hours} ساعات، {minutes} دقائق، {seconds} ثواني
        </p>
      </div>
    );
  };

  function Account() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");

    const [birthdate, setBirthdate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [ChangePasword, sethandleChangePassword] = useState(false);
    const [Information, sethandleInformation] = useState(true);
    const [InformationWork, setInformationWork] = useState(false);

    const [editUser, setEditUser] = useState(false);

    const [ChangePasswordColorButton, setChangePasswordColorButton] =
      useState(false);
    useEffect(
      (e) => {
        editInformationHandel(e);
      },
      [1]
    );

    const handleEditUser = async (e) => {
      const { firstName, lastName, email, city, gender, phone, date } =
        e.target.elements;
      const body = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone_number: phone.value,
        city: city.value,
        gender: gender.value,
        date_of_birth: date.value,
      };
      try {
        await axios.post(`/users/${user.id}`, body);
        toast.success("تم تحديث بياناتك بنجاح");
      } catch (error) {
        console.error("Error updating user:", error);
      }
    };

    const handleChangePassword = () => {
      sethandleChangePassword(true);
      setChangePasswordColorButton(!ChangePasswordColorButton);
      setInformationWork(false);
      sethandleInformation(false);
    };

    const handleInformation = () => {
      sethandleChangePassword(false);
      setInformationWork(false);
      setFirstName(u.firstName);
      setLastName(u.lastName);
      setEmail(u.email);
      setPhoneNumber(u.phone_number);
      setBirthdate(u.date_of_birth);
      setGender(u.gander);
      setCity(u.city);

      sethandleInformation(true);
    };
    const handleInformationWork = () => {
      sethandleChangePassword(false);
      sethandleInformation(false);

      setInformationWork(true);
    };

    const [errors, setErrors] = useState({
      firstName: "",
      lastName: "",
      Email: "",
      gender: "",
      password: "",
      ConfirmPassword: "",
    });
    const editInformationHandel = () => {
      // console.log('ss')

      setFirstName(u.firstName);
      setLastName(u.lastName);
      setEmail(u.email);
      setPhoneNumber(u.phone_number);
      setBirthdate(u.date_of_birth);
      setGender(u.gander);
      setCity(u.city);
      setEditUser(!editUser);

    
    };

    const handleSubmit = (event) => {
      event.preventDefault();

      // التحقق من الحقول الفارغة
      let formIsValid = true;
      const newErrors = {
        firstName: "",
        lastName: "",
        Email: "",
        gender: "",
        password: "",
        ConfirmPassword: "",
      };

      if (firstName.trim() === "") {
        formIsValid = false;
        newErrors.firstName = "الرجاء إدخال الاسم الأول.";
      }

      if (lastName.trim() === "") {
        formIsValid = false;
        newErrors.lastName = "الرجاء إدخال الاسم الأب.";
      }

      if (Email.trim() === "") {
        formIsValid = false;
        newErrors.Email = "الرجاء إدخال البريد الالكتروني.";
      }

      if (password.trim() === "") {
        formIsValid = false;
        newErrors.password = "الرجاء اختيار كلمة السر.";
      }

      if (ConfirmPassword.trim() === "") {
        formIsValid = false;
        newErrors.ConfirmPassword = " الرجاء اخال كلمة السر لتاكيد";
      }

      setErrors(newErrors);

      // إذا كانت جميع الحقول صالحة، قم بالإجراء اللازم (مثل إرسال البيانات)
      if (formIsValid) {
        console.log("تم تقديم النموذج!");
      }
      handleEditUser(event);
    };

    return (
      <>
        <section className="mb-4   shadow-md ">
          {/* <h1 className="border-2 w-full p-2"></h1> */}
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
            حسابي
          </button>
          <button
            onClick={editInformationHandel}
            type="button"
            className=" focus:bg-red-200  bg-green-500 float-end text-white   focus:ring-gray-100 rounded-lg text-sm px-8 py-2.5 text-center inline-flex items-center me-2 mb-2"
          >
            تعديل
            {/* <svg
                  className="w-4 h-4 ms-2   text-[#626890]"
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
                </svg> */}
          </button>

          <div className="mb-4 border-b-2 border-gray-200 ">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              id="default-tab"
            >
              <li className="me-2" role="presentation">
                <button
                  onClick={handleInformation}
                  className="focus:ring-blue-500 focus:border-blue-500 inline-block p-4 border-b-2 rounded-t-lg"
                  id="profile-tab"
                  data-tabs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  {" "}
                  بيانات المستخدم
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  onClick={handleChangePassword}
                  className="focus:ring-blue-500  focus:border-blue-500 first-line:inline-block p-4 border-b-2 rounded-t-lg "
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                >
                  تغير كلمة المرور
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  onClick={handleInformationWork}
                  className=" focus:ring-blue-500 focus:border-blue-500 inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  id="settings-tab"
                  data-tabs-target="#settings"
                  type="button"
                  role="tab"
                  aria-controls="settings"
                  aria-selected="false"
                >
                  {" "}
                  معلومات العمل
                </button>
              </li>
              {/* <li role="presentation">
                <button
                  className="focus:ring-blue-500 focus:border-blue-500  inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                  id="contacts-tab"
                  data-tabs-target="#contacts"
                  type="button"
                  role="tab"
                  aria-controls="contacts"
                  aria-selected="false"
                >
                  Contacts
                </button>
              </li> */}
            </ul>
          </div>

          {/* <div className="flex flex-row border-b-2 bg-slate-50 justify-start ">
            <button
              className="bg-amber-400 text-black px-4 py-2 rounded "
              onClick={handleInformation}
            >
              بيانات المستخدم
            </button>

            <button
              className={`bg-slate-50 text-black px-4 py-2 rounded ${
                ChangePasword ? " bg-amber-400 text-white" : ""
              }`}
              onClick={handleChangePassword}
            >
              تغير كلمة المرور
            </button>
            <button
              className="bg-slate-50 text-black px-4 py-2 rounded"
              onClick={handleInformationWork}
            >
              معلومات العمل
            </button>
          </div> */}
          {Information ? (
            <>
              {/* <button
                onClick={editInformationHandel}
                type="button"
                className=" focus:bg-red-200  bg-red-500 float-end text-gray-900   focus:ring-gray-100 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
              >
                تعديل
                <svg
                  className="w-4 h-4 ms-2   text-[#626890]"
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
              </button> */}
              {/* <button
                className=" focus:ring-blue-500 focus:bg-blue-500 border-2 py-2 px-6 bg-red-700 text-white float-end m-2 shadow-md rounded-md "
               
              >
              
              </button> */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col container mx-auto  items-center w-[95%] border-r-2 border-blue-500   "
              >
                <div className=" mb-4 ">
                  <img
                    src={"http://localhost:8000/" + u.image}
                    alt="صورة شخصية"
                    className="rounded-full w-24 h-24"
                  />
                </div>
                <div className="mb-4   md:flex md:flex-row  w-full gap-1  md:justify-start">
                  {/* <div className="mb-4   md:w-1/3">
                    <label htmlFor="firstName" className="block mb-2">
                      الاسم الأول
                    </label>
                    <input
                      type="text"
                      readOnly={editUser}
                      name="firstName"
                      id="firstName"
                      className={`w-full border ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      } px-4 py-2 rounded-md`}
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 mt-1">{errors.firstName}</p>
                    )}
                  </div> */}

                  {/* <div className="mb-4 w-full  md:w-full">
                    <label htmlFor="lastName" className="block  mb-2">
                      اسم العائلة
                    </label>
                    <input
                      type="text"
                      readOnly={editUser}
                      name="lastName"
                      id="lastName"
                      className={` w-full border ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      } px-4 py-2 rounded-md`}
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 mt-1">{errors.lastName}</p>
                    )}
                  </div> */}

                  {/* //////////////////////////////////// */}

                  <div className=" w-full md:w-1/2">
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      {" "}
                      الاسم الأول
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-500 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        readOnly={editUser}
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        className={` ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-none rounded-e-lg  border text-gray-900 focus:ring-blue-500 focus:border-blue-700 block flex-1 min-w-0 w-full text-sm border-gray-500 p-2.5 `}
                        placeholder="محمد"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="lastName"
                      className="block mb-2 mt-2 md:mt-0 text-sm font-medium text-gray-900 "
                    >
                      {" "}
                      اسم العائلة
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-500 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                        <svg
                          className="w-4 h-4 text-white "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        readOnly={editUser}
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        className={` ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        } rounded-none rounded-e-lg  border text-gray-900 focus:ring-blue-500 focus:border-blue-700 block flex-1 min-w-0 w-full text-sm border-gray-500 p-2.5 `}
                        placeholder="محمد"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="  w-full md:flex gap-2 justify-between">
                  <div className="w-full">
                    {/* <div className="mb-4  w-full">
                    <label htmlFor="email" className="block  mb-2">
                      البريد الالكتروني
                    </label>
                    <input
                      type="text"
                      readOnly={editUser}
                      name="email"
                      id="email"
                      className={` w-full border ${
                        errors.Email ? "border-red-500" : "border-gray-300"
                      } px-4 py-2 rounded-md`}
                      value={Email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                    {errors.Email && (
                      <p className="text-red-500 mt-1">{errors.Email}</p>
                    )}
                  </div> */}

                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      البريد الالكتروني{" "}
                    </label>
                    <div className="relative mb-6">
                      <div className="absolute px-2 rounded-sm bg-gray-500  inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                          className="w-4 h-4  text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 16"
                        >
                          <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                          <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        readOnly={editUser}
                        value={Email}
                        name="email"
                        id="email"
                        onChange={(event) => setEmail(event.target.value)}
                        className={` border ${
                          errors.Email ? "border-red-500" : "border-gray-300"
                        } px-4 py-2 rounded-md border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full `}
                        placeholder="name@flowbite.com"
                      />
                    </div>
                    {errors.Email && (
                      <p className="text-red-500 text-sm ">{errors.Email}</p>
                    )}
                  </div>
                  <div className="mb-4 w-full ">
                    <label
                      htmlFor="phoneNumber"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      رقم الهاتف
                    </label>
                    {/* <input
                      type="text"
                      readOnly={editUser}
                      name="phone"
                      id="phoneNumber"
                      className={`w-full border ${
                        errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-300"
                      } px-4 py-2 rounded-md`}
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 mt-1">{errors.phoneNumber}</p>
                    )} */}
                    {/* //////////////////////////////////////////////// */}
                    <div className="flex " dir="ltr">
                      <button
                        id="dropdown-phone-button"
                        data-dropdown-toggle="dropdown-phone"
                        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-1 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="20"
                          viewBox="0 0 32 32"
                        >
                          <path fill="#fff" d="M1 11H31V21H1z"></path>
                          <path
                            d="M5,4H27c2.208,0,4,1.792,4,4v4H1V8c0-2.208,1.792-4,4-4Z"
                            fill="#be2a2c"
                          ></path>
                          <path
                            d="M5,20H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z"
                            transform="rotate(180 16 24)"
                          ></path>
                          <path
                            d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                            opacity=".15"
                          ></path>
                          <path
                            d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                            fill="#fff"
                            opacity=".2"
                          ></path>
                        </svg>
                        +967{" "}
                        <svg
                          className="w-1 h-2.5 ms-2.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>
                      <div
                        id="dropdown-phone"
                        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-52 "
                      >
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdown-phone-button"
                        >
                          <li>
                            <button
                              type="button"
                              className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                              role="menuitem"
                            >
                              <span className="inline-flex items-center">
                                <svg
                                  fill="none"
                                  aria-hidden="true"
                                  className="h-4 w-4 me-2"
                                  viewBox="0 0 20 15"
                                >
                                  <rect
                                    width="19.6"
                                    height="14"
                                    y=".5"
                                    fill="#fff"
                                    rx="2"
                                  />
                                  <mask
                                    id="a"
                                    width="20"
                                    height="15"
                                    x="0"
                                    y="0"
                                    maskUnits="userSpaceOnUse"
                                  >
                                    <rect
                                      width="19.6"
                                      height="14"
                                      y=".5"
                                      fill="#fff"
                                      rx="2"
                                    />
                                  </mask>
                                  <g mask="url(#a)">
                                    <path
                                      fill="#D02F44"
                                      fillRule="evenodd"
                                      d="M19.6.5H0v.933h19.6V.5zm0 1.867H0V3.3h19.6v-.933zM0 4.233h19.6v.934H0v-.934zM19.6 6.1H0v.933h19.6V6.1zM0 7.967h19.6V8.9H0v-.933zm19.6 1.866H0v.934h19.6v-.934zM0 11.7h19.6v.933H0V11.7zm19.6 1.867H0v.933h19.6v-.933z"
                                      clipRule="evenodd"
                                    />
                                    <path
                                      fill="#46467F"
                                      d="M0 .5h8.4v6.533H0z"
                                    />
                                    <g filter="url(#filter0_d_343_121520)">
                                      <path
                                        fill="url(#paint0_linear_343_121520)"
                                        fillRule="evenodd"
                                        d="M1.867 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.866 0a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM7.467 1.9a.467.467 0 11-.934 0 .467.467 0 01.934 0zM2.333 3.3a.467.467 0 100-.933.467.467 0 000 .933zm2.334-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm1.4.467a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.934 0 .467.467 0 01.934 0zm-2.334.466a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.466a.467.467 0 11-.933 0 .467.467 0 01.933 0zM1.4 4.233a.467.467 0 100-.933.467.467 0 000 .933zm1.4.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zm1.4.467a.467.467 0 100-.934.467.467 0 000 .934zM6.533 4.7a.467.467 0 11-.933 0 .467.467 0 01.933 0zM7 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.933 0 .467.467 0 01.933 0zM3.267 6.1a.467.467 0 100-.933.467.467 0 000 .933zm-1.4-.467a.467.467 0 11-.934 0 .467.467 0 01.934 0z"
                                        clipRule="evenodd"
                                      />
                                    </g>
                                  </g>
                                  <defs>
                                    <linearGradient
                                      id="paint0_linear_343_121520"
                                      x1=".933"
                                      x2=".933"
                                      y1="1.433"
                                      y2="6.1"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#fff" />
                                      <stop offset="1" stopColor="#F0F0F0" />
                                    </linearGradient>
                                    <filter
                                      id="filter0_d_343_121520"
                                      width="6.533"
                                      height="5.667"
                                      x=".933"
                                      y="1.433"
                                      colorInterpolationFilters="sRGB"
                                      filterUnits="userSpaceOnUse"
                                    >
                                      <feFlood
                                        floodOpacity="0"
                                        result="BackgroundImageFix"
                                      />
                                      <feColorMatrix
                                        in="SourceAlpha"
                                        result="hardAlpha"
                                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                      />
                                      <feOffset dy="1" />
                                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
                                      <feBlend
                                        in2="BackgroundImageFix"
                                        result="effect1_dropShadow_343_121520"
                                      />
                                      <feBlend
                                        in="SourceGraphic"
                                        in2="effect1_dropShadow_343_121520"
                                        result="shape"
                                      />
                                    </filter>
                                  </defs>
                                </svg>
                                Yemen (+967)
                              </span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      <label
                        htmlFor="phoneNumber"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                      >
                        Phone number:
                      </label>
                      <div className="relative w-full">
                        <input
                          type="text"
                          readOnly={editUser}
                          name="phone"
                          id="phoneNumber"
                          value={phoneNumber}
                          onChange={(event) =>
                            setPhoneNumber(event.target.value)
                          }
                          className={`${
                            errors.phoneNumber
                              ? "border-red-500"
                              : "border-gray-300"
                          } block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-e-lg border-s-0 border border-gray-300
              focus:ring-blue-500 focus:border-blue-500   dark:focus:border-blue-500`}
                          // pattern=""
                          placeholder="123-456-7890"
                        />

                        {errors.phoneNumber && (
                          <p className="text-red-500 mt-1">
                            {errors.phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4 md:w-full w-full md:flex md:flex-row  gap-1  md:justify-between">
                  <div className="mb-4 w-full md:w-1/3">
                    {/* <label htmlFor="city" className="block  mb-2">
                      اختار المحافظة
                    </label> */}
                    {/* <select
                    
                      className={`w-full  border ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      } px-4 py-2 rounded-md`}
                      id="city"
                      readOnly={editUser}
                      name="city"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                    >
                      {!editUser ? (
                        <>
                          <option value="">اختر...</option>
                          <option value="taiz">تعز</option>
                          <option value="Aden">عدن</option>
                          <option value="Sanaa">صنعاء</option>
                        </>
                      ) : (
                        <option value={u.city}>{u.city}</option>
                      )}
                    </select>
                    {errors.city && (
                      <p className="text-red-500 mt-1">{errors.city}</p>
                    )} */}

                    {/* //////////////////////////////// */}

                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      أختار المحافظة{" "}
                    </label>
                    <select
                      id="city"
                      readOnly={editUser}
                      name="city"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      className={` border ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      } block w-full p-2 mb-6 text-sm text-gray-900 border-2 border-gray-500 rounded-lg  focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    >
                      {!editUser ? (
                        <>
                          <option value="">اختر...</option>
                          <option value="taiz">تعز</option>
                          <option value="Aden">عدن</option>
                          <option value="Sanaa">صنعاء</option>
                        </>
                      ) : (
                        <option value={u.city}>{u.city}</option>
                      )}

                      {/* <option selected>Choose a country</option>
    <option value="US">United States</option>
    <option value="CA">Canada</option>
    <option value="FR">France</option>
    <option value="DE">Germany</option> */}
                    </select>
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div className="mb-4 w-full md:w-1/3">
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      الجنس
                    </label>
                    <select
                      id="gender"
                      readOnly={editUser}
                      name="gender"
                      className={`  ${
                        errors.gender ? "border-red-500" : "border-gray-300"
                      } block w-full p-2 mb-6 text-sm text-gray-900 border-2 border-gray-500 rounded-lg  focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      value={gender}
                      onChange={(event) => setGender(event.target.value)}
                    >
                      {!editUser ? (
                        <>
                          <option disabled value="">
                            اختر...
                          </option>
                          <option value="male">ذكر</option>
                          <option value="female">أنثى</option>
                        </>
                      ) : (
                        <option value={u.gender}>{u.gender}</option>
                      )}
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="mb-4 w-full ">
                      <label
                        htmlFor="birthdate"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        تاريخ الميلاد
                      </label>
                      <input
                        type="date"
                        readOnly={editUser}
                        name="date"
                        id="birthdate"
                        value={birthdate}
                        className={` ${
                          errors.birthdate
                            ? "border-red-500"
                            : "border-gray-300"
                        } block w-full p-2 mb-6 text-sm border-2 border-gray-500 rounded-lg  focus:ring-blue-500 focus:border-blue-500   dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        onChange={(event) => setBirthdate(event.target.value)}
                      />

                      {/* <div className="relative max-w-sm">
  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
     <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
      </svg>
  </div>
  <input datepicker datepicker-autohide type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
</div> */}

                      {errors.birthdate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.birthdate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {!editUser ? (
                  <div className="w-full bg-emerald-500 mb-4 rounded-md p-2">
                    <input
                      type="submit"
                      value="تحديث بيانات"
                      className="w-full  "
                    />
                  </div>
                ) : (
                  ""
                )}
              </form>
            </>
          ) : ChangePasword ? (
            <ChangePassword />
          ) : InformationWork ? (
            <>
              <Set_username p={u} />
            </>
          ) : (
            <></>
          )}
        </section>
      </>
    );
  }
  function Contract() {
    const [contracts, setContracts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedContract, setSelectedContract] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
      const fetchContractData = async () => {
        try {
          const response = await axios.get(`/contracts/${user.id}`);
          const data = response.data;
          setContracts(data);
        } catch (error) {
          console.error("Error fetching contract data:", error);
        }
      };

      fetchContractData();
    }, []);

    const handlePopupToggle = (contract) => {
      setSelectedContract(contract);
      setShowPopup(!showPopup);
    };

    const handleContractAction = (action) => {
      // التعامل مع العمليات المختلفة (عرض، حذف، تعديل)
      console.log(`إجراء ${selectedContract.id} على العقد:`, selectedContract);
      navigate(`/order/${selectedContract.id}`);
      setShowPopup(false);
    };
    return (
      <>
        <section className="mb-4   shadow-md ">
          {/* <h1 className="border-2 w-full p-2"></h1> */}
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
            حسابي
          </button>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full bg-white border-collapse border border-gray-300 rounded-lg shadow-lg">
              <thead className="bg-gray-200 text-gray-700">
                <tr className="uppercase text-xs">
                  <th className="py-3 px-6 w-1/5 text-left">العنوان</th>
                  <th className="py-3 px-6 w-1/12 text-left">السعر</th>
                  <th className="py-3 px-6 w-1/6 text-left">تاريخ البداية</th>
                  <th className="py-3 px-6 w-1/6 text-left">تاريخ النهاية</th>
                  <th className="py-3 px-6 w-1/6 text-left">الوقت المتبقي</th>
                  <th className="py-3 px-6 w-1/12 text-left">الحالة</th>
                  <th className="py-3 px-6 w-1/6 text-left">اسم العميل</th>
                  <th className="py-3 px-6 w-1/6 text-left">اسم المقدم</th>
                  <th className="py-3 px-6 w-1/6 text-left">الخيارات</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {contracts.map((contract) => (
                  <tr
                    key={contract.id}
                    className="transition-all hover:bg-gray-100 border-b border-gray-300"
                  >
                    <td className="py-4 px-6 w-1/5">
                      {contract.service.title}
                    </td>
                    <td className="py-4 px-6 w-1/12">{contract.price}</td>
                    <td className="py-4 px-6 w-1/6">
                      {formatDateTime(contract.start_date)}
                    </td>
                    <td className="py-4 px-6 w-1/6">
                      {formatDateTime(contract.end_date)}
                    </td>
                    <td className="py-4 px-6 w-1/6">
                      <TimeRemainingOfServices
                        agreementDate={"2024-07-01T12:00:00"}
                        duration={5}
                      />
                    </td>
                    <td className="py-4 px-6 w-1/12">{contract.status}</td>
                    <td className="py-4 px-6 w-1/6">
                      {contract.client.firstName}
                    </td>
                    <td className="py-4 px-6 w-1/6">
                      {contract.freelancer.firstName}
                    </td>
                    <td className="py-4 px-6 w-1/6">
                      <div className="space-x-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                          onClick={() => handlePopupToggle(contract)}
                        >
                          الخيارات
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {showPopup && selectedContract && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-bold mb-4">خيارات العقد</h3>
                  <div className="space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                      onClick={() => handleContractAction("عرض")}
                    >
                      عرض
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                      onClick={() => handleContractAction("حذف")}
                    >
                      حذف
                    </button>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                      onClick={() => handleContractAction("تعديل")}
                    >
                      تعديل
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                      onClick={() => setShowPopup(false)}
                    >
                      إغلاق
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </>
    );
  }

  function Buyme() {
    return (
      <>
        <p className="mt-2 text-xl   border-white shadow-sm m-2 p-2">
          <FaShoppingCart className="inline" /> مشترياتي (0){" "}
        </p>
        <div className="p-2  bg-amber-500  shadow-md rounded-md text-center block border-2">
          <NavLink>
            <button className="text-md ">تسوق الان</button>
          </NavLink>
        </div>

        <div className="flex flex-row flex-wrap gap-1 m-2 p-2">
          <div className="py-4 px-2 flex-auto bg-white shadow-sm rounded-md text-center border-r-amber-500 border-r-4 border-2">
            <p>بإنتظار موافقة البائع (0.0)</p>
          </div>
          <div className="p-2 flex-auto bg-white shadow-sm rounded-md text-center border-r-amber-500 border-r-4 border-2">
            <p>قيد التنفيذ(0.0)</p>
          </div>

          <div className="p-2 flex-auto bg-white shadow-sm rounded-md text-center  border-r-amber-500 border-r-4 border-2">
            <p>تم الالغاء(0.0)</p>
          </div>

          <div className="p-2 flex-auto border-r-amber-500 bg-white shadow-sm rounded-md text-center border-r-4 border-2">
            <p>مكتمل(0.0)</p>
          </div>
        </div>
      </>
    );
  }

  function Project() {
    const navigate1 = useNavigate();
    const [myPrpject, setMyProject]=useState([])
    const [status, setStatus]=useState([])
    const [myAcceptedBids, setMyAcceptedBids]=useState([])
    useEffect(()=>{

  

    const fetchProject = async () => {
      try {
        const response = await axios.get(`/show-user-projects/${user.id}`);
        const data = response.data.project;
        setMyProject(data);
        setStatus(data)
       
      } catch (error) {
        console.error("Failed to fetch service:", error);
      }
    };
    const getMyAcceptedBids = async () => {
      try {
        const response = await axios.get(`/get-bids-between-client-freelancer/${user.id}`);
        const data = response.data.project;
        setMyAcceptedBids(data);
        console.log( response.data.project)
       
      } catch (error) {
        console.error("Failed to fetch service:", error);
      }
    };
;


    fetchProject();
    getMyAcceptedBids()
  }, []);



  const  HandelNavgateToDetailsProject=(projectId)=>{
    navigate1(`/detailsProject/${projectId}`)
    

   }
   const  HandelNavgateToChatProject=async  (projectId)=>{

    const response=await axios.get(`chats-project-from-notification/${projectId}`);
    // console.log(response.data);
    navigate('/accept-bid/', { state: {id:response.data.chat.project_id, $chat:response.data.chat ,userID:user.id} });
    // navigate('/accept-bid/', { state: { $chat:response.data.chat} });
    // navigate1(`/detailsProject/${projectId}`)
    

   }
  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };
  const [totals, setTotals] = useState({
    completed: 0,
    rejected: 0,
    inProgress: 0,
    Pending: 0,
    cancelled: 0,
    awaitingAdminApproval: 0,
    published: 0,
  });
 

  useEffect(() => {
    const statusTotals = {
      completed: 0,
      rejected: 0,
      inProgress: 0,
      Pending: 0,
      cancelled: 0,
      awaitingAdminApproval: 0,
      published: 0,
    };


    if (Array.isArray(status)) {
      status.map((infoItem) => {
        switch (infoItem.status.status) {
          case 'Completed':
            statusTotals.completed += 1;
            break;
          case 'Rejected':
            statusTotals.rejected += 1;
            break;
          case 'In Progress':
            statusTotals.inProgress += 1;
            break;
          case 'Pending':
            statusTotals.Pending += 1;
            break;
          case 'Cancelled':
            statusTotals.cancelled += 1;
            break;
          case 'awaiting_confirmation':
            statusTotals.awaitingAdminApproval += 1;
            break;
          case 'Published':
            statusTotals.published += 1;
            break;
          default:
            break;
        }
      });
    }

    setTotals(statusTotals);
  }, [myAcceptedBids]);
    
    return (
      <>
        <p className="mt-2 text-xl  border-white shadow-sm m-2 p-2">
          <FaBriefcase className="inline" /> المشاريع (0){" "}
        </p>
        <div className="p-2  bg-green-500 text-white  shadow-md rounded-md text-center block border-2">
          <NavLink to="/add_project">
            <button className="text-md ">إضافة مشروع</button>
          </NavLink>
          
        </div>
      
        <div className="flex flex-row flex-wrap gap-1 m-2 p-2">
          <div className="py-4 px-2 flex-auto bg-white shadow-sm rounded-md text-center border-r-green-500 border-r-4 border-2">
          <p>المكتمل({totals.completed})</p>
          </div>
          <div className="p-2 flex-auto bg-white shadow-sm rounded-md text-center border-r-green-500 border-r-4 border-2">
            <p>المرفوض(0.0)</p>
          </div>

          <div className="p-2 flex-auto bg-white shadow-sm rounded-md text-center  border-r-green-500 border-r-4 border-2">
          <p>قيد التنفيذ({totals.inProgress})</p>
          </div>
          <div className="p-2 flex-auto bg-white shadow-sm rounded-md text-center border-r-green-500 border-r-4 border-2">
            <p>مرحلة تلقى العروض({totals.Pending})</p>
          </div>
          <div className="p-2 flex-auto bg-white shadow-sm rounded-md text-center border-r-green-500 border-r-4 border-2">
            <p>تم الالغاء({totals.cancelled})</p>
          </div>
          <div className="p-2 flex-auto bg-white shadow-sm rounded-md text-center border-r-green-500  border-r-4 border-2">
            <p>بإنتظار موافقه الادارة(0.0)</p>
          </div>
          <div className="p-2 flex-auto border-r-green-500 bg-white shadow-sm rounded-md text-center border-r-4 border-2">
            <p>المنشور(0.0)</p>
          </div>
        </div>

        {/* ................................. */}

        <p className="mt-2 text-xl  border-white shadow-sm m-2 p-2">
          <FaTags className="inline" /> عروضي على المشاريع (0){" "}
        </p>

        <div className="flex flex-row flex-wrap gap-1 m-2 p-2">
          <div className="py-4 px-2 flex-auto bg-white shadow-sm rounded-md text-center border-r-green-500 border-r-4 border-2">
          <p>المكتمل({totals.completed})</p>
                    </div>
          

          <div className="p-2 flex-auto bg-white shadow-sm rounded-md text-center  border-r-green-500 border-r-4 border-2">
          <p>قيد التنفيذ({totals.inProgress})</p>
          </div>

          <div className="p-2 flex-auto bg-white shadow-sm rounded-md text-center border-r-green-500 border-r-4 border-2">
            <p>تم الرفض(0.0)</p>
          </div>
          <div className="p-2 flex-auto bg-white shadow-sm rounded-md text-center border-r-green-500  border-r-4 border-2">
            <p> بإنتظار الموافقه صاحب المشروع ({totals.Pending})</p>
          </div>
        </div>
        <p className="mt-2 text-xl  border-white shadow-sm m-2 p-2">
          <FaTags className="inline" /> اخر المشاريع   ({myPrpject.length}){" "}
        </p>
        <div>
          <div>
          <div className="flex flex-col">
      <div className="relative overflow-x-auto ">
        <div className="inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className=" bg-white divide-y border-2 text-center divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3text-sm font-medium  text-center  text-gray-500 uppercase   w-[5%]">رقم المشروع</th>
                  <th className="px-6 py-3 text-sm font-medium  text-center  text-gray-500 uppercase  w-[15%]">عنوان المشروع</th>
                  <th className="px-6 py-3  text-sm font-medium  text-center  text-gray-500 uppercase   w-[30%]">الوصف</th>
                  <th className="px-6 py-3 text-sm font-medium  text-center  text-gray-500 uppercase w-1/3">الحالة</th>
                  <th className="px-6 py-3 text-sm font-medium  font-arabic text-gray-500 uppercase w-1/3"> تفاصيل المشروع</th>
                </tr>
              </thead>
              {/* {console.log(myPrpject)} */}
              <tbody className="bg-white divide-y border-collapse border-2 divide-gray-700">
              {/* myPrpject.length>0 && myPrpject.map((project) => (
                <> */}
            {console.log(myPrpject)}
                { myPrpject.length>0 && myPrpject.map((project) => (
                  <tr key={project.id}>
                     {/* {console.log(myPrpject?.status.status)} */}
                    <td className="px-4 py-4 border-l-2 text-sm text-gray-500 ">{project.id}</td>
                    <td className="px-4 py-2 border-l-2 text-sm  w-[20%]">{project.title}</td>
                    <td className="px-4 py-4 border-l-2 text-sm text-gray-500 w-[50%]">{truncateText(project.description, 50)}</td>
                    <td className="px-4 py-4  border-l-2 text-center text-sm text-gray-500 ">{project.status.status}</td>
                    <td className=" text-sm border-l-2 px-4 text-gray-500 whitespace-nowrap  ">
                      <button onClick={() =>HandelNavgateToDetailsProject(project.id)} className="px-3 py-2  text-white  bg-green-500 rounded-md"> المزيد التفاصيل </button>
                      {
                        project.accepted_bid &&(
                             <button onClick={() =>HandelNavgateToChatProject(project.id)} className="px-3 py-2  text-white  bg-green-500 rounded-md">  دردشه المشروع </button>

                        )

                      }
                    
                  {/* <NavLink  exact  className="px-3 py-2  text-white  bg-green-500 rounded-md" to={`detailsProject/${project.id}`}>المزيد التفاصيل</NavLink> */}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

          </div>
          <p className="mt-2 text-xl  border-white shadow-sm m-2 p-2">
          <FaTags className="inline" />   محادثات العروض المقبولة    ({myAcceptedBids.length}){" "}
        </p>
      <div>
       
        {
  Array.isArray(myAcceptedBids) && myAcceptedBids.map((infoItem) => (
    <div key={infoItem.id}>
      {/* {console.log(infoItem.project_id)} */}
      <div className='flex justify-between m-2 border-b-2 p-2'>
<p>{infoItem.project.title}</p>
      <button onClick={() =>HandelNavgateToChatProject(infoItem.project_id)} className="px-3 py-2  text-white  bg-green-500 rounded-md">  دردشة المشروع </button>

      </div>
      


    </div>
  ))
}
    

      </div>

          
      

        </div>
      </>
    );
  }

  function Services() {
    const [service, setService] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
  

    useEffect(() => {
      const fetchServices = async () => {
        try {
          const response = await axios.get(`/getUserServices/${user.id}`);
          const data = response.data;
          setService(data);
          // console.log(data);
        } catch (error) {
          console.error("Failed to fetch service:", error);
        }
      };

      fetchServices();
    }, []);

    const togglePopup = (id) => {
      setShowPopup(!showPopup);
      setSelectedService(id);
    };

    const handleEdit = () => {
      setShowPopup(false);
    };

    const handleDelete = async (id) => {
      console.log("Delete option clicked:", id);

      try {
        const response = await axios.post(`/delete/${id}/service`);

        if (response.status === 200) {
          console.log("Service deleted successfully:", response.data);
        } else {
          console.error(
            "Error deleting service:",
            response.status,
            response.data
          );
        }
      } catch (error) {
        console.error("Error deleting service:", error);
      } finally {
        setShowPopup(false);
      }
    };

    const handleShow = () => {
      setShowPopup(false);
    };

    // console.log(service);

    return (
      <>
        <div className="flex flex-row mb-4 justify-between">
          <button
            type="button"
            className="text-gray-900 md:w-1/3 w-full border-emerald-300 border-b-2 hover:bg-green-200  font-medium text-lg px-10 py-2.5 sm:mb-2 mb-6 text-center inline-flex items-center  me-2 "
          >
        
            <p className="   border-white shadow-sm">
              <FaTasks className="inline-block" /> الخدمات ({service.length})
            </p>
          </button>
          <div className="mt-4 ">
            {/* <div className="relative flex flex-col items-center justify-center py-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm"> */}
            {/* <FaFileUpload size={50} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" /> */}
            <div className="">
              <NavLink to="/add_service">
                <button className="text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
                  <span>أضف الخدمة </span>
                </button>
              </NavLink>
            </div>
            {/* </div> */}
          </div>
        </div>
        <div>
          <div className="flex flex-row flex-wrap gap-2 m-2 p-2">
            <div className="flex-1  py-4 bg-white shadow-sm rounded-md text-center border-r-blue-500 border-r-4 border-2">
              <p>تم تسليم(0.0)</p>
            </div>
            <div className="flex-1 py-4  bg-white shadow-sm rounded-md text-center border-r-blue-500 border-r-4 border-2">
              <p>المرفوض(0.0)</p>
            </div>

            <div className=" flex-1 py-4 bg-white shadow-sm rounded-md text-center  border-r-blue-500 border-r-4 border-2">
              <p>قيد التنفيذ(0.0)</p>
            </div>
            <div className=" flex-1 py-4  bg-white shadow-sm rounded-md text-center border-r-blue-500  border-r-4 border-2">
              <p>بإنتظار موافقه الادارة(0.0)</p>
            </div>
            <div className=" flex-1 py-4 border-r-blue-500 bg-white shadow-sm rounded-md text-center border-r-4 border-2">
              <p>المنشور(0.0)</p>
            </div>
          </div>
          {/* <p className="text-2xl p-2  "> خدماتي</p> */}
          <div className="mt-5 borde-2 flex flex-row justify-center flex-wrap gap-2   bg-white  border-2 text-black rounded-xl  ">
            {service.length > 0 ? (
              <>
                {service.map((userService) => (
                  <div key={userService.id} className="m-2 ">
                    <div className="flex justify-center  w-full">
                      <div className="w-72 relative m-auto bg-white   border border-gray-200 rounded-lg shadow ">
                        <div className=" absolute  left-0 inline-block ">
                          <button
                            className="focus:outline-none inline-flex items-center p-1 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-2   "
                            onClick={() => togglePopup(userService.id)}
                          >
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 4 15"
                            >
                              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg>
                          </button>

                          {showPopup && userService.id === selectedService && (
                            <div className="relative w-full ">
                              <div className=" absolute bg-white left-1  shadow-lg rounded-md">
                                {/* <div className="py-2"> */}
                                {/* <div className=" absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                              <div className="py-2"> */}
                                <button
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                  onClick={() => handleEdit(userService.id)}
                                >
                                  <NavLink
                                    to={`/edite/${userService.id}/service`}
                                  >
                                    Edite
                                  </NavLink>
                                </button>
                                <button
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                  // onClick={handleDelete(userService.id )}
                                  onClick={() => handleDelete(userService.id)}
                                >
                                  Delete
                                </button>
                                <button
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                  onClick={handleShow}
                                >
                                  Show
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        <img
                          src={"http://localhost:8000/" + userService.image}
                          alt="Service"
                          className=" w-full h-36  "
                        />
                        <div className="p-2 overflow-hidden text-right">
                          <p>
                            {userService.title.split(" ").slice(0, 5).join(" ")}
                          </p>
                        </div>

                        <div className="border-t-2 flex  flex-row  justify-between  border-gray-500">
                          <div className="group flex items-center">
                            <img
                              className="shrink-0 h-12 w-12 rounded-full"
                              src={"http://localhost:8000/" + userService.image}
                              alt=""
                            />
                            <div className="ltr:ml-3 rtl:mr-3">
                              <p className="text-sm font-medium text-slate-500 group-hover:text-black">
                                {" "}
                                {user.firstName}{" "}
                              </p>
                              <p className="text-sm font-medium text-slate-500 group-hover:text-slate-300">
                                {" "}
                                {user.field}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end mt-2 mb-2">
                            <div className="flex flex-row ml-1">
                              <p className="text-green-500  font-semibold ">
                                {userService.price}$
                              </p>

                              <p>
                                {" "}
                                <span>(0)</span>{" "}
                                <FaCartPlus className=" inline-block " />
                              </p>
                            </div>

                            <div className="flex m-2 ml-0 text-gray-300  justify-end w-fit ">
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                            </div>
                          </div>
                        </div>

                        <NavLink to={`/details-service/${userService.id}`}>
                          <button className="p-2 text-center text-white bg-emerald-500 rounded-md shadow-sm w-full hover:bg-emerald-600">
                            تصفح
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className=" h-32 w-full text-center pt-14 ">
                لم يتم إضافة الخدمات .
              </p>
            )}
          </div>
        </div>
      </>
    );
  }
  function Works() {
    const [portfolio, setPortfolio] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
      // console.log(user.id);
      const fetchPortfolioUser = async () => {
        try {
          const response = await axios.get(`portfolio/${user.id}`);
          setPortfolio(response.data);
          // console.log(response);
        } catch (error) {
          setError(error);
        }
      };

      fetchPortfolioUser();
    }, []);
    const togglePopup = (id) => {
      setShowPopup(!showPopup);
      setSelectedService(id);
    };

    const handleEdit = () => {
      setShowPopup(false);
    };

    const handleDelete = async (id) => {
      console.log("Delete option clicked:", id);

      try {
        const response = await axios.delete(`/portfolio/${id}`);

        if (response.status === 200) {
          console.log("portfolio deleted successfully:", response.data);
          window.location.reload();
          toast.success("تم حذف بنجاح");
        } else {
          console.error(
            "Error deleting portfolio:",
            response.status,
            response.data
          );
        }
      } catch (error) {
        console.error("Error deleting portfolio:", error);
      } finally {
        setShowPopup(false);
      }
    };
    return (
      <>
        <div className="">
          <div className="flex flex-row mb-4 justify-between">
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
              {/* <p className="text-xl   border-white shadow-sm m-2 p-2"> */}
              {/* <FaTags className="inline ml-1" /> */}
              أعمالي ({portfolio.length}){/* </p> */}
            </button>
            <div className="mt-4 ">
              {/* <div className="relative flex flex-col items-center justify-center py-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm"> */}
              {/* <FaFileUpload size={50} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" /> */}
              <div className="">
                <NavLink to="/add-portfolio">
                  <button className="flex items-center justify-center py-2.5 px-4 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600">
                    <span>أضف نموذج عملك</span>
                  </button>
                </NavLink>
              </div>
              {/* </div> */}
            </div>
          </div>

          {/* <div className="flex flex-row flex-wrap gap-1 m-2 p-2">
            <div className="py-4 px-2 flex-auto bg-white shadow-sm rounded-md text-center border-r-blue-500 border-r-4 border-2">
              <p>المعروضة(0.0)</p>
            </div>

            <div className="p-2 flex-auto bg-white shadow-sm rounded-md text-center border-r-blue-500 border-r-4 border-2">
              <p>تم الرفض(0.0)</p>
            </div>
            <div className="p-2 flex-auto bg-white shadow-sm rounded-md text-center border-r-blue-500  border-r-4 border-2">
              <p>بإنتظار الموافقه (0.0)</p>
            </div>
          </div> */}

          <div className="flex w-full flex-wrap flex-row m-2 gap-4 md:gap-0 justify-center md:justify-start">
            {portfolio && portfolio.length > 0 ? (
              portfolio.map((portfolio) => (
                <div key={portfolio.id} className=" flex-shrink ">
                  <div className=" w-64 relative m-auto  border border-gray-200 rounded-lg shadow ">
                    <div className=" absolute  left-0 inline-block ">
                      <button
                        className="focus:outline-none inline-flex items-center p-1 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-2   "
                        onClick={() => togglePopup(portfolio.id)}
                      >
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 4 15"
                        >
                          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                      </button>

                      {showPopup && portfolio.id === selectedService && (
                        <div className="relative w-full ">
                          <div className=" absolute bg-white left-1  shadow-lg rounded-md">
                            <div className="py-2">
                              <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => handleEdit(portfolio.id)}
                              >
                                <NavLink
                                  to={`/edite/${portfolio.id}/portfolio`}
                                >
                                  تعديل
                                </NavLink>
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                // onClick={handleDelete(userService.id )}
                                onClick={() => handleDelete(portfolio.id)}
                              >
                                حذف
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-full mx-auto ">
                      <img
                        src={ImageUSer}
                        alt="product image"
                        className=" w-full block h-36"
                      />
                    </div>

                    {/* <img
                      className="p-2 rounded-t-lg"
                      src={ImageUSer}
                      alt=""
                    /> */}

                    <div className="px-5 pb-2">
                      <div className="p-2 overflow-hidden text-right">
                        <p>
                          {portfolio.title.split(" ").slice(0, 5).join(" ")}
                        </p>
                        {/* <p className="mt-2">{service.category}</p> */}
                      </div>
                      {/* <a href="#">
                        <h5 className="text-md   text-gray-900 ">
                          {portfolio.title}
                        </h5>
                      </a> */}
                      <div className="flex items-center mt-2.5 mb-3">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          <svg
                            className="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            className="w-4 h-4 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded   ms-3">
                          5.0
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        {/* <span className="text-3xl font-bold text-gray-900">$599</span> */}
                        <NavLink
                          to={`/portfolio/${portfolio.id}`}
                          className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 w-full py-2.5 text-center  dark:focus:ring-blue-800"
                        >
                          {" "}
                          تفاصيل
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
  }
 
  //   const [image, setImage] = useState();
  //   const [image2, setImage2] = useState();

  //   const [selectedImage, setSelectedImage] = useState();
  //   const [selectedImage2, setSelectedImage2] = useState();
  //   const handleImageChange2 = (e) => {
  //     const selectedFile = e.target.files[0];
  //     // const updatedFormData = { ...formData, file: selectedFile };
  //     setImage2(selectedFile);
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.onload = (e) => setSelectedImage2(e.target.result); // Set image data in state
  //     reader.readAsDataURL(file);
  //   };
  //   const handleImageChange = (e) => {
  //     const selectedFile = e.target.files[0];
  //     // const updatedFormData = { ...formData, file: selectedFile };
  //     setImage(selectedFile);
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.onload = (e) => setSelectedImage(e.target.result); // Set image data in state
  //     reader.readAsDataURL(file);
  //   };
  //   return (
  //     <>
  //       <button
  //         type="button"
  //         className="text-gray-900 md:w-1/4 w-full border-emerald-300 border-b-2 hover:bg-green-200  font-medium text-lg px-10 py-2.5 sm:mb-2 mb-6 text-center inline-flex items-center  me-2 "
  //       >
  //         <svg
  //           className="w-4 h-4 me-2 -ms-1 text-[#626890]"
  //           aria-hidden="true"
  //           focusable="false"
  //           data-prefix="fab"
  //           data-icon="ethereum"
  //           role="img"
  //           xmlns="http://www.w3.org/2000/svg"
  //           viewBox="0 0 320 512"
  //         >
  //           <path
  //             fill="currentColor"
  //             d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
  //           ></path>
  //         </svg>
       
  //         توثيق الهوية
     
  //       </button>
  //       <section className=" container mx-auto   ">
  //         <div className="mb-3 flex flex-col items-center justify-center ">
  //           <div className="m-2 border-r-2 border-emerald-500 p-2 shadow-md rounded-sm  ">
  //             <p className="text-md p-2 ">
  //               يجب ان تكون الصور المرفوعة واضحه تاكد ان اسمك في البطاقة مطابقة
  //               لاسم حسابك على منصة الوسيط الحر
  //             </p>
  //           </div>
  //           <form action="" method="post">
  //             <div>
  //               <div className=" md:flex gap-2 justify-between ">
  //                 <div className="mb-4 border-2 p-2 shadow-sm">
  //                   <label htmlFor="file" className="block  mb-1">
  //                     فضلاً قم بتحميل صورة الوجهة الأمامية لبطاقتك الشخصية
  //                   </label>

  //                   <div className="shrink-0">
  //                     <img
  //                       className="h-16 w-16 object-cover rounded-full"
  //                       src={selectedImage}
  //                       alt="Current profile photo"
  //                     />
  //                   </div>
  //                   <label className="block">
  //                     <span className="sr-only">أختار الصورة </span>
  //                     <input
  //                       id="file"
  //                       name="file"
  //                       onChange={handleImageChange}
  //                       type="file"
  //                       accept=".jpg, .jpeg, .png"
  //                       className="block w-full text-sm text-slate-500
  //     file:mr-4 file:py-2 file:px-4
  //     file:rounded-full file:border-0
  //     file:text-sm file:font-semibold
  //     file:bg-violet-50 file:text-violet-700
  //     hover:file:bg-violet-100
  //   "
  //                     />
  //                   </label>
  //                   {/* {errors.file &&
  //           <p className="text-red-500 text-sm mt-1">
  //            {errors.file}
  //           </p>
  //         } */}
  //                 </div>
  //                 <div className="mb-4 border-2 p-2 shadow-sm">
  //                   <label htmlFor="file" className="block  mb-1">
  //                     فضلاً قم بتحميل صورة الوجهة الخلفية لبطاقتك الشخصية
  //                   </label>

  //                   <div className="shrink-0">
  //                     <img
  //                       className="h-16 w-16 object-cover rounded-full"
  //                       src={selectedImage2}
  //                       alt="Current profile photo"
  //                     />
  //                   </div>
  //                   <label className="block">
  //                     <span className="sr-only">Choose profile photo</span>
  //                     <input
  //                       id="file"
  //                       name="filebck"
  //                       onChange={handleImageChange2}
  //                       type="file"
  //                       accept=".jpg, .jpeg, .png"
  //                       className="block w-full text-sm text-slate-500
  //     file:mr-4 file:py-2 file:px-4
  //     file:rounded-full file:border-0
  //     file:text-sm file:font-semibold
  //     file:bg-violet-50 file:text-violet-700
  //     hover:file:bg-violet-100
  //   "
  //                     />
  //                   </label>
                   
  //                 </div>
  //               </div>           
  //             </div>
  //             <input
  //               type="button"
  //               value="ارسال"
  //               className=" w-1/2 text-white rounded-md bg-emerald-500 p-3 text-center boreder-2 shadow-sm mt-2"
  //             />
  //           </form>
  //         </div>
  //       </section>
  //     </>
  //   );
  // }

  //////////////////////
  // داله شحن رصيد
  //////////////////

  // function PageAlcrimi(){
  //   return (
  //     <>
  //     <p>Hello PageAlcrimi</p>
  //     </>
  //   )
  // }
  // function Pagecach(){
  //   return (
  //     <>
  //     <div className="flex justify-center p-12 m-2 bg-gray-200">

  //        <p className="">قريبا سوف تتوفر الخدمة....</p>
  //     </div>

  //     </>
  //   )
  // }
  ///////////////
  //  here function ToWithdraw
  ///////////////////
  ///////////////////////
  // function Balacnr here
  ///////////////////////////////////

  return (
    <>
      <section className="md:flex ">
        {/* <div className="  md:flex"> */}
        <div className=" bg-white shadow-xl  md:w-1/2  ">
          <div className=" flex flex-col items-center mt-4 p-1">
            <div className=" border-2 border-r-emerald-500  rounded-full">
              <img
                src={`http://127.0.0.1:8000/${user.image}`}
                alt=" "
                className="rounded-full block "
              />
            </div>
            <div>
              <p className="text-md mt-2  ">{user.firstName} </p>
            </div>
          </div>

          <div>
            <p className="text-xl mt-2 p-2 mb-4 border-b-2 border-slate-300 w-1/3">
              لوحه التحكم
            </p>
          </div>
          <div className="flex flex-row gap-2 m-2 flex-wrap ">
            <button onClick={homeHandle} className=" flex-1">
              <div className="p-6 bg-white border-r-emerald-500 border-r-4 border-2 rounded-md">
                <FaHome size={25} className=" text-center w-full" />
                <p>الرئيسية </p>
              </div>
            </button>

            <button onClick={accountHandle} className=" flex-1">
              <div className="p-6 bg-white border-r-emerald-500 border-r-4 border-2 rounded-md">
                <FaUser size={25} className="text-center w-full" />
                <p>حسابي </p>
              </div>
            </button>
            <button onClick={ContractHandle} className=" flex-1">
              <div className="p-6 bg-white border-r-emerald-500 border-r-4 border-2 rounded-md">
                <FaFileContract size={25} className="text-center w-full" />
                <p>العقود </p>
              </div>
            </button>

            <button onClick={BalanceHandle} className=" flex-1">
              <div className="p-6 bg-white border-r-emerald-500 border-r-4 border-2 rounded-md">
                <FaMoneyBill size={25} className="text-center w-full" />
                <p>الرصيد </p>
              </div>
            </button>
            <button onClick={WorksHandle} className=" flex-1">
              <div className="p-6 bg-white border-r-emerald-500 border-r-4 border-2 rounded-md">
                <FaBriefcase size={25} className="text-center w-full" />
                <p>اعمالي </p>
              </div>
            </button>
            <button onClick={projectHandle} className=" flex-1">
              <div className="p-6 bg-white border-r-emerald-500 border-r-4 border-2 rounded-md">
                <FaBriefcase size={25} className="text-center w-full" />
                <p>مشاريعي </p>
              </div>
            </button>

            <button onClick={ServiceHandle} className=" flex-1">
              <div className="p-6 bg-white border-r-emerald-500 border-r-4 border-2 rounded-md">
                <FaTasks size={25} className="text-center w-full" />
                <p>خدماتي </p>
              </div>
            </button>
            <button onClick={buyHandle} className=" flex-1">
              <div className="p-6 bg-white border-r-emerald-500 border-r-4 border-2 rounded-md">
                <FaTasks size={25} className="text-center w-full" />
                <p>مشترياتي </p>
              </div>
            </button>
            <button onClick={verificationHandle} className=" flex-1">
              <div className="p-6 bg-white border-r-emerald-500 border-r-4 border-2 rounded-md">
                <FaFileAlt size={25} className="text-center w-full" />
                <p>التوثيق </p>
              </div>
            </button>
            <button className=" flex-1">
              <div className="p-6 bg-white border-r-emerald-500 border-r-4 border-2 rounded-md">
                <FaUsers size={25} className="text-center w-full" />
                <p>المجتمع </p>
              </div>
            </button>
            <button className=" flex-1" onClick={RatingeHandle}>
              <div className="p-6 bg-white border-r-emerald-500 border-r-4 border-2 rounded-md">
                <FaStar size={25} className="text-center w-full" />
                <p>التقييمات والاراء </p>
              </div>
            </button>
          </div>
        </div>
        {/* ///////////////////////////////////////////////////// */}
        <div className=" md:w-full m-3 ">
          {rating ? (
            <>
              <Rating />
            </>
          ) : (
            <></>
          )}
          {balance ? (
            <>
              <Balance />
            </>
          ) : (
            <></>
          )}

          {/* ///////////////////////////////////////////////////// */}
          {works ? (
            <>
              <Works />
            </>
          ) : (
            <></>
          )}

          {/* ///////////////////////////////////////////////////// */}
          {service ? (
            <>
              <Services />
            </>
          ) : (
            <></>
          )}

          {/* ///////////////////////////////////////////////////// */}

          {project ? (
            <>
              <Project />
            </>
          ) : (
            <></>
          )}

          {/* ///////////////////////////////////////////////////// */}
          {buy ? (
            <>
              <Buyme />
            </>
          ) : (
            <></>
          )}

          {/* ///////////////////////////////////////////////////// */}
          {verification ? (
            <>
             <Verification/>
            </>
          ) : (
            <></>
          )}

          {/* ///////////////////////////////////////////////////// */}
          {account ? (
            <>
              <Account />
            </>
          ) : (
            <></>
          )}
          {contarct ? (
            <>
              <Contract />
            </>
          ) : (
            <></>
          )}
        </div>

        {/* </div> */}
      </section>
    </>
  );
}
