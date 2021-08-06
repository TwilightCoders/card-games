// Components
import Head from "next/head"
import Breadcrumbs from "components/Breadcrumbs"

/**
 * A <Head> component that will render for the page if one was not provided to Content
 *
 * @param {object} props The props passed to the component
 * @param {string} [props.title] The title to be appended to the <title> tag
 */
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
 * @param {import("components/Breadcrumbs/Breadcrumbs").Breadcrumb[]} [props.breadcrumbs] An array of breadcrumb objects used to render a series of links to iterate back throug the pages
 * @param {string|JSX.Element|JSX.Element[]} [props.children] The content to render
 */
export default function Content({ head, title, breadcrumbs, children } = {}) {
	return (
		<div className="max-w-7xl mx-auto pt-3 sm:px-8 lg:px-12">
			{head ? head : <DefaultHead title={title} />}
			{breadcrumbs ? <Breadcrumbs breadcrumbs={breadcrumbs} /> : null}
			{children}
		</div>
	)
}
