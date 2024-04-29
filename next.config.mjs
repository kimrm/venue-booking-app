/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	env: {
		APP_URL: process.env.APP_URL,
		API_KEY: process.env.API_KEY,
	},
};

export default nextConfig;
