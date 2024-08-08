import React, { useState } from 'react';
import { Link, NavLink, Navigate ,useNavigate} from 'react-router-dom';
import axios from '../../axios/axios';
import { useAuth } from '../../contexts/AuthContext';
export default function Login() {
	const { setUser, csrfToken } = useAuth();
	const [error, setError] = React.useState(null);
	const [url, setUrl] = React.useState(null);
	const navigate=useNavigate()
	const send=async (e)=>{
		e.preventDefault();
		const response=await axios.get('/auth/redirect');		
		setUrl(response.data)
		console.log(response);

	}

	// login user
	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = e.target.elements;
		const body = {
			email: email.value,
			password: password.value,
		};
		await csrfToken();
		try {
			const resp = await axios.post('/login', body);
			if (resp.status === 200) {
				setUser(resp.data.user);
				console.log(resp.data.user)
				if(resp.data.user.role)
					{
						
						navigate("/admin/dashboard")
				         return ;
					}
				else{
						navigate("/dashboard/profile")
						return ;
					}
				

				// return <Navigate to="/profile" />;
			}
		} catch (error) {
			if (error.response.status === 401) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<section className=" bg-slate-100  ">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				
				<div className="w-full bg-white rounded-lg shadow-md md:mt-[-60px] sm:max-w-md xl:p-0  ">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						
						<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
							إدخل بياناتك للوصول لحسابك
						</h1>
						{error && (
							<div
								className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  dark:text-red-400 dark:border-red-800"
								role="alert">
								<svg
									aria-hidden="true"
									className="flex-shrink-0 inline w-5 h-5 mr-3"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
										clipRule="evenodd"></path>
								</svg>
								<span className="sr-only">Info</span>
								<div>{error}</div>
							</div>
						)}

						<form
							className="space-y-4 md:space-y-6"
							action="#"
							method="post"
							onSubmit={handleSubmit}>
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
									required
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-gray-900">
									كلمة المرور
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5     dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
								/>
							</div>

							<button
								type="submit"
								className="w-full text-white bg-[#8e2de2] hover:bg-[#4a00e0] focus:outline-none focus:ring-2 focus:ring-[#8e2de2]  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
								تسجيل الدخول
							</button>

							<p className="text-sm font-light text-gray-500 ">
							هل نسيت كلمة المرور?{' '}
								<Link
									to="/recovery-password"
									className="font-sm text-primary-600 hover:underline dark:text-primary-500">
									إستعادة كلمة المرور
								</Link>
							</p>
							<p className="text-sm text-center  font-light text-gray-500 ">
							لا امتلك حساب ?{' '}
								<Link
									to="/register"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500">
									إنشاء حساب
								</Link>
							</p>
						</form>
						<form>
						<button onClick={send}
								type="submit"
								className="w-full text-black border-gray-200 border-2 bg-[#ffffff] hover:bg-[#4a00e0] focus:outline-none focus:ring-2 focus:ring-[#8e2de2]  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
								 Sign in with Google
							</button>
						</form>
						{url && (
                    <NavLink className="App-link" to={url}>
                        Sign in with Google
                    </NavLink>
                )}
						
					</div>
				</div>
			</div>
		</section>
	);
}