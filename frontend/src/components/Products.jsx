import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products }) => {
	return (
		<div className="d-flex justify-content-center align-items-center flex-wrap">
			<section>
				<div className="container my-5">
					<header className="mb-4">
						<h3>New products</h3>
					</header>

					<div className="row">
						{products &&
							products.map((product) => {
								return (
									<div
										key={product._id}
										className="col-lg-3 col-md-6 col-sm-6 d-flex"
									>
										<div className="card w-100 my-2 shadow-2-strong">
											<img
												src={product.image}
												className="card-img-top"
											/>
											<div className="card-body d-flex flex-column">
												<h5 className="card-title">
													{product.name}
												</h5>
												<p className="card-text">
													${product.price}
												</p>
												<div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
													<Link
														to={`/product/${product._id}`}
														className="btn btn-primary shadow-0 me-1"
													>
														View Details
													</Link>
												</div>
											</div>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</section>
		</div>
	);
};

export default Products;
