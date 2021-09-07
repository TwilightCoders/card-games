// Context
import { UserProvider } from "context/UserContext"
import { AppProvider } from "context/AppContext"

// Components
import NavBar from "components/NavBar"
import LoadingOverlay from "components/LoadingOverlay"

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
		<AppProvider>
			<UserProvider>
				<NavBar />
				<Component {...pageProps} />
				<LoadingOverlay />
			</UserProvider>
		</AppProvider>
	)
}

export default MyApp
