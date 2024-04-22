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
	},
};

export default nextConfig;
