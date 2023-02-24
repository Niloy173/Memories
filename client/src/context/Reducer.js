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
        likes: Action.payload.likes,
        dislikes: Action.payload.dislikes
       }
       
      }

    case 'NEW_ACTIVITY':

      return {

        ...CurrentState,
        activity: {
          ...CurrentState.activity,
          memories: [...CurrentState.activity.memories, Action.payload.id ]
        }
      }
      

      case 'LIKE_ACTIVITY_ADD':

      /* if the post already in dislikes container */
      let ReissuedDisLikeActivity = [...CurrentState.activity.dislikes];
      if(ReissuedDisLikeActivity.includes(Action.payload.id)){
        ReissuedDisLikeActivity = ReissuedDisLikeActivity.filter(a => a !== Action.payload.id); 
      }

      return {
        ...CurrentState,
       activity: {
        ...CurrentState.activity,
        likes: [...CurrentState.activity.likes, Action.payload.id ],
        dislikes: ReissuedDisLikeActivity
       }
       
      }

      case 'LIKE_ACTIVITY_REMOVE':

      const modifiedLikeActivity = CurrentState.activity.likes.filter(a => a !== Action.payload.id );

      return {
        ...CurrentState,
       activity: {
        ...CurrentState.activity,
        likes: modifiedLikeActivity
       }
       
      }

      case 'DISLIKE_ACTIVITY_ADD':

        /* if the post already in dislikes container */
        let ReissuedLikeActivity = [...CurrentState.activity.likes];
        if(ReissuedLikeActivity.includes(Action.payload.id)){
          ReissuedLikeActivity = ReissuedLikeActivity.filter(a => a !== Action.payload.id); 
        }

        return {
          ...CurrentState,
        activity: {
          ...CurrentState.activity,
          likes: ReissuedLikeActivity,
          dislikes: [...CurrentState.activity.dislikes, Action.payload.id ]
        }
        
        }

        case 'DISLIKE_ACTIVITY_REMOVE':

        const modifiedDisLikeActivity = CurrentState.activity.dislikes.filter(a => a !== Action.payload.id );
  
        return {
          ...CurrentState,
         activity: {
          ...CurrentState.activity,
          dislikes: modifiedDisLikeActivity
         }
         
        }

      case 'DELETE_MEMORY':

      const DeletedFromMemories = CurrentState.activity.memories.filter(a => a !== Action.payload.id);
      const DeletedFromLikes = CurrentState.activity.likes.filter(a => a !== Action.payload.id);
      const DeletedFromDisLikes = CurrentState.activity.dislikes.filter(a => a !== Action.payload.id); 

      return {
        ...CurrentState,
        activity: {
          ...CurrentState.activity,
          memories: DeletedFromMemories,
          likes: DeletedFromLikes,
          dislikes: DeletedFromDisLikes
        }
      }


    case 'CLOSE_ACTIVITY':
      
      return {
        ...CurrentState,
        activity: {
          ...CurrentState.activity,
          likes: [],
          memories: []
        }
      }






    default:
      return CurrentState;
  }
}

export {
  AuthReducer,
  ActivityReducer
}

