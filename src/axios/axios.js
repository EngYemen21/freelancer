import Axios from 'axios';

const axios = Axios.create({
	baseURL: "https://freelancer-backend-production-ec21.up.railway.app/api",
	withCredentials: true,
	headers: {
		"Content-Type": "multipart/form-data",
		"Accept": "application/json",
	},
});

export default axios;