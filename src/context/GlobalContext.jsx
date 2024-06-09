import {createContext, useReducer} from "react"

export const GlobalContext = createContext()

const changeState = (state, action) => {
  const {type, payload} = action

  switch (type) {
    case "LOGIN":
      return {...state, user: payload}
    case "LOGOUT":
      return {...state, user: null}
    case "IS_AUTH_READY":
      return {...state, isAuthReady: payload}
    case "IS_PANDING":
      return {...state, isPanding: payload}
    case "ERROR":
      return {...state, error: payload}
    default:
      return state
  }
}

export function GlobalContextProvider({children}) {
  const [state, dispatch] = useReducer(changeState, {
    user: false,
    isAuthReady: false,
    isPanding: false,
    error: null,
  })
  return (
    <GlobalContext.Provider value={{...state, dispatch}}>
      {children}
    </GlobalContext.Provider>
  )
}
