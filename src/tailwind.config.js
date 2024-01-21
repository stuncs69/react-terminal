/** @type {import('tailwindcss').Config} */
export default {
    content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	  ],
  theme: {
	animation: {
		blink: 'blinking 1s infinite'
	},
    extend: {
		spacing: {
			'half': '50%'
		},
		keyframes: {
			blinking: {
				'0%, 49%': {
					opacity: 100
				},
				'50%, 100%': {
					opacity: 0
				}
			}
		}
	},
  },
  plugins: [],
}

