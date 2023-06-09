import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "../components/Products";
import { useState } from "react";
import { useEffect } from "react";
import productApi from "../api/productApi";

const Home = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const loadProducts = async () => {
			try {
				let res = await productApi.getAll();
				setProducts(res);
			} catch (e) {
				console.log(e);
			}
		};
		loadProducts();
	}, []);
	return (
		<>
			<Navbar />
			<Hero />
			<Products products={products} />
		</>
	);
};

export default Home;
