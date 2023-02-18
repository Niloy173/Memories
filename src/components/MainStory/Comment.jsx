import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Comment = () => {

  const [comment,setComment] = useState("");
  const [active, setActive] = useState(false);
  const userInformations = true;

  const closeModal = (e) => {
    if(e.target.className === "modal") setActive(false);
  }

  const closeComments = (e) => {
    setActive(false);
    e.stopPropagation();
  }

  const comments = [
    {
      id: "1217361712611",
      photo: "https://randomuser.me/api/portraits/men/20.jpg",
      name: "john biswas",
      msg: "lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      date: new Date()
    },

    {
      id: "1217362712611",
      photo: "https://randomuser.me/api/portraits/women/10.jpg",
      name: "Emila clark",
      msg: "lorem ipsum dolor lorem lorem lroem eknfef ipsum lorem ipsum lorem ipsum lorem ipsum lorem",
      date: new Date()
    },

    {
      id: "1217363712611",
      photo: "https://randomuser.me/api/portraits/men/40.jpg",
      name: "Patrick james",
      msg: "lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem",
      date: new Date()
    },

    {
      id: "1217364712611",
      photo: "https://randomuser.me/api/portraits/women/40.jpg",
      name: "Max Loren",
      msg: "lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem lroemdijef dcfdijcf",
      date: new Date()
    }
  ]

  const PostComment = (e) => {
    e.preventDefault();

    if(comment === ""){
      // write a toast
    }else{
      console.log(comment);
    }
  }

  return (

    <React.Fragment>
    
    {
      userInformations === true &&
      <div className="comments">

        <form onSubmit={PostComment}>
        
          <input required type="text" className="comments__input" placeholder="write a comment" 
          onChange={(e) => setComment(e.target.value)} />

          <div className="post__comment">
            <button type='submit'>Comment</button>
          </div>
        
        </form>

      </div>
    }


    <div onClick={() => setActive(true)} className="see__all__comments">
      See all comments
    </div>


    {
      active === true &&
      (<div className="modal" onClick={closeModal}>

      <AiOutlineClose title='close' className='close' onClick={closeComments} />

      <div className="modal__container all__comments">
      
        <div className="comment__heading">
          <h3>All comments</h3>
        </div>

        <div className="each__single__comment">
        
        {
          comments.map((comment) => (

            <div key={comment.id} className="single__comment">

              <img src={comment.photo} alt={comment.name} />

              <div className="single__comment__details">
              
                <h4>{comment.name}</h4>
                <p>{comment.msg}</p>
                <span>{comment.date.toString().substring(0,16)}</span>
              
              </div>

            </div>

          ))
        }
        
        </div>
      
      </div>

    </div>)

    }


    

    </React.Fragment>
  )
}

export default Comment