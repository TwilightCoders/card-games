import "styles/globals.css"
import { NavProvider } from "context/NavContext"
import NavBar from "components/NavBar"

function MyApp({ Component, pageProps }) {
	return (
		<NavProvider>
			<NavBar />
			<Component {...pageProps} />
		</NavProvider>
	)
}

export default MyApp
