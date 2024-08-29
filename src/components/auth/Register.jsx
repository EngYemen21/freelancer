import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from '../../contexts/AuthContext'; 
// import { Navigate } from 'react-router-dom';
export default function Register() {
	// const { setUser } = useAuth();
	const { setUser, csrfToken } = useAuth();
	const [captchaToken, setCaptchaToken] = useState('');
	const [message, setMessage] = useState('');
	const [nameError, setNameError] = React.useState('');
	const [recaptchaError, setRecaptchaError] = React.useState('');

	const [emailError, setEmailError] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('');
	// const [messageColor, setMessageColor] = useState('');
	const navigate=useNavigate()

	const handleRecaptchaChange = (value) => {
		setCaptchaToken(value);
	  };
	


	// register user
	const handleSubmit = async (e) => {
		e.preventDefault();
	// 	if (!captchaToken) {
	// 		setMessage("Please complete the CAPTCHA");
    //   setMessageColor('red');
	// 		return;
	// 	}
		const { name,lastName, email, password, cpassword } = e.target.elements;
		const body = {
			firstName: name.value,
			lastName: lastName.value,
			email: email.value,
			password: password.value,
			password_confirmation: cpassword.value,
			recaptcha :captchaToken,
		};
		
		try {
			await csrfToken();
			const resp = await axios.post('/register', body);
			if (resp.status === 200) {
				setUser(resp.data.user);
				// if(resp.data.user.role)
				// 	{
						
						navigate("/email-verification")
				         return ;
				// 	}
				// else{
				// 		navigate("/dashboard/profile")
				// 		return ;
				// 	}
			}
		} catch (error) {
			if (error.response.status === 422) {
				console.log(error.response.data.errors);
				if (error.response.data.errors.firstName) {
					setNameError(error.response.data.errors.firstName[0]);
				} else {
					setNameError('');
				}
				if (error.response.data.errors.email) {
					setEmailError(error.response.data.errors.email[0]);
				} else {
					setEmailError('');
				}
				if (error.response.data.errors.password) {
					setPasswordError(error.response.data.errors.password[0]);
				} else {
					setPasswordError('');
				}
				if (error.response.data.errors.recaptcha) {
					setRecaptchaError(error.response.data.errors.recaptcha[0]);
				} else {
					setRecaptchaError('');
				}
			}
		}
	};

	return (
		<section className="  bg-slate-100 ">
			<div className="flex  items-center justify-center px-6 py-8 bg-white mx-auto lg:py-0">
				{/* <div className='w-full bg-green-600 '>    */}
					<div className="md:w-1/2 w-full  rounded-lg shadow-md md:mt-4  md:mb-4  xl:p-0 ">
					<div className="p-6 space-y-4 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
							إنشاء حساب 
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							action="#"
							method="post"
							onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-gray-900">
									الاسم الاول
								</label>
								<input
									type="text"
									name="name"
									id="name"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Jhone Doe"
									
								/>
								{nameError && (
									<p className="text-sm text-red-600">{nameError}</p>
								)}
							</div>

							<div>
								<label
									htmlFor="lastName"
									className="block mb-2 text-sm font-medium text-gray-900">
									اسم العائلة 
								</label>
								<input
									type="text"
									name="lastName"
									id="lastName"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Jhone Doe"
									
								/>
								{nameError && (
									<p className="text-sm text-red-600">{nameError}</p>
								)}
							</div>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900">
									البريد الالكتروني
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@company.com"
									
								/>
								{emailError && (
									<p className="text-sm text-red-600">{emailError}</p>
								)}
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900 ">
									كلمة المرور
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
									
								/>
								{passwordError && (
									<p className="text-sm text-red-600">{passwordError}</p>
								)}
							</div>
							<div>
								<label
									htmlFor="cpassword"
									className="block mb-2 text-sm font-medium text-gray-900 ">
									تأكيد كلمة المرور
								</label>
								<input
									type="password"
									name="cpassword"
									id="cpassword"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
									
								/>
							</div>
							<div>

							<ReCAPTCHA
                sitekey="6LfOcwEqAAAAAN7IVExdUcETRQJdbpi9PELH422A"
				
				onChange={handleRecaptchaChange}
            />
			{recaptchaError && (
									<p className="text-sm text-red-600">{recaptchaError}</p>
								)}
							</div>

							<button
								type="submit"
								className="w-full text-white bg-[#8e2de2] hover:bg-[#4a00e0] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
								إنشاء الحساب
							</button>
							<p className="text-sm font-light text-gray-500 ">
								هل لديك حساب مسبقا?{' '}
								<Link
									to="/login"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500">
									تسجيل الدخول
								</Link>
							</p>
						</form>
					</div>
				</div>
				{/* </div> */}

				
			</div>
		</section>
	);
}