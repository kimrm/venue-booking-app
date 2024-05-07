import { NextRequest, NextResponse } from "next/server";

export const config = {
	matcher: ["/profile"],
};

export function middleware(request: NextRequest) {
	let cookie = request.cookies.get("accesstoken")?.value;
	if (!cookie) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
}
