import {collection, addDoc} from "firebase/firestore"
import {db} from "../firebase/firebaseConfig"
import {Navigate} from "react-router-dom"
import {useState} from "react"
import {toast} from "react-toastify"

export function useAddRecipes() {
  const [newRecipe, setNewRecipe] = useState()
  const addNewDoc = async (col, data) => {
    const docRef = await addDoc(collection(db, col), data)
    toast.success("New Recipe Added")
  }
  return {addNewDoc, newRecipe}
}
