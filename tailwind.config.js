const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Montserrat", ...(defaultTheme?.fontFamily?.sans || [])],
				headline: "Kalam, cursive",
			},
		},
	},
	variants: {
		extend: {
			ringWidth: ["hover", "active"],
		},
	},
	plugins: [],
}
