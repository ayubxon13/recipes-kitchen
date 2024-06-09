// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app"
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {collection, addDoc} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD2E5jnhDMDB4ymJyNDTfjtKB6_vdXZy-o",
  authDomain: "recipesapp-f80e9.firebaseapp.com",
  projectId: "recipesapp-f80e9",
  storageBucket: "recipesapp-f80e9.appspot.com",
  messagingSenderId: "701989209175",
  appId: "1:701989209175:web:f5920748523cd54e0e4f12",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const GoogleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)

export {auth, GoogleProvider}
