import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"
import RootLayouts from "./layout/RootLayouts"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./components/Home"
import Create from "./pages/Create"
import ProtectedRoutes from "./components/ProtectedRoutes"
import {useEffect, useState} from "react"
import {useGlobalContext} from "./hooks/useGlobalContext"
import {onAuthStateChanged} from "firebase/auth"
import {auth} from "./firebase/firebaseConfig"
import Recipe from "./pages/Recipe"
function App() {
  const [loading, setLoading] = useState(false)
  const {user, isAuthReady, dispatch} = useGlobalContext()
  const routest = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <RootLayouts />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/" /> : <Signup />,
    },
    {
      path: "/create",
      element: user ? <Create /> : <Navigate to="/" />,
    },
    {
      path: "/recipe/:id",
      element: <Recipe />,
    },
  ])

  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (user) => {
      dispatch({type: "LOGIN", payload: user})
      dispatch({type: "IS_AUTH_READY", payload: true})
      setLoading(false)
    })
  }, [])
  return loading ? (
    <div className="justify-center h-full w-full flex items-center mt-24">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  ) : (
    <RouterProvider router={routest} />
  )
}

export default App
