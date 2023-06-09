import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice";
import categoryApi from "../api/categoryApi";

const Navbar = () => {
	const [categories, setcategories] = useState([]);
	let auth = useSelector((state) => state.user.value);
	let dispatch = useDispatch();
	let navigate = useNavigate();
	const handleLogout = () => {
		dispatch(
			setUser({
				email: "",
				token: "",
				isLoggedIn: false,
			})
		);
		navigate("/login");
	};

	useEffect(() => {
		const loadCategories = async () => {
			try {
				let res = await categoryApi.getAll();
				setcategories(res);
			} catch (e) {
				console.log(e);
			}
		};
		loadCategories();
	}, []);

	return (
		<>
			<div className="p-3 text-center bg-white border-bottom">
				<div className="container">
					<div className="row gy-3">
						<div className="col-lg-2 col-sm-4 col-4">
							<a href="#" className="float-start">
								<h3>Devarsh</h3>
							</a>
						</div>
						<div className="order-lg-last col-lg-10 col-sm-8 col-8">
							{auth.isLoggedIn ? (
								<div className="d-flex float-end">
									<button
										onClick={handleLogout}
										href="https://github.com/mdbootstrap/bootstrap-material-design"
										className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
									>
										{" "}
										<i className="fas fa-user-alt m-1 me-md-2"></i>
										<p className="d-none d-md-block mb-0">
											Logout
										</p>{" "}
									</button>
									<Link
										to={"/orders"}
										className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
									>
										{" "}
										<i className="fas fa-heart m-1 me-md-2"></i>
										<p className="d-none d-md-block mb-0">
											Orders
										</p>{" "}
									</Link>
									<Link
										to={"/cart"}
										className="border rounded py-1 px-3 nav-link d-flex align-items-center"
									>
										{" "}
										<i className="fas fa-shopping-cart m-1 me-md-2"></i>
										<p className="d-none d-md-block mb-0">
											My cart
										</p>{" "}
									</Link>
								</div>
							) : (
								<div className="d-flex float-end">
									<Link
										to={"/login"}
										className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
									>
										{" "}
										<i className="fas fa-user-alt m-1 me-md-2"></i>
										<p className="d-none d-md-block mb-0">
											Login
										</p>{" "}
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<nav className="navbar navbar-expand-lg navbar-light bg-white">
				<div className="container justify-content-center justify-content-md-between">
					<button
						className="navbar-toggler border py-2 text-dark"
						type="button"
						data-mdb-toggle="collapse"
						data-mdb-target="#navbarLeftAlignExample"
						aria-controls="navbarLeftAlignExample"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<i className="fas fa-bars"></i>
					</button>

					<div
						className="collapse navbar-collapse"
						id="navbarLeftAlignExample"
					>
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link
									className="nav-link text-dark"
									aria-current="page"
									to={"/"}
								>
									Home
								</Link>
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="#"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									Shop By Categories
								</a>
								{categories && (
									<ul
										className="dropdown-menu"
										aria-labelledby="navbarDropdown"
									>
										{categories.map((cat) => {
											return (
												<li key={cat}>
													<Link
														to={`/category/${cat}`}
														className="dropdown-item"
														href="#"
													>
														{cat}
													</Link>
												</li>
											);
										})}
									</ul>
								)}
							</li>
						</ul>
					</div>
				</div>
			</nav>
			
		</>
	);
};

export default Navbar;
