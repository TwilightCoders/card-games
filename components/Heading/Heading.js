/**
 * The H1 heading component
 * @param {object} props    The props for the heading
 * @param {string|JSX.Element|JSX.Element[]} props.children The children for the heading
 * @param {boolean} [props.center] Whether to center the heading
 */
export const H1 = ({ children, center }) => (
	<h1
		className={`text-6xl leading-10 font-headline mt-4 font-extrabold tracking-tight text-gray-900 ${
			center ? "text-center" : ""
		} sm:text-5xl`.trim()}
	>
		{children}
	</h1>
)

/**
 * The H2 heading component
 * @param {object} props    The props for the heading
 * @param {string|JSX.Element|JSX.Element[]} props.children The children for the heading
 * @param {boolean} [props.center] Whether to center the heading
 */
export const H2 = ({ children, center }) => (
	<h1
		className={`text-2xl leading-8 mt-2 font-extrabold tracking-tight text-gray-900 ${
			center ? "text-center" : ""
		} sm:text-3xl`.trim()}
	>
		{children}
	</h1>
)
