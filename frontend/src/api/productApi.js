import axiosClient from "./axiosClient";

const productApi = {
	getAll: () => axiosClient.get("products/"),
	getOne: (pid) => axiosClient.get(`products/${pid}`),
	getAllByCategory: (cName) => axiosClient.get(`products/category/${cName}`),
};

export default productApi;
