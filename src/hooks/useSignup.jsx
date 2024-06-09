import {useGlobalContext} from "./useGlobalContext"
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import {GoogleProvider, auth} from "../firebase/firebaseConfig"
import {toast} from "react-toastify"
import {useState} from "react"

export function useSignup() {
  const [loading, setLoading] = useState(false)

  const {dispatch} = useGlobalContext()

  const signup = (displayName, email, password) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName,
        })
        toast.success("Welcome")
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

  const signUpWithGoogleProvider = () => {
    setLoading(true)
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result)
        const user = result.user
        toast.success("Welcome Back")
        dispatch({type: "LOGIN", payload: user})
        setLoading(false)
      })
      .catch((error) => {
        setLoading(true)
        const errorMessage = error.message
        toast.error(errorMessage)
        setLoading(false)
        dispatch({type: "ERROR", payload: errorMessage})
      })
  }
  return {signUpWithGoogleProvider, signup, loading}
}
