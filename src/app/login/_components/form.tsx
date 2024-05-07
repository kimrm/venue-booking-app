"use client";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext, UserContextType } from "@/context/UserContext";
import Link from "next/link";
import { useLogin } from "@/hooks/api/useLogin";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginData, setLoginData] = useState({ email: "", password: "" });

	const { profile, setProfile } =
		useContext<UserContextType | undefined>(UserContext) || {};
	const { loading, error, data } = useLogin(loginData);

	useEffect(() => {
		if (data) {
			if ("error" in data) {
				return;
			}

			setProfile && setProfile(data);
			window.location.href = "/?toast=login-successful";
		}
	}, [data, setProfile]);

	async function handleSubmit() {
		setLoginData({ email: email, password: password });
	}

	function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
		setEmail(event.target.value);
	}

	function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
		setPassword(event.target.value);
	}

	return (
		<form action={handleSubmit}>
			<div className="mb-3">
				<label htmlFor="email" className="mb-2 block">
					Your e-mail
				</label>
				<input
					className="mb-2 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
					type="email"
					name="email"
					id="email"
					onChange={handleEmailChange}
					value={email}
					required
					autoComplete="email"
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="password" className="mb-2 block">
					Your password
				</label>
				<input
					className="mb-2 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
					type="password"
					name="password"
					id="password"
					onChange={handlePasswordChange}
					value={password}
					required
					autoComplete="current-password"
				/>
			</div>

			{!loading && error && (
				<div className="mb-2 rounded-lg p-2 text-sm tracking-wide text-red-500 ">
					<strong>Whoops! That didn&apos;t work.</strong>
					<p>
						It seems, either your password was wrong, or there is no user with
						that e-mail. If you don&apos;t have an account, you can{" "}
						<Link className="font-bold underline" href="/signup">
							sign up
						</Link>
					</p>
				</div>
			)}
			<button
				className={`rounded-xl bg-yellow-300 px-4 py-2 transition-all duration-300 hover:scale-105 hover:bg-yellow-400 ${loading && "bg-gray-300 hover:bg-gray-300"}`}
				type="submit"
				disabled={loading}
			>
				{loading ? "Please wait..." : "Log in"}
			</button>
		</form>
	);
}
