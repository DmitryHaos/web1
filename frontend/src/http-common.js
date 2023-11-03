import axios from "axios";

var token = "";
var user = JSON.parse(localStorage.getItem('user'));
if (user && user.accessToken) {
	token = user.accessToken;
}

const http = axios.create({
	baseURL: process.env.VUE_APP_BACKEND_URL,		// указание адреса сервера
	headers: {
		"Content-Type": "application/json",			// обмен данными будем осуществлять в формате json
		"x-access-token":  token					// токен
	}
});

export default http;