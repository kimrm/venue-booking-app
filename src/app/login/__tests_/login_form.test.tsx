import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserContext } from "@/context/UserContext";
import LoginForm from "../_components/form";

jest.mock("react", () => ({
	...jest.requireActual("react"),
	useContext: jest.fn(),
}));

jest.mock("@/hooks/api/useLogin", () => ({
	useLogin: jest.fn(),
}));

describe("LoginPage", () => {
	const setProfileMock = jest.fn();
	const mockLogin = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		// Setup the useContext and useLogin return values
		require("react").useContext.mockImplementation(() => ({
			profile: {},
			setProfile: setProfileMock,
		}));

		require("@/hooks/api/useLogin").useLogin.mockReturnValue({
			loading: false,
			error: null,
			data: null,
			login: mockLogin, // Use mockLogin here to track the call
		});

		render(
			<UserContext.Provider
				value={{ profile: undefined, setProfile: setProfileMock }}
			>
				<LoginForm />
			</UserContext.Provider>
		);
	});

	it("renders a form", () => {
		const form = screen.getByRole("form");

		expect(form).toBeInTheDocument();
	});

	it("submits the form with email and password", async () => {
		const emailInput = screen.getByLabelText(/your e-mail/i);
		const passwordInput = screen.getByLabelText(/your password/i);
		const submitButton = screen.getByRole("button", {
			name: /Log in/i,
		});

		// Simulate user input
		await userEvent.type(emailInput, "test@example.com");
		await userEvent.type(passwordInput, "password123");

		// Submit the form
		userEvent.click(submitButton);

		await waitFor(() => {
			expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
		});

		expect(setProfileMock).not.toHaveBeenCalled(); // Assuming no data returned yet
	});
});
