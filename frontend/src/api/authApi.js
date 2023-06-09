import axiosClient from "./axiosClient";

const authApi = {
	signup: (params) => axiosClient.post("auth/register", params),
	login: (params) => axiosClient.post("auth/login", params),
};

export default authApi;
