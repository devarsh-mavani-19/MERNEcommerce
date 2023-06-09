import axios from "axios";
import queryString from "query-string";
import authUtils from "../utils/authUtils";
const baseUrl = process.env.REACT_APP_BACKEND_SERVER_URL + "/api/v1/";
console.log(baseUrl);

const axiosClient = axios.create({
	baseURL: baseUrl,
	paramsSerializer: (params) => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(async (config) => {
	let token = await authUtils.getToken();
	console.log(token);
	return {
		...config,
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
	};
});

axiosClient.interceptors.response.use(
	(response) => {
		if (response && response.data) return response.data;
		return response;
	},
	(err) => {
		let message =
			typeof err.response.data == "string"
				? err.response.data
				: err.response.data.message;
		if (!err.response) {
			return alert(err);
		}
		if (err.response.status == 401) {
			alert(
				"You are not logged in! or your session has expired. Plese login"
			);
			authUtils.logout();
			return;
		} else {
			alert(message);
		}
		throw err.response;
	}
);

export default axiosClient;
