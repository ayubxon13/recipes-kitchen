import {collection, onSnapshot, query, where} from "firebase/firestore"
import {useEffect, useState} from "react"
import {db} from "../firebase/firebaseConfig"

export function useCollection(col, _q) {
  const [documents, setDocuments] = useState(null)

  const q = query(collection(db, col), where(..._q))

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const result = []
      snapshot.docs.forEach((doc) => {
        const recipes = {id: doc.id, ...doc.data()}
        result.push(recipes)
      })
      setDocuments(result)
    })
    return () => unsubscribe()
  }, [])
  return {documents}
}
