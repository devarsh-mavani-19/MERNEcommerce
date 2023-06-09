import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedPage() {
	let user = useSelector((state) => state.user.value);
	if (!user.isLoggedIn) {
		return <Navigate to={"/login"} />;
	}
	return (
		<div>
			<Outlet />
		</div>
	);
}

export default ProtectedPage;
