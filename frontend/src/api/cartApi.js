import axiosClient from "./axiosClient";

const cartApi = {
	addItem: (params) => axiosClient.put("cart/", params),
	removeItem: (id) => axiosClient.delete("cart/" + id),
	getCart: () => axiosClient.get("cart/"),
};

export default cartApi;
