import axios from 'axios';
import { saveAs } from 'file-saver';
import React, { useContext, useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { HiDownload } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import ToastMsg from '../util/ToastMsg';
import Modal from './Modal';

import { AiOutlineClose } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/Context';
import JwtDecoder from '../util/DecodeToken';

const Card = ({card, update=false}) => {

  const {user} = useContext(AuthContext);
  const decoded = JwtDecoder(user);

  const [imageURL, setImageURL] = useState(null);
  const [updateStatus, setUpdateStatus]= useState(false);

  const CardInformation = { cardImage: card.photo, 
  cardTitle: card.title, cardDesc: card.description, cardId: card._id}

  const [updateState, setUpdateState] = useState({ cardImage: card.photo, cardTitle: card.title, cardDesc: card.description, cardId: card._id });
  
  const [error, setError] = useState({});
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigate = useNavigate();

  const downloadPoster = async (imgURL) => {

    if(!user){
      window.location.href = "/login";
      return;
    }

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
      setUpdateState({...update, ...CardInformation });
      setError({});
      setUpdateStatus(prev => !prev);
      e.stopPropagation();
  }

  const CloseModalCheck = (e) => {
    if(e.target.className === "modal") {
      setUpdateState({...update, ...CardInformation });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedInformation = {};
    setIsSubmiting(prev => !prev);

    const error = {};
    

    if(updateState.cardImage.size > (5*1024*1024))
    {
      error.image = "Image must be less then 5MB";
    }

    if(updateState.cardTitle.length === 0){
      error.title = "Title is empty";
    }

    if(updateState.cardDesc.length === 0){
      error.desc = "description is empty";
    }


    if(Object.keys(error).length > 0){
      setIsSubmiting(prev => !prev);
      setError(error);

    }else{


      if(JSON.stringify(updateState) !== JSON.stringify(CardInformation)){
        //ToastMsg("Nothing to update", true, "BOTTOM_CENTER");
        
        if(typeof(CardInformation.cardImage) !== typeof(updateState.cardImage))
        {
          const formData = new FormData();
          formData.append("file", updateState.cardImage);
          formData.append("upload_preset","upload");

          try {

            const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData);
            const {secure_url} = res.data;
            updatedInformation.photo = secure_url;
            
          } catch (error) {
            // upload failed
            updatedInformation.photo = CardInformation.cardImage;
            ToastMsg(error.response.data.message, false);
          }

        }else{
          updatedInformation.photo = CardInformation.cardImage;
        }

        updatedInformation.title = CardInformation.cardTitle === updateState.cardTitle ? CardInformation.cardTitle : updateState.cardTitle;
        updatedInformation.description = CardInformation.cardDesc === updateState.cardDesc ? CardInformation.cardDesc : updateState.cardDesc;


        try {

          const response = await axios.put(`/api/memory/${decoded.id}/${updateState.cardId}`,updatedInformation, {
            headers: { 'authorization': user }
          });

          // console.log(response.data);

         if(response.status === 200) {
           // after successful update see the post
           ToastMsg("Updated Successfully", true, "BOTTOM_CENTER");
           navigate(`/memory/${response.data._id}`);
         }
          
        } catch (error) {
         
          ToastMsg(error.response.data.message, false);
        }

        
      }
      setIsSubmiting(prev => !prev);
      setUpdateStatus(prev => !prev);

      
     

    }

  }
  

  return (
    <React.Fragment>

    <article className='card__item'>
      
    <div className="card__img">
      <img src={CardInformation.cardImage} alt="card_image" />

      {
        !update &&
        (<div className="card__filter">
        <div>
          <HiDownload title='Download Image' className='download' onClick={() => downloadPoster(CardInformation.cardImage)} />
        </div>
        <div><FiEye title='Full Image' className='eye' onClick={() => setImageURL(CardInformation.cardImage)} /></div>
      </div>)
      }
    </div>

    <h3>{CardInformation.cardTitle.substring(0,26)}</h3>
    <summary className='card__desc'>
     {CardInformation.cardDesc.substring(0,120)}
    </summary>

    <div className="explore__more">
      <Link to={`/memory/${card._id}`} className='btn btn-primary btn-center link'>Explore more</Link>
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
          imageURL && <Modal imageURL={imageURL} setImageURL={setImageURL} author={card.author} createdAt={card.createdAt} />
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