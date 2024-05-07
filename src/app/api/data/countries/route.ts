import { countries } from "@/vars/countries";

export async function GET() {
	return new Response(JSON.stringify(countries), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
