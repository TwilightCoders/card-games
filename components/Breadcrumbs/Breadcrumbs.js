import Link from "next/link"

/** Divider between breadcrumbs */
const Divider = () => (
	<svg className="h-5 w-auto text-gray-400" fill="currentColor" viewBox="0 0 20 20">
		<path
			fillRule="evenodd"
			d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
			clipRule="evenodd"
		/>
	</svg>
)

/**
 * @typedef {object} Breadcrumb
 * @property {string} pathname The pathname of the breadcrumb link
 * @property {string} title The title of the breadcrumb link
 */

/**
 * Renders breadcrumbs from a `breadcrumbs` array.
 * @param {object} props The props object.
 * @param {Breadcrumb[]} props.breadcrumbs The array of objects containing a path and title to render the beadcrumbs with
 */
export default function Breadcrumbs({ breadcrumbs }) {
	// Throw an error if breadcrumbs isn't an array
	if (!Array.isArray(breadcrumbs)) {
		throw new Error("Breadcrumbs must be an array.")
	}

	// Return null if breadcrumbs is empty or only 1 breadcrumb
	if (!breadcrumbs.length || breadcrumbs.length === 1) {
		return null
	}

	return (
		<ul className="flex text-gray-500 text-sm lg:text-base">
			{breadcrumbs.map(({ pathname, title }, index) => (
				<li key={pathname} className="inline-flex items-center">
					{index > 0 ? <Divider /> : null}
					<Link href={pathname}>
						<a>{title}</a>
					</Link>
				</li>
			))}
			{/* <li className="inline-flex items-center">
				<Link href="/">
					<a>Home</a>
				</Link>
			</li>
			<li className="inline-flex items-center">
				<a href="/components">Components</a>
				<svg className="h-5 w-auto text-gray-400" fill="currentColor" viewBox="0 0 20 20">
					<path
						fillRule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clipRule="evenodd"
					/>
				</svg>
			</li>
			<li className="inline-flex items-center">
				<a href="#" className="text-teal-400">
					Breadcrumb
				</a>
			</li> */}
		</ul>
	)
}
