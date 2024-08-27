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
		'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
		

	},
	// withCredentials: true,
});
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


export default axios;