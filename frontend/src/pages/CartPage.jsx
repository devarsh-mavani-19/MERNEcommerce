import React from "react";
import { useEffect } from "react";
import cartApi from "../api/cartApi";
import { useState } from "react";
import orderApi from "../api/orderApi";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
	const [cart, setCart] = useState();
	const [total, setTotal] = useState(0);
	let navigate = useNavigate();
	useEffect(() => {
		const loadCart = async () => {
			try {
				let res = await cartApi.getCart();
				setCart(res);
				console.log(res);
			} catch (e) {
				console.log(e);
			}
		};
		loadCart();
	}, []);

	useEffect(() => {
		if (cart && cart.items) {
			let x = 0;
			cart.items.forEach((item) => {
				x += item.price * item.quantity;
			});
			setTotal(x);
		}
	}, [cart]);

	const deleteItem = async (id) => {
		try {
			console.log(id);
			await cartApi.removeItem(id);
			let newCart = { ...cart };
			newCart.items = newCart.items.filter((item) => {
				return item._id != id;
			});
			setCart(newCart);
		} catch (er) {
			console.log(er);
		}
	};

	const placeOrder = async () => {
		if (total == 0) {
			alert("Cant place order! There are no items in cart");
			return;
		}
		try {
			let order = await orderApi.placeOrder();
			alert("Order Placed Successfully your order id is " + order._id);
			setCart(undefined);
			navigate("/orders");
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<Navbar />
			<section className="bg-light my-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-9">
							<div className="card border shadow-0">
								<div className="m-4">
									<h4 className="card-title mb-4">
										Your shopping cart
									</h4>
									<div className="row gy-3 mb-4">
										{cart &&
											cart.items &&
											cart.items.map((item) => {
												return (
													<>
														<div
															key={item._id}
															className="col-lg-5"
														>
															<div className="me-lg-5">
																<div className="d-flex">
																	<img
																		src={
																			item
																				.product
																				.image
																		}
																		className="border rounded me-3"
																		style={{
																			width: "96px",
																			height: "96px",
																		}}
																	/>
																	<div className="">
																		<a
																			href="#"
																			className="nav-link"
																		>
																			{
																				item
																					.product
																					.name
																			}
																		</a>
																		<p className="text-muted">
																			{
																				item
																					.product
																					.category
																			}
																		</p>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
															<div className="">
																<input
																	style={{
																		width: "100px",
																	}}
																	className="form-select me-4"
																	value={
																		item.quantity
																	}
																	disabled
																/>
															</div>
															<div className="">
																<text className="h6">
																	$
																	{item.quantity *
																		item.price}
																</text>{" "}
																<br />
																<small className="text-muted text-nowrap">
																	{" "}
																	$
																	{
																		item.price
																	}{" "}
																	/ per item{" "}
																</small>
															</div>
														</div>
														<div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
															<div className="float-md-end">
																<button
																	onClick={() =>
																		deleteItem(
																			item._id
																		)
																	}
																	href="#"
																	className="btn btn-light border text-danger icon-hover-danger"
																>
																	{" "}
																	Remove
																</button>
															</div>
														</div>
													</>
												);
											})}
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-3">
							<div className="card shadow-0 border">
								<div className="card-body">
									<div className="d-flex justify-content-between">
										<p className="mb-2">Total price:</p>
										<p className="mb-2">${total}</p>
									</div>
									<div className="mt-3">
										<button
											href="#"
											onClick={placeOrder}
											className="btn btn-success w-100 shadow-0 mb-2"
										>
											{" "}
											Make Purchase{" "}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default CartPage;
