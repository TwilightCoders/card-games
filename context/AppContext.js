// Libs
import * as React from "react"
import { createContext, useContext } from "react"

/**
 * @typedef {object} AppContext
 * @property {boolean} loading
 * @property {function} setLoading
 */

/** @type {React.Context<AppContext>} */
// @ts-ignore
export const AppContext = createContext(null) // Note, this is being @ts-ignored because we will never let a consumer of this context receive that null value

/**
 * Context provider wrapper component that controls the state of the nav bar for the App
 * @param {object} props The props passed to the component
 */
export function AppProvider(props) {
	// The user's session
	const [loading, setLoading] = React.useState(false)

	/** @type {AppContext} */
	const value = {
		loading,
		setLoading,
	}

	return <AppContext.Provider value={value} {...props} />
}

/**
 * Custom react hook to provide the value from the app provider
 *
 * @throws Note, this will throw an error if the context is falsy (indicating it was used within
 * the context provider written above)
 *
 * @returns {AppContext}
 */
export function useApp() {
	const context = useContext(AppContext)
	if (!context) {
		throw new Error("useApp can only be used within a AppProvider")
	}
	return context
}
