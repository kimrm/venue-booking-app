import LoginForm from "@/components/LoginForm";
import { permanentRedirect } from "next/navigation";

export default function LoginPage() {
	async function success() {
		"use server";
		permanentRedirect("/");
	}
	return (
		<div className="flex min-h-full flex-grow items-center ">
			<div className="mx-auto w-full bg-slate-100 p-10 sm:rounded-xl lg:mx-auto lg:w-1/2">
				<h1 className="mb-10 font-serif text-2xl font-bold">
					Log in to start your journey
				</h1>
				<LoginForm success={success} />
				<p className="mt-5">
					Don&apos;t have an account yet?{" "}
					<a href="/signup" className="text-orange-400">
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
}
