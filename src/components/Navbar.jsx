import {Link, NavLink} from "react-router-dom"
import {signOut} from "firebase/auth"
import {auth} from "../firebase/firebaseConfig"
import {toast} from "react-toastify"
import {useGlobalContext} from "../hooks/useGlobalContext"

function Navbar() {
  const {user, dispatch} = useGlobalContext()
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signout succsessfuly")
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  const changeMode = () => {
    const data = document.documentElement.getAttribute("data-theme")
    if (data === "dark") {
      document.documentElement.setAttribute("data-theme", "light")
      localStorage.setItem(
        "theme",
        document.documentElement.getAttribute("data-theme")
      )
    } else {
      document.documentElement.setAttribute("data-theme", "dark")
      localStorage.setItem(
        "theme",
        document.documentElement.getAttribute("data-theme")
      )
    }
  }

  return (
    <div className="navbar shadow-md bg-base-100">
      <div className="max-container flex justify-between">
        <div className="flex-1">
          <NavLink
            to="/"
            className="select-none font-bold text-xl font-sans max-[500px]:"
          >
            RECIPES
          </NavLink>
        </div>

        {user.displayName ? (
          <h1 className="items-center font-medium flex max-[500px]:text-[14px] mr-1">
            {user.displayName.split(" ")[0].slice(0, 9)}
            {user.displayName.split(" ")[0].length > 9 ? "..." : ""}
          </h1>
        ) : (
          <span className="loading loading-dots loading-lg"></span>
        )}

        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full max-[500px]:w-[35px]">
                <img
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXSzsNsUvjSXUeqmShMTEVZ0M4JUMe3ChPvyISEZ-6Eg&s"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/create" className="justify-between">
                  Create
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <button onClick={changeMode}>ChangeMode</button>
              </li>

              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
