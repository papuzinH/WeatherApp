/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	theme: {
		extend: {
			backdropBlur: {
				xs: '2px',
			},
			backgroundColor: {
				'glass': 'rgba(255, 255, 255, 0.1)',
				'glass-dark': 'rgba(0, 0, 0, 0.1)',
			},
			colors: {
				'glass-border': 'rgba(255, 255, 255, 0.2)',
			},
		},
	},
	plugins: [],
};
