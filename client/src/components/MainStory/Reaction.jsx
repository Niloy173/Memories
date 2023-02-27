import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { IoIosShareAlt } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { ActivityContext, AuthContext } from '../../context/Context';
import debounce from '../../util/DebounceRequest';
import JwtDecoder from '../../util/DecodeToken';
import ToastMsg from '../../util/ToastMsg';

const Reaction = ({action, setAction, author, socket}) => {


  const {user} = useContext(AuthContext);
  const {activity, activityDispatch} = useContext(ActivityContext);
  const decoded = JwtDecoder(user);
  const navigate = useNavigate();
  
  const memoryid = window.location.href.split('/').reverse()[0];

  const [reaction, setReaction] = useState({ like: false, dislike: false });



  async function CopyText(){
    try {
        await navigator.clipboard.writeText(window.location.href);
        ToastMsg("Link copied to clipboard", true);
    } catch (error) {
      console.log(`Failed to copy text: ${error}`);
    }
  }

  const makeRequest = async (type,state) => {
    try {
      

      const response = await axios.put(`/api/memory/action/${decoded.id}`,{
        memoryid: memoryid,
        type: type,
      }, { headers: { 'authorization': user } });

      if(response.status === 200) {
        setAction(response.data)
        ToastMsg("Thank you for your feedback!", true);
        activityDispatch({ type: `${state}`, payload: { id: memoryid } })
        
      }

    } catch (error) {
      ToastMsg(error.response.data.message, false);
    }
  } 

  
  const change = (react) => {

    if(!user){
      navigate("/login");
      return
    }
   
    if(react === 'like'){
      makeRequest(react,"LIKE_ACTIVITY_ADD");
      setReaction({...reaction, like: true, dislike: false});

      /* send a socket request */
      socket.emit("sendNotification",{
        senderName: decoded.username,
        reciverName: author,
        type: "like",
      })
      
    }

    if(react === 'dislike'){
      makeRequest(react, "DISLIKE_ACTIVITY_ADD");
      setReaction({...reaction, like: false, dislike: true});  

      /* send a socket request */
      socket.emit("sendNotification",{
        senderName: decoded.username,
        reciverName: author,
        type: "dislike",
      })     
      
    }

    if(react === 'removelike'){
      makeRequest(react, "LIKE_ACTIVITY_REMOVE");
      setReaction({...reaction, like: false, dislike: reaction.dislike});  
    }

    if(react === 'removedislike'){
      makeRequest(react, 'DISLIKE_ACTIVITY_REMOVE');
      setReaction({...reaction, like: reaction.like, dislike: false}); 
    }
  }

  const ReactionChange = debounce(change, 200);

  return (
    <div className="icon__grid">
            
    <div className="icon__grid__emotion">
      <div className='icon__grid__emotion__reaction1'>
        {
          reaction.like === true || activity?.likes.includes(memoryid)  ?
          <AiFillLike title='i like it' name='like'  className='icon__grid__emotion__icon1' onClick={() => ReactionChange('removelike')}/>
          :<AiOutlineLike title='i like it' name='like'  className='icon__grid__emotion__icon1'  onClick={() => ReactionChange('like')}/>
        }
        <span>{action.likes}</span>
      </div>

      <div className="vert"></div>

       <div className='icon__grid__emotion__reaction2'>
          {
            reaction.dislike === true || activity?.dislikes.includes(memoryid) ?
            <AiFillDislike title='i dislike it' name='dislike' className='icon__grid__emotion__icon2'  onClick={() => ReactionChange('removedislike')} />
            :<AiOutlineDislike title='i dislike it' name='dislike' className='icon__grid__emotion__icon2'  onClick={() => ReactionChange('dislike')} />
          }
          <span>{action.dislikes}</span>
        </div>
    </div>

 
    <div onClick={CopyText} title='copy to share it' className="icon__grid__share">
        <IoIosShareAlt />
        <span>share</span>

    </div>
    
</div>
  )
}

export default Reaction