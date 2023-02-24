import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

/* no photo */
import noPhoto from '../assets/7612643-nophoto.png';

  const Modal = ({imageURL,setImageURL, author, createdAt}) => {

    const CloseModalCheck = (e) => {
      
      if(e.target.className === 'modal'){
        setImageURL(null);
      }
    }

    const closeImage = (e) => {
    
        setImageURL(null);
        e.stopPropagation();
      }
  

    return (
    <div className="modal" onClick={CloseModalCheck}>

      <AiOutlineClose className='close_img' onClick={closeImage} />
      
      <div className="modal__container">
      
        <img src={imageURL} alt="modal_image" className="modal__img" />

        <div className="uploader__info">
        


          <div className="uploader__img">
            <img src={author.photo ? author.photo : noPhoto} 
            alt={author.username} />
          </div>

          <div className="uploader__details">
            <h4>{author.username}</h4>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </div>
        
        </div>
      
      
      </div>


      
      </div>
    )
  }

  export default Modal