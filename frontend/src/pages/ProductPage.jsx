import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import productApi from "../api/productApi";
import { useState } from "react";
import cartApi from "../api/cartApi";
import Navbar from "../components/Navbar";

const ProductPage = () => {
	let { id } = useParams();
	const [product, setProduct] = useState();
	const [amount, setAmount] = useState(1);
	useEffect(() => {
		const getProduct = async () => {
			try {
				let res = await productApi.getOne(id);
				setProduct(res);
			} catch (e) {
				console.log(e);
			}
		};
		getProduct();
	}, []);

	const handleAddToCart = async () => {
		if (amount == 0) {
			alert("You have entered 0 amount");
			return;
		}
		try {
			await cartApi.addItem({
				productId: id,
				price: product.price,
				quantity: amount,
			});
			alert("Item added to cart");
			setAmount(1);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<Navbar />
			{product ? (
				<section className="py-5">
					<div className="container">
						<div className="row gx-5">
							<aside className="col-lg-6">
								<div className="border rounded-4 mb-3 d-flex justify-content-center">
									<a
										data-fslightbox="mygalley"
										className="rounded-4"
										data-type="image"
										href="#"
									>
										<img
											style={{
												maxWidth: "100%",
												maxHeight: "100vh",
												margin: "auto",
											}}
											className="rounded-4 fit"
											src={product.image}
										/>
									</a>
								</div>
							</aside>
							<main className="col-lg-6">
								<div className="ps-lg-3">
									<h4 className="title text-dark">
										{product.name}
									</h4>

									<div className="mb-3">
										<span className="h5">
											${product.price}
										</span>
									</div>

									<p>{product.description}</p>

									<div className="row">
										<dt className="col-3">Category:</dt>
										<dd className="col-9">
											{product.category}
										</dd>
									</div>

									<hr />

									<div className="row mb-4">
										<div className="col-md-4 col-6 mb-3">
											<label className="mb-2 d-block">
												Quantity
											</label>
											<div
												className="input-group mb-3"
												style={{ width: "170px" }}
											>
												<button
													className="btn btn-white border border-secondary px-3"
													type="button"
													id="button-addon1"
													data-mdb-ripple-color="dark"
													onClick={() => {
														if (amount == 1) return;
														setAmount(amount - 1);
													}}
												>
													<i className="fas fa-minus"></i>
												</button>
												<input
													type="text"
													className="form-control text-center border border-secondary"
													value={amount}
													aria-label="Example text with button addon"
													aria-describedby="button-addon1"
												/>
												<button
													className="btn btn-white border border-secondary px-3"
													type="button"
													id="button-addon2"
													data-mdb-ripple-color="dark"
													onClick={() => {
														setAmount(amount + 1);
													}}
												>
													<i className="fas fa-plus"></i>
												</button>
											</div>
										</div>
									</div>
									<button
										href="#"
										className="btn btn-primary shadow-0"
										onClick={handleAddToCart}
									>
										{" "}
										<i className="me-1 fa fa-shopping-basket"></i>{" "}
										Add to cart{" "}
									</button>
								</div>
							</main>
						</div>
					</div>
				</section>
			) : null}
		</>
	);
};

export default ProductPage;
