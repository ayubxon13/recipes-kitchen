import {Navigate} from "react-router-dom"

export function ProtectedRoutes({children, user}) {
  if (user) {
    return children
  } else {
    return <Navigate to="/signup" />
  }
}

export default ProtectedRoutes
