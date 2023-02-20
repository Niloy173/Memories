const AuthReducer = (CurrentState, Action) => {

  switch(Action.type){

    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null
      }

    case "LOGIN_SUCCESS":
      return {
        user: Action.payload,
        loading: false,
        error: null
      }

    case "LOGIN_ERROR":
      return {
        user: null,
        loading: false,
        error: true
      }

    case "LOG_OUT":
      return {
        user: null,
        loading: false,
        error: null
      }


    /* update state */
    case "UPDATE_START":
      return {
       
        ...CurrentState,
        loading: true,
        error: null
      }
    
    case "UPDATE_SUCCESS":
      return {
        user: Action.payload,
        loading: false,
        error: null
      }

    case "UPDATE_FAILURE":
      return {

        ...CurrentState,
        error: true
      }
    
    default:
      return CurrentState;
  }

}

export default AuthReducer;