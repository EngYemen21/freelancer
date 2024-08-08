import { createBrowserRouter } from 'react-router-dom';
// import Login from './pages/Login';
// import About from './pages/About';
// import Profile from './pages/Profile';
// import Register from './pages/Register';
import Register from './Layouts/Register';
import Profile from './Layouts/Profile';
import Login from './Layouts/Login';
import About from './Layouts/About';

import GuestLayout from './components/GuestLayout';


import ProtectedLayout from './components/ProtectedLayout';
// import GuestLayout from './components/GuestLayout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
		],
	},
	{
		path: '/',
		element: <ProtectedLayout />,
		children: [
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
		],
	},
]);

export default router;