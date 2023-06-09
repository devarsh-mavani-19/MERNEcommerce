import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { useParams } from "react-router-dom";
import productApi from "../api/productApi";

const CategoryPage = () => {
	const { id } = useParams();
	const [products, setproducts] = useState([]);
	useEffect(() => {
		const loadProducts = async () => {
			let res = await productApi.getAllByCategory(id);
			setproducts(res);
		};
		loadProducts();
	}, [id]);
	return (
		<>
			<Navbar />
			<div className="bg-primary">
				<div className="container py-4">
					<nav className="d-flex">
						<h6 className="mb-0">
							<a href="" className="text-white-50">
								Home
							</a>
							<span className="text-white-50 mx-2"> &gt; </span>
							<a href="" className="text-white-50">
								Category
							</a>
							<span className="text-white-50 mx-2"> &gt; </span>
							<a href="" className="text-white">
								<u>{id}</u>
							</a>
						</h6>
					</nav>
				</div>
			</div>
			<Products products={products} />
		</>
	);
};

export default CategoryPage;
