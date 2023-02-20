import { createContext, useEffect, useReducer } from 'react';
import AuthReducer from './Reducer';

const InitialState = {
  user: JSON.parse(localStorage.getItem('memories')) || null,
  loading: false,
  error: null
}

export const AuthContext = createContext(InitialState);

export const AuthContextProvider = ({ children }) => {

  const [authState, authDispatch] = useReducer(AuthReducer,InitialState);

  useEffect(() => {
    
    localStorage.setItem('memories', JSON.stringify(authState.user));
  },[authState.user])

  return (
    
    <AuthContext.Provider
    value={{
      user: authState.user,
      loading: authState.loading,
      error: authState.error,
      authDispatch
    }}
    >
      {children}
    </AuthContext.Provider>
  )

}