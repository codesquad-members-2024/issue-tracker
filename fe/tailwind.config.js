/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	mode: "jit", //번들에 필요한 스타일만 빌드
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
			boxShadow: {
				modal: "5px 3px 20px 0px rgba(0,0,0,0.15)",
				dark: "0px 0px 15px 5px #14142B",
			},
			animation: {
				wiggle: "wiggle 1s ease-in-out infinite",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(-10deg)" },
					"50%": { transform: "rotate(10deg)" },
				},
			},
		},
	},
	plugins: [],
};
