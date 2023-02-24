import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { AuthContext } from '../../context/Context';
import JwtDecoder from '../../util/DecodeToken';
import ToastMsg from '../../util/ToastMsg';

/* no photo */
import noPhoto from '../../assets/7612643-nophoto.png';

const Comment = ({comment, setComment}) => {

  const {user} = useContext(AuthContext);
  const decoded = JwtDecoder(user);

  const [newComment,setNewComment] = useState("");
  const [isSubmit, setisSubmit] = useState(false);
  const [active, setActive] = useState(false);

  const closeModal = (e) => {
    if(e.target.className === "modal") setActive(false);
  }

  const closeComments = (e) => {
    setActive(false);
    e.stopPropagation();
  }

  // const Comments = [
  //   {
  //     id: "1217361712611",
  //     photo: "https://randomuser.me/api/portraits/men/20.jpg",
  //     name: "john biswas",
  //     msg: "lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  //     date: new Date()
  //   },

  //   {
  //     id: "1217362712611",
  //     photo: "https://randomuser.me/api/portraits/women/10.jpg",
  //     name: "Emila clark",
  //     msg: "lorem ipsum dolor lorem lorem lroem eknfef ipsum lorem ipsum lorem ipsum lorem ipsum lorem",
  //     date: new Date()
  //   },

  //   {
  //     id: "1217363712611",
  //     photo: "https://randomuser.me/api/portraits/men/40.jpg",
  //     name: "Patrick james",
  //     msg: "lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem",
  //     date: new Date()
  //   },

  //   {
  //     id: "1217364712611",
  //     photo: "https://randomuser.me/api/portraits/women/40.jpg",
  //     name: "Max Loren",
  //     msg: "lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem lroemdijef dcfdijcf",
  //     date: new Date()
  //   }
  // ]

  const PostComment = async (e) => {
    e.preventDefault();
    setisSubmit(prev => !prev);

    if(newComment === ""){
      // write a toast
      // ToastMsg("Please enter a comment", false, "BOTTOM_CENTER");
    }else{
      
      const memoryid = window.location.href.split('/').reverse()[0];
      const userid = decoded.id;
      
      try {
        
          const response = await axios.post(`/api/comment/${userid}/${memoryid}`,{
            memory: memoryid,
            author: userid,
            text: newComment
          }, { headers : {'authorization': user} });

          console.log(response.data);

          if(response.status === 200) {
            e.target.reset();
            setisSubmit(prev => !prev);
            setComment([ ...response.data ])
            ToastMsg("Comment posted", true, "BOTTOM_CENTER");
          }

      } catch (error) {
        setisSubmit(prev => !prev);
        ToastMsg(error.response.data.message, false, "BOTTOM_CENTER");
      }
    }
  }

  return (

    <React.Fragment>
    
    {
      user &&
      <div className="comments">

        <form onSubmit={PostComment}>
        
          <input required type="text" className="comments__input" placeholder="write a comment" 
          onChange={(e) => setNewComment(e.target.value)} />

          <div className="post__comment">
            <button className={isSubmit ? 'disabled_btn': null} disabled={isSubmit} type='submit'>Comment</button>
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

      <motion.div layout className="modal__container all__comments">
      
        <div className="comment__heading">
          <h3>All comments</h3>
        </div>

        <div className="each__single__comment">
        
        {/*
          Comments.map((comment) => (

            <div key={comment.id} className="single__comment">

              <img src={comment.photo} alt={comment.name} />

              <div className="single__comment__details">
              
                <h4>{comment.name}</h4>
                <p>{comment.msg}</p>
                <span>{comment.date.toString().substring(0,16)}</span>
              
              </div>

            </div>

          ))
          */}

          {
            comment.length > 0 ? 
            
            comment.map((c) => (

              <div key={c._id} className="single__comment">
  
                <div className="single__comment__profile">
                
                  <img src={c.author.photo ? c.author.photo : noPhoto} alt={c.author.username} />
                
                </div>
  
                <div className="single__comment__details">
                
                  <h4>{c.author.username}</h4>
                  <p>{c.text}</p>
                  <span>{new Date(c.createdAt).toString().substring(0,16)}</span>
                
                </div>
  
              </div>
  
            ))
          : <p className='no__comments'>No Comments Available</p>
            
          } 
        
        </div>
      
      </motion.div>

    </div>)

    }


    

    </React.Fragment>
  )
}

export default Comment