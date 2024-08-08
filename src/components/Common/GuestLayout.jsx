import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Home from '../../Layouts/Home';

const GuestLayout= ({ children }) =>  {
	const navigate=useNavigate();
	const { user } = useAuth();

	// if user is logged in, redirect to profile page
	useEffect(() => {
		if(user){
			navigate("/dashboard/profile");
		}
		
		
	  }, [navigate]);
	

	return (
		<> 
		
		{children}

			{/* <Outlet /> */}
		</>
	);
}
export default  GuestLayout