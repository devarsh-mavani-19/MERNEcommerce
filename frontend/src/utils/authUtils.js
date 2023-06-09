import { store } from "../store";
import { setUser } from "../store/userSlice";

const authUtils = {
	logout: () => {
		store.dispatch(
			setUser({
				isLoggedIn: false,
				email: "",
				token: "",
			})
		);
	},
	isAuthenticated: async () => {
		let user = store.getState().user.value;
		if (!user || !user["isLoggedIn"]) {
			return false;
		}
		return true;
	},
	getToken: async () => {
		let user = store.getState().user.value;
		if (!user || !user["token"]) {
			return "";
		}
		return user.token;
	},
};

export default authUtils;
