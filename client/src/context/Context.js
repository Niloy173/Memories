import { createContext, useEffect, useReducer } from 'react';
import { ActivityReducer, AuthReducer } from './Reducer';

const InitialState = {
  user: JSON.parse(localStorage.getItem('memories')) || null,
  loading: false,
  error: null
}

const ActivityState = {
  activity: JSON.parse(localStorage.getItem('useractivity')) || { likes: [], dislikes: [], memories: []}
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

export const ActivityContext = createContext(ActivityState);

export const ActivityContextProvider = ({ children }) => {

  const [activityState, activityDispatch] = useReducer(ActivityReducer, ActivityState);

  useEffect(() => {
    localStorage.setItem('useractivity', JSON.stringify(activityState.activity));
  },[activityState.activity])

  return (

    <ActivityContext.Provider
    value={{
      activity: activityState.activity,
      activityDispatch
    }}>
      {children}
    </ActivityContext.Provider>

  );
}