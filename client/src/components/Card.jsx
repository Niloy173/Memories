import { saveAs } from 'file-saver';
import React, { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { HiDownload } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import ToastMsg from '../util/ToastMsg';
import Modal from './Modal';

import { AiOutlineClose } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';

const Card = ({img, update=false}) => {

  const [imageURL, setImageURL] = useState(null);
  const [updateStatus, setUpdateStatus]= useState(false);

  const CardInformation = { cardImage: img, 
  cardTitle: 'MEMORY TITLE', cardDesc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti eum deserunt alias, repellendus laborum dignissimos.'}

  const [updateState, setUpdateState] = useState(CardInformation);
  const [error, setError] = useState({});
  const [isSubmiting, setIsSubmiting] = useState(false);

  const downloadPoster = async (imgURL) => {
    try {
      const response = await fetch(imgURL);
      const blob = await response.blob();
      saveAs(blob, 'download-image.jpg');
    } catch (error) {
      console.log(error);
      ToastMsg(error,false, "BOTTOM_CENTER");
    }
  }

  const UpdateModal = (e) => {
      setUpdateState({...update, ...CardInformation});
      setError({});
      setUpdateStatus(prev => !prev);
      e.stopPropagation();
  }

  const CloseModalCheck = (e) => {
    if(e.target.className === "modal") {
      setUpdateState({...update, ...CardInformation});
      setError({});
      setUpdateStatus(prev => !prev);
    };
  }

  const ChangeUpdate = (e) => {
    

    if( e.target.files && e.target.files.length > 0) {
      setUpdateState({...updateState, [e.target.name]: e.target.files[0]})
    }

    if(e.target.name === "cardTitle"){
      setUpdateState({...updateState, [e.target.name]: e.target.value})
    }

    if(e.target.name === "cardDesc"){
      setUpdateState({...updateState, [e.target.name]: e.target.value})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmiting(prev => !prev);

    const error = {};
    

    if(updateState.cardImage.size > (3*1024*1024))
    {
      error.image = "Image must be less then 3MB";
    }

    if(updateState.cardTitle.length === 0){
      error.title = "Title length exceeded";
    }

    if(updateState.cardDesc.length === 0){
      error.desc = "Title length exceeded";
    }


    if(Object.keys(error).length > 0){
      setIsSubmiting(prev => !prev);
      setError(error);

    }else{


      if(JSON.stringify(updateState) === JSON.stringify(CardInformation)){

        ToastMsg("Nothing to update", true, "BOTTOM_CENTER");
        
      }else{
        // make api request to update data if any changes are made by user
        ToastMsg("Updated Successfully", true, "BOTTOM_CENTER");
      }

      setIsSubmiting(prev => !prev);
     
      setUpdateStatus(prev => !prev);

    }

  }
  

  return (
    <React.Fragment>

    <article className='card__item'>
      
    <div className="card__img">
      <img src={img} alt="card_image" />

      <div className="card__filter">
        <div>
          <HiDownload title='Download Image' className='download' onClick={() => downloadPoster(img)} />
        </div>
        <div><FiEye title='Full Image' className='eye' onClick={() => setImageURL(img)} /></div>
      </div>
    </div>

    <h3>Memory Title</h3>
    <summary className='card__desc'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti eum deserunt alias, repellendus laborum dignissimos.
    </summary>

    <div className="explore__more">
      <Link to={"/memory/ue02jdsd9-sao"} className='btn btn-primary btn-center link'>Explore more</Link>
    </div>

    {
      update === true &&
      (<div className="explore__more">
        <button onClick={UpdateModal}  type='button' className='update-btn btn-primary btn-center link'>Update</button>
      </div>)
    }

  
    <ToastContainer/>
                
    </article>


    {/* image modal */ 
          imageURL && <Modal imageURL={imageURL} setImageURL={setImageURL} />
    /* image modal */ }

    { /* for updating card */
      updateStatus === true &&
      <div className="modal" onClick={CloseModalCheck}>

      <AiOutlineClose className='close' onClick={UpdateModal} />

        <div className="update__modal">
         
            <form className="update__modal__form" onSubmit={handleSubmit}>
         
              <div className="update__modal__form__image">
              
                <div className="update__modal__img">

                  {
                    typeof(updateState.cardImage) === "string" ?
                    <img src={updateState.cardImage} alt="card__image"  />
                    :<img src={URL.createObjectURL(updateState.cardImage)} alt="card__image"  />

                  }
                    {error.image && <p className="form__error__msg absolute">{error.image}</p>}
                    <div className="update__modal__image">
                      
                      <label  htmlFor="upload">Upload an image { error.image && <span className='error__sign'>  *</span>}</label>
                      <input type="file" id="upload" name="cardImage" onChange={ChangeUpdate}  />
                  
                    </div>
                </div>

              
              </div>


              <div className="update__modal__form__details">
              
                
                <div className="update__modal__data">
                
                  <label htmlFor="title">Title  { error.title && <span className='error__sign'>  *</span>}</label>
                  <input type="text"  id='title' name='cardTitle' value={updateState.cardTitle} onChange={ChangeUpdate} />
                  {error.title && <p className='error__msg'>{error.title}</p>}
                </div>

                <div className="update__modal__data">
                
                  <label htmlFor="description">Description { error.desc && <span className='error__sign'>  *</span>}</label>
                  <textarea  id='description' name='cardDesc'
                  value={updateState.cardDesc} onChange={ChangeUpdate} />
                  {error.desc && <p className='error__msg'>{error.desc}</p>}
                  
                
                </div>

                <div className="update__modal__submit">
                
                  <button type="submit" disabled={isSubmiting} className='btn btn-save'>
                  {isSubmiting? 'Checking...' : 'Save'}
                  </button>
                  <button type="button" className='cancel-btn' onClick={UpdateModal}>Cancel</button>

                </div>
                
              
              </div>


            
            </form>
          
        </div>

      </div>
    }

   
    
    
    </React.Fragment>
  )
}

export default Card;