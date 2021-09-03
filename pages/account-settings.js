// Libraries
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/router"

// Components
import { Formik, Form, Field } from "formik"
import Content from "components/Content"
import Button from "components/Button"
import { H1 } from "components/Heading"

// Hooks
import { useUser } from "context/UserContext"

// Supabase
import { supabase } from "utils/supabaseClient"

export default function AccountSettings() {
	// Get the session and user from the user context
	const { user, session } = useUser()

	// Get the router
	const router = useRouter()

	const [loading, setLoading] = useState(true)
	const [username, setUsername] = useState(null)

	// Redirect the user to the login page if they are not logged in
	useEffect(() => {
		if (!session) {
			router.push("/sign-in")
		}
	})

	// Load the profile from the database
	useEffect(() => {
		async function getProfile() {
			if (user?.id) {
				try {
					setLoading(true)

					let { data, error, status } = await supabase
						.from("profiles")
						.select("username")
						.eq("id", user.id)
						.limit(1)

					if (error && status !== 406) {
						throw error
					}

					if (data && data.length > 0) {
						setUsername(data.shift().username)
					}
				} catch (error) {
					console.error(error.message)
				} finally {
					setLoading(false)
				}
			}
		}

		getProfile()
	}, [session, user?.id])

	/**
	 *
	 * @param {string} username
	 */
	async function updateProfile(username) {
		try {
			setLoading(true)
			const user = supabase.auth.user()

			const updates = {
				id: user?.id,
				username,
				updated_at: new Date(),
			}

			let { error } = await supabase.from("profiles").upsert(updates, {
				returning: "minimal", // Don't return the value after inserting
			})

			if (error) {
				throw error
			}
		} catch (error) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	// Convert the stored created date into a useful string
	const createdDate = useMemo(
		() => (user?.confirmed_at ? new Date(user?.confirmed_at) : undefined),
		[user?.confirmed_at]
	)

	return (
		<Content>
			<H1>Account Settings</H1>
			{user !== null && !loading ? (
				<div className="grid grid-flow-row md:gap-4 md:grid-flow-col border bg-gray-100 p-4 mt-4 rounded-md">
					<Formik
						initialValues={{
							email: user.email,
							username: username || "",
						}}
						onSubmit={(values, { setSubmitting }) => {
							updateProfile(values.username).finally(() => setSubmitting(false))
						}}
					>
						{({ isSubmitting, values }) => (
							<Form className="mt-2">
								<label htmlFor="email" className="block text-xl font-bold">
									Your Email
								</label>
								<Field
									type="email"
									name="email"
									placeholder="Email"
									disabled
									value={values?.email}
									className="mt-2 border-gray-400 border cursor-not-allowed w-full rounded-md p-2"
								/>

								<label htmlFor="username" className="mt-4 block text-xl font-bold">
									Your Username
								</label>
								<Field
									type="text"
									name="username"
									placeholder="User Name"
									value={values?.username}
									className="mt-2 border-gray-400 border w-full rounded-md p-2"
								/>
								<Button type="submit" color="primary" full loading={isSubmitting}>
									Save
								</Button>
							</Form>
						)}
					</Formik>

					<div className="-mt-2 mb-2 row-start-1 md:row-start-auto">
						<div className="bg-white border border-gray-300 shadow rounded-lg w-full p-4 mt-2">
							<div className="font-bold">Account Created:</div>
							<div>
								{createdDate?.toLocaleDateString(undefined, {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								}) ?? "Unknown"}
							</div>
						</div>
					</div>
				</div>
			) : (
				<>Loading...</>
			)}
		</Content>
	)
}
