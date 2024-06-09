import {Link} from "react-router-dom"
import {useSignup} from "../hooks/useSignup"
import {useRef} from "react"

function Signup() {
  const displayName = useRef()
  const email = useRef()
  const password = useRef()
  const {signUpWithGoogleProvider, signup, loading} = useSignup()

  const handleGoogleLogin = (e) => {
    e.preventDefault()
    signUpWithGoogleProvider()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(
      displayName.current.value,
      email.current.value,
      password.current.value
    )
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      {loading && (
        <div className="justify-center h-full w-full flex items-center mt-24">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
      {!loading && (
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md md:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Sign up
          </h1>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Name
              </label>
              <input
                required
                ref={displayName}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />

              <label className="block text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                required
                ref={email}
                type="email"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                required
                ref={password}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                Enter
              </button>
              <br />
              <br />
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Google
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Do you have an account?{" "}
            <Link
              to="../login"
              className="font-medium text-purple-600 hover:underline"
            >
              Login up
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default Signup
