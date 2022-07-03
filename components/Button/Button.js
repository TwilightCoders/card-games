/** @typedef {"button"|"div"|"a"} ElementType */
/** @typedef {"button" | "submit" | "reset"} ButtonType */
/** @typedef {"primary"|"secondary"|"success"|"warning"|"danger"|"flat"} ButtonColors */

/**
 * Button component
 *
 * @param {object} props
 * @param {React.ReactNode} [props.children] - The content of the button
 * @param {ElementType} [props.as] - The element to render the button as
 * @param {ButtonType} [props.type] - The type of button
 * @param {boolean} [props.full] - Whether the button should be displayed as a block
 * @param {boolean} [props.loading] - Whether the button should be displayed as loading
 * @param {ButtonColors} [props.color] - The color of the button
 * @param {boolean} [props.disabled] - Whether the button should be disabled
 */
export default function Button({ children, as, type, full, loading, color, disabled, ...props }) {
	const Element = type || !as ? "button" : as

	// A function that will return tailwind colors for the button based on the color prop
	const getColors = () => {
		switch (color) {
			case "primary":
				return "bg-blue-600 shadow-md active:shadow-none focus:ring-blue-600 hover:bg-blue-800 hover:active:ring-blue-900 text-white"
			case "success":
				return "bg-green-500 shadow-md focus:ring-green-500 hover:bg-green-700 hover:active:ring-green-800 text-white"
			case "warning":
				return "bg-orange-500 shadow-md focus:ring-orange-500 hover:bg-orange-700 hover:active:ring-orange-800 text-white"
			case "danger":
				return "bg-red-500 shadow-md focus:ring-red-500 hover:bg-red-700 hover:active:ring-red-800 text-white"
			case "flat":
				return "bg-white shadow-none focus:ring-gray-900 hover:active:ring-gray-900 text-gray-900"
			case "secondary":
			default:
				return "bg-gray-500 shadow-md focus:ring-gray-500 hover:bg-gray-700 hover:active:ring-gray-800 text-white"
		}
	}

	const pendingContent = typeof children === "string" ? "Pending" : children

	return (
		<Element
			className={
				`rounded-md my-2 py-2 px-4 text-center font-bold mt-4 transition-all duration-150 ` +
				`${getColors()} ring-offset-2 ring-opacity-60 focus:ring-4 focus:outline-none ` +
				`${full ? "block" : "inline-block"}`.trim()
			}
			{...(Element === "button" ? { type } : {})}
			disabled={disabled}
			{...props}
		>
			{loading ? (
				<svg
					className={`animate-spin -ml-1 mr-3 h-5 w-5 ${
						color && ["flat"].includes(color) ? "text-gray-900" : "text-white"
					} inline-block`}
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			) : null}
			{loading ? pendingContent : children}
		</Element>
	)
}
