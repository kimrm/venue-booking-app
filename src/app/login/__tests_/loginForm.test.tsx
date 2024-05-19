import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../_components/loginForm";

jest.mock("@/hooks/api/useLogin", () => ({
	useLogin: jest.fn(),
}));

describe("LoginForm", () => {
	jest.clearAllMocks();

	const mockLogin = jest.fn();

	const mockEmail = "test@example.com";
	const mockPassword = "password123";

	beforeEach(() => {
		require("@/hooks/api/useLogin").useLogin.mockReturnValue({
			loading: false,
			error: null,
			data: null,
			login: mockLogin,
		});

		render(<LoginForm />);
	});
	it("should render a form", () => {
		const form = screen.getByRole("form");
		expect(form).toBeInTheDocument();
	});

	it("should submit the form with email and password", async () => {
		const emailInput = screen.getByLabelText(/your e-mail/i);
		const passwordInput = screen.getByLabelText(/your password/i);
		const submitButton = screen.getByRole("button", {
			name: /Log in/i,
		});

		await userEvent.type(emailInput, mockEmail);
		await userEvent.type(passwordInput, mockPassword);

		userEvent.click(submitButton);

		await waitFor(() => {
			expect(mockLogin).toHaveBeenCalledWith(mockEmail, mockPassword);
		});
	});
});
