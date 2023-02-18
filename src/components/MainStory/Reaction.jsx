import React, { useState } from 'react';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { IoIosShareAlt } from 'react-icons/io';
import debounce from '../../util/DebounceRequest';
const Reaction = () => {

  const [reaction, setReaction] = useState({ like: false, dislike: false });

  async function CopyText(){
    try {
        await navigator.clipboard.writeText(window.location.href);
        console.log(`Text copied to clipboard`);
    } catch (error) {
      console.log(`Failed to copy text: ${error}`);
    }
  }

  
  const change = (react) => {
   
    if(react === 'like'){
      setReaction({...reaction, like: true, dislike: false});  
    }

    if(react === 'dislike'){
      setReaction({...reaction, like: false, dislike: true});  
    }

    if(react === 'removelike'){
      setReaction({...reaction, like: false, dislike: reaction.dislike});  
    }

    if(react === 'removedislike'){
      setReaction({...reaction, like: reaction.like, dislike: false}); 
    }
  }

  const ReactionChange = debounce(change, 500);

  return (
    <div className="icon__grid">
            
    <div className="icon__grid__emotion">
      <div className='icon__grid__emotion__reaction1'>
        {
          reaction.like === true ?
          <AiFillLike title='i like it' name='like'  className='icon__grid__emotion__icon1' onClick={() => ReactionChange('removelike')}/>
          :<AiOutlineLike title='i like it' name='like'  className='icon__grid__emotion__icon1'  onClick={() => ReactionChange('like')}/>
        }
        <span>20</span>
      </div>

      <div className="vert"></div>

       <div className='icon__grid__emotion__reaction2'>
          {
            reaction.dislike === true ?
            <AiFillDislike title='i dislike it' name='dislike' className='icon__grid__emotion__icon2'  onClick={() => ReactionChange('removedislike')} />
            :<AiOutlineDislike title='i dislike it' name='dislike' className='icon__grid__emotion__icon2'  onClick={() => ReactionChange('dislike')} />
          }
          <span>10</span>
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