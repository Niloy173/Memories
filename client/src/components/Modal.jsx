import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

/* no photo */
import noPhoto from '../assets/7612643-nophoto.png';

  const Modal = ({setImageModal,imageURL,setImageURL, author, createdAt}) => {

    const CloseModalCheck = (e) => {
      
      if(e.target.className === 'modal'){
        setImageModal(prev => !prev);
        setImageURL(null);
      }
    }

    const closeImage = (e) => {
    
        setImageModal(prev => !prev);
        setImageURL(null);
        e.stopPropagation();
    }
  

    return (
    <div className="modal" onClick={CloseModalCheck}>

      <AiOutlineClose className='close_img' onClick={closeImage} />
      
      
        <img src={imageURL} alt="modal_image" className={imageURL ? "modal__img fade-in": "modal__img"} />

        <div className={imageURL ? "uploader__info fade-in": "uploader__info"}>
        


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
    )
  }

  export default Modal