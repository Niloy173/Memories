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


const ActivityReducer = (CurrentState, Action) => {

  switch(Action.type){
    
    case 'ADD_ACTIVITY':

      return {
        ...CurrentState,
       activity: {
        ...CurrentState.activity,
        memories : Action.payload.memories,
        likes: Action.payload.likes
       }
       
      }

    case 'CLOSE_ACTIVITY':
      
      return {
        ...CurrentState,
        activity: {
          ...CurrentState.activity,
          likes: 0,
          memories: 0
        }
      }

    case 'INCREMENT_ACTIVITY':
   
      return {
        ...CurrentState,
        activity: {
          ...CurrentState.activity,
          memories: CurrentState.activity.memories + 1,
        }
      }

    case 'DECREMENT_ACTIVITY':
        return {
          ...CurrentState,
          memories: CurrentState.memories - 1,
        }

    case 'INCREMENT_LIKES': 
      return {
        ...CurrentState,
        likes: CurrentState.likes + 1,
      }

    case 'DECREMENT_LIKES': 

      return {

        ...CurrentState,
        likes: CurrentState.likes - 1,
      }


    default:
      return CurrentState;
  }
}

export {
  AuthReducer,
  ActivityReducer
}

