import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CategoryPage from "../pages/CategoryPage";
import CartPage from "../pages/CartPage";
import RegisterPage from "../pages/RegisterPage";
import OrdersPage from "../pages/OrdersPage";
import ProtectedPage from "../components/ProtectedRoute";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "/cart",
		element: <ProtectedPage />,
		children: [
			{
				path: "",
				element: <CartPage />,
			},
		],
	},
	{
		path: "/orders",
		element: <ProtectedPage />,
		children: [
			{
				path: "",
				element: <OrdersPage />,
			},
		],
	},
	{
		path: "/category/:id",
		element: <CategoryPage />,
	},
	{
		path: "/product/:id",
		element: <ProductPage />,
	},
]);

export default router;
