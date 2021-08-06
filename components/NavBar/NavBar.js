// Libs
import * as React from "react"
import { useRouter } from "next/router"

// Components
import Link from "next/link"
import { Menu, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"

// Constants
const links = [
	{ title: "Game Types", to: "/#" },
	{ title: "New Game", to: "/new-game" },
	{ title: "Donate", to: "/#" },
]

/**
 * Render the app's NavBar. This will be displayed on the top of all pages.
 */
export default function NavBar() {
	/** Determine if the mobile nav bar is open or not */
	const [mobileNavOpen, setMobileNavOpen] = React.useState(false)

	/** The next.js router */
	const router = useRouter()

	/** Placeholder determining if the user is authenticated or not */
	const isUserLoggedIn = false

	/**
	 * Common class names that are shared between active and inactive links
	 * Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"
	 */
	const sharedLinkClassNames = "px-3 py-2 rounded-md text-sm font-medium"

	/** Default Link class for a page that is not active */
	const navLinkClass = `${sharedLinkClassNames} text-gray-300 hover:bg-gray-700 hover:text-white`

	/** Active Link class for a page that is active */
	const activeNavLinkClass = `${sharedLinkClassNames} bg-gray-400 text-white cursor-default`

	/**
	 * Get the Sign Up link
	 */
	const signUpLink = () => {
		const signUpPath = "/sign-up"
		const signUpText = "Sign Up"

		if (isUserLoggedIn) {
			return <SettingsMenu />
		} else if (router.pathname === signUpPath) {
			return <div className={activeNavLinkClass}>{signUpText}</div>
		} else {
			return (
				<Link href="/sign-up">
					<a className={navLinkClass}>{signUpText}</a>
				</Link>
			)
		}
	}

	return (
		<nav className="bg-gray-900">
			<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex items-center justify-between h-16">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						{/* Mobile menu button */}
						<button
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							aria-controls="mobile-menu"
							aria-expanded="false"
							onClick={() => setMobileNavOpen(bool => !bool)}
						>
							<span className="sr-only">Open main menu</span>
							<MenuIcon className={`${mobileNavOpen ? "block" : "hidden"} h-6 w-6`} />
							<XIcon className={`${mobileNavOpen ? "hidden" : "block"} h-6 w-6`} />
						</button>
					</div>

					{/* Main navigation */}
					<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
						<Link href="/">
							<a className="text-white text-xl hover:bg-gray-700 px-3 py-1 rounded-md">
								Card Games
							</a>
						</Link>
						<div className="hidden sm:block sm:ml-6">
							<div className="flex space-x-4">
								{links.map(({ title, to }, index) => {
									const current = router.pathname === to
									const key = `${title}-${index}`
									return current ? (
										<div className={activeNavLinkClass} key={key}>
											{title}
										</div>
									) : (
										<Link href={to} key={key}>
											<a className={current ? activeNavLinkClass : navLinkClass}>{title}</a>
										</Link>
									)
								})}
							</div>
						</div>
					</div>

					{/* Settings menu */}
					{signUpLink()}
				</div>
			</div>
		</nav>
	)
}

/**
 * Renders the settings menu.
 */
function SettingsMenu() {
	/**
	 * Get the CSS class names for a menu item while taking into account if it is active
	 * @param {boolean} active Whether the menu item is active
	 * @returns {string} The CSS class names for the menu item
	 */
	const getClassNames = active =>
		`${
			active ? "bg-gray-700 text-white" : "text-gray-700"
		} block px-4 py-1 mx-2 my-1 text-sm rounded-md hover:bg-gray-700 hover:text-white`

	return (
		<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
			{/* <!-- Profile dropdown --> */}
			<Menu as="div" className="ml-3 relative">
				<Menu.Button className="bg-red-800 flex p-2 text-white text-sm rounded-full focus:outline-none hover:ring-2 active:ring-2 ring-offset-2 ring-offset-gray-800 ring-white">
					CG
				</Menu.Button>
				<Transition
					as={React.Fragment}
					enter="transition duration-100 ease-out"
					enterFrom="transform scale-95 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition duration-75 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-95 opacity-0"
				>
					<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200">
						<div className="py-2">
							<Menu.Item>
								{({ active }) => (
									<Link href="/account-settings">
										<a className={getClassNames(active)}>Your Profile</a>
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link href="/account-settings">
										<a className={getClassNames(active)}>Settings</a>
									</Link>
								)}
							</Menu.Item>
						</div>
						<div className="py-2">
							<Menu.Item>
								{({ active }) => (
									<Link href="/account-settings">
										<a className={getClassNames(active)}>Sign out</a>
									</Link>
								)}
							</Menu.Item>
						</div>
						{/* <Menu.Item disabled>
							<span className="opacity-75 block px-4 py-2 text-sm text-gray-700">
								Invite a friend (coming soon!)
							</span>
						</Menu.Item> */}
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	)
}
