import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContent = createContext({
	user: null,
	setUser: () => {},
	csrfToken: () => {},
});

export const AuthProvider = ({ children }) => {
	const [user, _setUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);
	const setUser = (user) => {
		
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
			console.log("Done")
		} else {
			localStorage.removeItem('user');
		}
		_setUser(user);
	};
	// csrf token generation for guest methods
	const csrfToken = async () => {
		await axios.get('https://freelancer-backend-production-ec21.up.railway.app/sanctum/csrf-cookie',{withCredentials: true});
	  		return true;
	};

	return (
		<AuthContent.Provider value={{ user, setUser, csrfToken }}>
			{children}

		</AuthContent.Provider>
	);
};
export const useAuth = () => {
	return useContext(AuthContent);
};