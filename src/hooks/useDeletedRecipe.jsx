import {deleteDoc, doc} from "firebase/firestore"
import {toast} from "react-toastify"
import {db} from "../firebase/firebaseConfig"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
function useDeletedRecipe() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const deleteRecipe = async (col, id) => {
    setLoading(true)
    await deleteDoc(doc(db, col, id))
    toast.success("You deleted this Recipe")
    navigate("/")
    setLoading(false)
  }
  return {deleteRecipe, loading}
}

export {useDeletedRecipe}
