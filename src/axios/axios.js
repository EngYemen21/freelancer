import Axios from 'axios';
// Axios.defaults.withXSRFToken=true;
const axios = Axios.create({
	baseURL: "https://freelancer-backend-production-ec21.up.railway.app/api",
	// withCredentials: true,
	
	headers: {
		"Content-Type": "multipart/form-data",
		"Accept": "application/json",
		// 'X-XSRF-TOKEN':
	},
	withCredentials: true,
});

export default axios;