import {useGlobalContext} from "./useGlobalContext"
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../firebase/firebaseConfig"
import {toast} from "react-toastify"
import {useState} from "react"

function useLogin() {
  const [loading, setLoading] = useState(false)

  const {dispatch} = useGlobalContext()
  const login = (email, password) => {
    setLoading(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("Welcome come back")
        dispatch({type: "LOGIN", payload: userCredential.user})
        dispatch({type: "ERROR", error: null})
        setLoading(false)
      })
      .catch((error) => {
        setLoading(true)
        toast.error(error.message)
        dispatch({type: "ERROR", error: error})
        setLoading(false)
      })
  }
  return {login, loading}
}

export default useLogin
