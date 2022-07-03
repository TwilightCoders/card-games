// Libraries
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/router"
import * as Yup from "yup"

// Components
import { Formik, Form, Field } from "formik"
import Content from "components/Content"
import Button from "components/Button"
import { H1 } from "components/Heading"

// Hooks
import { useUser } from "context/UserContext"
import { useApp } from "context/AppContext"

// Constants
/**
 * @typedef {object} DateFormat
 * @property {"long"|"short"|"narrow"|undefined} weekday
 * @property {"long"|"short"|"narrow"|undefined} month
 * @property {"numeric"|"2-digit"|undefined} year
 * @property {"numeric"|"2-digit"|undefined} day
 */
/** @type {DateFormat} */
const PREFERRED_DATE_FORMAT = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
}

// Validation
Yup.addMethod(Yup.string, "noWhitespace", function noWhitespace() {
	return this.transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value))
})
const validationSchema = Yup.object().shape({
	username: Yup.string().min(5).max(20).noWhitespace().required("Required"),
})

// Supabase
import { supabase } from "utils/supabaseClient"

export default function AccountSettings() {
	// Get the session and user from the user context
	const { user, session, initialized } = useUser()

	// Get the router
	const router = useRouter()

	const { setLoading } = useApp()
	const [username, setUsername] = useState(null)

	// Redirect the user to the login page if they are not logged in
	useEffect(() => {
		if (initialized && (!session || !user)) {
			router.push("/sign-in")
		}
	}, [initialized, router, session, user])

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
					console.error("Could not get the profile", error.message)
				} finally {
					setTimeout(() => setLoading(false), 500)
				}
			}
		}

		getProfile()
	}, [session, setLoading, user?.id])

	/**
	 *
	 * @param {string} username
	 */
	async function updateProfile(username) {
		try {
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
		}
	}

	// Convert the stored created date into a useful string
	const createdDate = useMemo(
		() => (user?.confirmed_at ? new Date(user?.confirmed_at) : undefined),
		[user?.confirmed_at]
	)

	// Convert the stored last_sign_in_at date into a useful string
	const lastSignInDate = useMemo(
		() => (user?.last_sign_in_at ? new Date(user?.last_sign_in_at) : undefined),
		[user?.last_sign_in_at]
	)

	return (
		<Content>
			<H1>Account Settings</H1>
			{user !== null ? (
				<div className="grid grid-flow-row md:gap-4 md:grid-flow-col border bg-gray-100 p-4 mt-4 rounded-md">
					<Formik
						initialValues={{
							email: user.email,
							username: username || "",
						}}
						onSubmit={(values, { setSubmitting }) => {
							updateProfile(values.username).finally(() => setSubmitting(false))
						}}
						key={username}
					>
						{({ isSubmitting, values, errors, touched, isValid }) => (
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
									validate={(/** @type {string} */ value) => {
										// Return an error if the username is not a string with only letters or numbers, and is at least 5 characters long but no more than 20
										if (typeof value !== "string" || !/^[a-zA-Z0-9]{5,20}$/.test(value)) {
											return "Username must be between 5 and 20 characters and only contain letters and numbers"
										}
									}}
									className={`mt-2 w-full rounded-md p-2 ${
										errors.username && touched.username
											? "border-red-800 border-2 bg-red-100"
											: "border-gray-400 border"
									}`.trim()}
								/>
								{errors.username && touched.username ? errors.username : null}
								<Button
									type="submit"
									color="primary"
									disabled={!isValid}
									full
									loading={isSubmitting}
								>
									Save
								</Button>
							</Form>
						)}
					</Formik>

					<div className="-mt-2 mb-2 row-start-1 md:row-start-auto">
						<div className="bg-white border border-gray-300 shadow rounded-lg w-full p-4 mt-2 space-y-4">
							<div>
								<div className="font-bold">Account Created:</div>
								<div>
									{createdDate?.toLocaleDateString(undefined, PREFERRED_DATE_FORMAT) ?? "Unknown"}
								</div>
							</div>
							<div>
								<div className="font-bold">Last Login:</div>
								<div>
									{lastSignInDate?.toLocaleDateString(undefined, PREFERRED_DATE_FORMAT) ??
										"Unknown"}
								</div>
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
