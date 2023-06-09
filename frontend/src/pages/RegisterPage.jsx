import React from "react";
import { useState } from "react";
import authApi from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setconfirm] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		if (e && e.preventDefault) e.preventDefault();
		if (confirm != password) {
			alert("Your passwords do not match");
			return;
		}
		try {
			await authApi.signup({
				email,
				password,
			});
			alert("Success");
			navigate("/login");
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="container">
			<section className="vh-100 gradient-custom">
				<div className="container py-5 h-100">
					<div className="row justify-content-center align-items-center h-100">
						<div className="col-12 col-lg-9 col-xl-7">
							<div
								className="card shadow-2-strong card-registration"
								style={{ borderRadius: "15px" }}
							>
								<div className="card-body p-4 p-md-5">
									<h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
										Register
									</h3>
									<form onSubmit={handleSubmit}>
										<div className="mb-3">
											<label
												htmlFor="exampleInputEmail1"
												className="form-label"
											>
												Email address
											</label>
											<input
												type="email"
												value={email}
												onChange={(e) =>
													setEmail(e.target.value)
												}
												className="form-control"
												id="exampleInputEmail1"
												aria-describedby="emailHelp"
											/>
										</div>

										<div className="mb-3">
											<label
												htmlFor="exampleInputPassword1"
												className="form-label"
											>
												Password
											</label>
											<input
												value={password}
												onChange={(e) =>
													setPassword(e.target.value)
												}
												type="password"
												className="form-control"
												id="exampleInputPassword1"
											/>
										</div>

										<div className="mb-3">
											<label
												htmlFor="exampleInputPassword1"
												className="form-label"
											>
												Confirm Password
											</label>
											<input
												value={confirm}
												onChange={(e) =>
													setconfirm(e.target.value)
												}
												type="password"
												className="form-control"
												id="exampleInputPassword1"
											/>
										</div>

										<div className="mt-4 pt-2">
											<button
												className="btn btn-primary btn-lg"
												type="submit"
												value="Login"
												onClick={handleSubmit}
											>
												Register
											</button>
										</div>
									</form>
									<div className="text-center">
										<p>
											Alread a member?{" "}
											<Link to="/login">login</Link>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default RegisterPage;
