import Head from "next/head"

const DefaultHead = ({ title }) => (
	<Head>
		<title>{`Card Game Scoreboard ${title ? ` - ${title}` : ""}`.trim()}</title>
	</Head>
)

/**
 * A basic content component that provides basic formatting for a responsive page layout, and a default
 * `<Head>` component if one is not provided.
 *
 * @param {object} props The props object
 * @param {JSX.Element} [props.head] An optional head component
 * @param {string} [props.title] The page title which will be provided to the default `<Head>` component if not provided
 * @param {string|JSX.Element} [props.children] The content to render
 */
export default function Content({ head, title, children } = {}) {
	return (
		<div className="max-w-7xl mx-auto pt-3 sm:px-8 lg:px-12">
			{head ? head : <DefaultHead title={title} />}
			{children}
		</div>
	)
}
