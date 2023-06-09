import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { store as customStore } from "../store";
import { BrowserRouter } from "react-router-dom";

const render = (
	ui,
	{ initialState = {}, store = customStore, ...renderOptions } = {}
) => {
	console.log(initialState);
	const Wrapper = ({ children }) => (
		<BrowserRouter>
			<Provider store={store}>{children}</Provider>
		</BrowserRouter>
	);
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// Re-export everything from React Testing Library
export * from "@testing-library/react";

// Override the render method exported by React Testing Library
export { render };
