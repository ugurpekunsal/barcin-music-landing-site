/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				purple: {
					200: "#e9d8fd",
					600: "#805ad5",
					700: "#6b46c1",
				},
			},
			fontFamily: {
				sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
				mono: ["var(--font-geist-mono)", "monospace"],
			},
		},
	},
	plugins: [require("@tailwindcss/aspect-ratio")],
};
