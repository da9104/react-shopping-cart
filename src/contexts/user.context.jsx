import { createContext, useEffect, useReducer, useRef } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

import { createAction } from '../utils/reducer/reducer.utils'

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',

}

const INITIAL_STATE = {
  currentUser: null
}

const userReducer = (state, action) => {
  const { type, payload } = action

  console.log('dispatched')
  console.log(action)

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
      default:
        throw new Error(`unhandled type ${type} in reducer`)
  }
}

export const UserProvider = ({ children }) => {
    const [{ currentUser }, dispatch ] = useReducer(userReducer, INITIAL_STATE)
    const setCurrentUser = (user) => {
      dispatch(
        createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
      )
    }

    const value = {currentUser, setCurrentUser}

    useEffect(() => {
       const unsubscribe = onAuthStateChangedListener((user) => {
         if (user) {
            console.log(user)
            createUserDocumentFromAuth(user)
         }
        setCurrentUser(user)
        })

       return unsubscribe
    }, [])

    return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  )
}