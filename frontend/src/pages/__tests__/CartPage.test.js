import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "../../tests/test-setup";
import { store } from "../../store";
import CartPage from "../CartPage";
import React from "react";

afterEach(() => {
	cleanup();
});

describe("Cart component", () => {
	it("should render Cart component correctly", () => {
		render(<CartPage />, {}, store);
		const element = screen.getByText("Place Order");
		expect(element).toBeInTheDocument();
	});

	it("Check for empty cart", async () => {
		render(<CartPage />, {}, store);
		const button = screen.getByRole("button", { name: "Place Order" });

		const mockAlert = jest.spyOn(window, "alert");
		mockAlert.mockImplementation(() => {});

		expect(button).toBeInTheDocument();
		fireEvent.click(button);
		await waitFor(async () => {});

		expect(mockAlert).toHaveBeenCalledTimes(1);
	});
});
