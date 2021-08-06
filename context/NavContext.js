import { createContext, useContext } from "react"

export const NavContext = createContext()

/**
 * Context provider wrapper component that controls the state of the nav bar for the App
 */
export function NavProvider(props) {
	const value = {}
	return <NavContext.Provider value={value} {...props} />
}

/**
 * Custom react hook to provide the value from the nav provider
 */
export function useNav() {
	const context = useContext(NavContext)
	if (!context) {
		throw new Error("useNav can only be used within a NavProvider")
	}
	return context
}
