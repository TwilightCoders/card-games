// Libs
import * as React from "react"
import { createContext, useContext } from "react"

// Utilities
import { supabase } from "utils/supabaseClient"

// Types
/** @typedef {import("@supabase/supabase-js/src/index").Session} Session */
/** @typedef {import("@supabase/supabase-js/src/index").User} User */

/**
 * @typedef {object} UserContext
 * @property {Session|null} session
 * @property {User|null} user
 */
/** @type {UserContext} */
const initialUserContext = {
	session: null,
	user: null,
}

/**
 * The user context
 * @type {React.Context<UserContext>}
 */
export const UserContext = createContext(initialUserContext)

/**
 * Context provider wrapper component that controls the state of the nav bar for the App
 * @param {object} props The props passed to the component
 */
export function UserProvider(props) {
	// The user's session
	const [session, setSession] = React.useState(
		/** @type {import("@supabase/supabase-js").AuthSession | null} */ (null)
	)
	// The user
	const [user, setUser] = React.useState(
		/** @type {import("@supabase/supabase-js").AuthUser | null} */ (null)
	)

	/**
	 * Update the session if any state changes
	 */
	React.useEffect(() => {
		let ready = true

		// Initialize and save the session & user to state
		setSession(supabase.auth.session())
		setUser(supabase.auth.user())

		supabase.auth.onAuthStateChange((_event, session) => {
			if (ready) {
				// Update the session and user states
				setSession(session)
				setUser(session ? session.user : null)
			}
		})

		return () => {
			ready = false
		}
	}, [])

	// /**
	//  * Whenever the session changes, update the user
	//  */
	// React.useEffect(() => {
	// 	const sessionUser = supabase.auth.user()
	// 	if (session && sessionUser && (!user || sessionUser.id !== user.id)) {
	// 		setUser(sessionUser)
	// 	}
	// }, [session, user])

	/** @type {UserContext} */
	const value = {
		session,
		user,
	}

	return <UserContext.Provider value={value} {...props} />
}

/**
 * Custom react hook to provide the value from the nav provider
 */
export function useUser() {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error("useUser can only be used within a NavProvider")
	}
	return context
}
