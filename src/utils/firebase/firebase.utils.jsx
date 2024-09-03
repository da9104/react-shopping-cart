// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import { getFirestore, 
          doc, 
          getDoc, 
          setDoc, 
          collection, 
          writeBatch, 
          query, 
          getDocs  
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRPpyreKHCNii1w4rM0ssLV1JQj32Sxkw",
  authDomain: "crwn-shop-db-dd60f.firebaseapp.com",
  projectId: "crwn-shop-db-dd60f",
  storageBucket: "crwn-shop-db-dd60f.appspot.com",
  messagingSenderId: "410074318060",
  appId: "1:410074318060:web:57c96259720464412e51c9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const db = getFirestore()
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field = 'title') => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj[field].toLowerCase())
    batch.set(docRef, obj)  
  })
    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data()
    acc[title.toLowerCase()] = items
    return acc
  }, {})
  return categoryMap
}

export const createUserDocumentFromAuth = async (
  userAuth, additionalInfo={}
 ) => {
  if (!userAuth) return;
  // if I don't get a user off, we want to return
  // But these are just different ways that we're saying if we do not receive any of these arguments, then
  // just don't run the function.
  const userDocRef = doc(db, 'users', userAuth.uid)
  // console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  // console.log(userSnapshot)
  // console.log(userSnapshot.exists())

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      })
    } catch (error) {
      console.log(error, "error")
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return; // if I don't get any email && password
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return; // if I don't get any email && password
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => {
  return await signOut(auth)
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)