import axiosClient from "./axiosClient";

const orderApi = {
	getAllOrders: () => axiosClient.get("orders/"),
	placeOrder: () => axiosClient.post("orders/"),
};

export default orderApi;
