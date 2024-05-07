/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "selector",
	theme: {
		extend: {
			colors: {
				"grayscale.50": "#FEFEFE",
				"grayscale.100": "#F7F7FC",
				"grayscale.200": "#EFF0F6",
				"grayscale.300": "#D9DBE9",
				"grayscale.400": "#BEC1D5",
				"grayscale.500": "#A0A3BD",
				"grayscale.600": "#6E7191",
				"grayscale.700": "#4E4B66",
				"grayscale.800": "#2A2A44",
				"grayscale.900": "#14142B",
				"accent.blue": "#007AFF",
				"accent.navy": "#0025E6",
				"accent.red": "#FF3B30",
			},
		},
	},
	plugins: [],
};
