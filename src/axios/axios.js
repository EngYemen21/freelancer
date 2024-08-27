import Axios from 'axios';
// Axios.defaults.withXSRFToken=true;
const axios = Axios.create({
	baseURL: "https://freelancer-backend-production-ec21.up.railway.app/api",
	withCredentials: true,
	xsrfCookieName:'XSRF-TOKEN',
		xsrfHeaderName:'X-XSRF-TOKEN',
	
	headers: {
		"Content-Type": "multipart/form-data",
		"Accept": "application/json",
		// 'X-XSRF-TOKEN':
		// 'X-XSRF-TOKEN':
		

	},
	// withCredentials: true,
});


export default axios;