// Components
import { UserProvider } from "context/UserContext"
import NavBar from "components/NavBar"

// Styles
import "styles/globals.css"

/**
 * When given a component and pageProps, it will render the component with these props to the page,
 * along with global JSX elements such as the nav bar, and any providers.
 *
 * @param {import("next/app").AppProps} props
 */
function MyApp({ Component, pageProps }) {
	return (
		<UserProvider>
			<NavBar />
			<Component {...pageProps} />
		</UserProvider>
	)
}

export default MyApp
