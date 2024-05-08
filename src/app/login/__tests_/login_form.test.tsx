import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoginForm from "@/app/login/_components/form";

describe("LoginForm", () => {
	it("renders a form", () => {
		render(<LoginForm />);

		const form = screen.getByRole("form");

		expect(form).toBeInTheDocument();
	});
});
