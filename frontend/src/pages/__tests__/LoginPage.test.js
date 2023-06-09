import { cleanup, render, screen } from "../../tests/test-setup";
import LoginPage from "../LoginPage";
import { store } from "../../store";
import React from "react";

afterEach(() => {
	cleanup();
});

describe("Login component", () => {
	it("should render Login component correctly", () => {
		render(<LoginPage />, {}, store);
		const element = screen.getByText("Login");
		expect(element).toBeInTheDocument();
	});
});
