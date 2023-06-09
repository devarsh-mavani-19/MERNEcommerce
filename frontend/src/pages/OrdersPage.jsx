import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import orderApi from "../api/orderApi";

const OrdersPage = () => {
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		const loadOrders = async () => {
			try {
				let res = await orderApi.getAllOrders();
				console.log(res);
				setOrders(res);
			} catch (er) {
				console.log(er);
			}
		};
		loadOrders();
	}, []);
	return (
		<>
			<Navbar />
			<div className="container">
				<h3 className="mx-5 my-3">Order History</h3>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">OrderId</th>
							<th scope="col">No. of Items</th>
							<th scope="col">Total</th>
						</tr>
					</thead>
					<tbody>
						{orders &&
							orders.map((order) => (
								<tr key={order._id}>
									<td scope="row">{order._id}</td>
									<td>{order.items.length}</td>
									<td>{order.total}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default OrdersPage;
