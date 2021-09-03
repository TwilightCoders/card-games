// Libs
import * as React from "react"

// Components
import { LockClosedIcon } from "@heroicons/react/solid"
import { ExclamationIcon } from "@heroicons/react/outline"
import Content from "components/Content"
import { Dialog, Transition } from "@headlessui/react"

// Utilities
import { supabase } from "utils/supabaseClient"

// Constants
const STATUS = {
	IDLE: "IDLE",
	LOADING: "LOADING",
	SUCCESS: "SUCCESS",
	ERROR: "ERROR",
}

export default function SignIn() {
	/** Track the status of the sign in process */
	const [status, setStatus] = React.useState(STATUS.IDLE)

	/** Is the dialog open */
	const [isDialogOpen, setIsDialogOpen] = React.useState(false)

	/** The email being entered into the form */
	const [email, setEmail] = React.useState("")

	/** Is a request loading */
	const isLoading = status === STATUS.LOADING

	/** Request succeeded */
	const isSuccess = status === STATUS.SUCCESS

	/** Request failed */
	const isError = status === STATUS.ERROR

	/**
	 * If there was an error, display a dialog message explaining the error. If the user dismisses
	 * the dialog, then reset the page state so they can try again.
	 */
	React.useEffect(() => {
		if (isError) {
			setIsDialogOpen(true)
		}
	}, [isError])

	/**
	 * Login to the Supabase API
	 * @param {string} email The email to login with
	 */
	const handleLogin = async email => {
		try {
			setStatus(STATUS.LOADING)
			const { error } = await supabase.auth.signIn({ email })
			if (error) throw error
			setStatus(STATUS.SUCCESS)
			// alert("Check your email for the login link!")
		} catch (error) {
			alert(error.error_description || error.message)
		}
	}

	const cancelButtonRef = React.useRef(null)

	return (
		<Content>
			<div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Sign in to your account
						</h2>
						{isSuccess ? null : (
							<p className="mt-2 text-center text-sm text-gray-600">
								Sign in via magic link with your email below
							</p>
						)}
					</div>
					{isSuccess ? (
						<p className="mt-2 text-center text-md">Check your email for a log in link!</p>
					) : (
						<div className="mt-8 space-y-6">
							<div className="rounded-md shadow-sm -space-y-px">
								<div>
									<label htmlFor="email-address" className="sr-only">
										Email address
									</label>
									<input
										id="email-address"
										name="email"
										type="email"
										autoComplete="email"
										required
										className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
										placeholder="Email address"
										value={email}
										onChange={e => setEmail(e.target.value)}
									/>
								</div>
							</div>

							<div>
								{isLoading ? (
									<div className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-400 cursor-not-allowed">
										Loading...
									</div>
								) : (
									<button
										type="submit"
										className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
											isLoading ? "disabled" : ""
										}`}
										disabled={isLoading}
										onClick={() => {
											handleLogin(email)
											// setStatus(STATUS.LOADING)
											// setTimeout(() => setStatus(STATUS.ERROR), 2000)
										}}
									>
										<span className="absolute left-0 inset-y-0 flex items-center pl-3">
											<LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
										</span>
										Sign in
									</button>
								)}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* The error dialog */}
			<Transition.Root show={isDialogOpen} as={React.Fragment}>
				<Dialog
					as="div"
					static
					className="fixed z-10 inset-0 overflow-y-auto"
					initialFocus={cancelButtonRef}
					open={isDialogOpen}
					onClose={setIsDialogOpen}
				>
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<Transition.Child
							as={React.Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
							&#8203;
						</span>
						<Transition.Child
							as={React.Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div className="sm:flex sm:items-start">
										<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
											<ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
										</div>
										<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
											<Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
												Deactivate account
											</Dialog.Title>
											<div className="mt-2">
												<p className="text-sm text-gray-500">
													Are you sure you want to deactivate your account? All of your data will be
													permanently removed. This action cannot be undone.
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
									<button
										type="button"
										className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
										onClick={() => setIsDialogOpen(false)}
									>
										Deactivate
									</button>
									<button
										type="button"
										className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
										onClick={() => setIsDialogOpen(false)}
										ref={cancelButtonRef}
									>
										Cancel
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>
		</Content>
	)
}
