import Link from "next/link"

/**
 * A Next.js Link component that can be used to navigate to a new page, while passing additional
 * provided props to the underlying anchor tag.
 *
 * @see https://github.com/tailwindlabs/headlessui/issues/20#issuecomment-701482746
 * @see https://github.com/tailwindlabs/headlessui/blob/24725216e4e2fb9280bdf3b96583a9fe573410e4/packages/%40headlessui-react/pages/menu/menu-with-framer-motion.tsx#L71-L78
 *
 * @param {React.AnchorHTMLAttributes<HTMLAnchorElement>} props
 */
export default function NextLink({ href = "", children, ...rest }) {
	return (
		<Link href={href}>
			<a {...rest}>{children}</a>
		</Link>
	)
}
