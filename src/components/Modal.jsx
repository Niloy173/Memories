import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

  const Modal = ({imageURL,setImageURL}) => {

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
            <img src="https://randomuser.me/api/portraits/men/31.jpg" alt="user" />
          </div>

          <div className="uploader__details">
            <h4>John Doe</h4>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        
        </div>
      
      
      </div>


      
      </div>
    )
  }

  export default Modal