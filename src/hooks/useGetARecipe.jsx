import {doc, getDoc} from "firebase/firestore"
import {db} from "../firebase/firebaseConfig"
import {toast} from "react-toastify"
import {useState} from "react"

export function useGetARecipe() {
  const getRecipe = async (col, id) => {
    const docRef = doc(db, col, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      toast.error("No such document")
    }
  }
  return {getRecipe}
}
