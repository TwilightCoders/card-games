/**
 * The H1 heading component
 * @param {object} props    The props for the heading
 * @param {string|JSX.Element|JSX.Element[]} props.children The children for the heading
 * @param {boolean} [props.center] Whether to center the heading
 */
export const H1 = ({ children, center }) => (
	<h1
		className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 ${
			center ? "text-center" : ""
		} sm:text-4xl`}
	>
		{children}
	</h1>
)
