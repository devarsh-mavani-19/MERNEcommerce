import { cleanup, render, screen } from "../../tests/test-setup";
import { store } from "../../store";
import RegisterPage from "../RegisterPage";
import React from "react";

afterEach(() => {
	cleanup();
});

describe("Register component", () => {
	it("should render Register component correctly", () => {
		render(<RegisterPage />, {}, store);
		const element = screen.getByText("Register");
		expect(element).toBeInTheDocument();
	});
});
