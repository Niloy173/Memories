import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActivityContext, AuthContext } from '../context/Context';
import JwtDecoder from '../util/DecodeToken';
import MemoryVerification from '../util/MemoryVerification';
import ToastMsg from '../util/ToastMsg';

const MemoryCreationForm = ({reFetch, openForm, setOpenForm}) => {

  const {user} = useContext(AuthContext);
  const {activityDispatch} = useContext(ActivityContext);
  const decoded = JwtDecoder(user);


  const InitialState = { title: '', description: '', photo: null};
  const [newMemory, setNewMemory] = useState(InitialState);
  const [errors,setErrors] = useState({});
  const [isSubmiting, setIsSubmiting] = useState(false);

  const navigate = useNavigate();

  const ChangeInput = (e) => {
  //  console.log(e.target.files);
    if(e.target.files && e.target.files.length > 0){
      setNewMemory(prevState => {
        return {
          ...prevState,
          [e.target.name]: e.target.files[0]
        };
      })
    }
    else{

      setNewMemory(prevState => {
        return {
          ...prevState,
          [e.target.name]: e.target.value
        };
      })
    }
  }

  const SubmitNewMemory = async (e) => {
    e.preventDefault();

    if(!user){
      navigate("/login");
      return;
    }
    let photoUrl = "";
    setIsSubmiting(prev => !prev);

    const error = MemoryVerification(newMemory, "create");

    if(Object.keys(error).length > 0){
      setIsSubmiting(prev => !prev);
      setErrors(error);
    }else{

      const formData = new FormData();
      formData.append("file", newMemory.photo);
      formData.append("upload_preset","upload");

      try {

        const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData);
        const {secure_url} = res.data;
        photoUrl = secure_url;
            
      } catch (error) {

        ToastMsg(error.response.data.message, false);
      }

     
      try {
        const response = await axios.post(`/api/memory/${decoded.id}`,{
          authorid: decoded.id,
          title: newMemory.title,
          description: newMemory.description,
          photo: photoUrl
        }, { headers: {'authorization': user}});


        if(response.status === 200){
          openForm && setOpenForm(prev => !prev) // closing the form in small screen after successful
          activityDispatch({ type: 'NEW_ACTIVITY', payload: { id:response.data._id  } });
          ToastMsg("Memory created successfully", true, "BOTTOM_CENTER");
          reFetch();
        }

        setErrors({});
        setIsSubmiting(prev => !prev);
        setNewMemory({...newMemory, ...InitialState});

      } catch (error) {
        setIsSubmiting(prev => !prev);
        ToastMsg(error.response.data.message, false, "BOTTOM_CENTER");
      }

 
     
    }
  }

  return (
    <div className="form__input">
          
    <form onSubmit={SubmitNewMemory}>
    
      <div className='memory__title input'>
          <label htmlFor='title'>Title of your memory {errors.title && <span className='form__error__sign'> *</span>}</label> 
   
          <input className={errors.title ? 'input-form alert':'input-form'} id='title' type='text' onChange={ChangeInput}
          name='title' placeholder='Give a title of your memory' value={newMemory.title}  />
      </div>

      <div className='memory__desc input'>
          <label htmlFor='description'>Description of your memory {errors.description && <span className='form__error__sign'> *</span>}</label>

          <textarea className={errors.description ? 'input-form alert': 'input-form'} id='description' onChange={ChangeInput}
          name='description' placeholder='write some short description' value={newMemory.description} />
      </div>

      <div className='memory__image input'>
          <label className={errors.file ? 'input-form alert': 'input-form'} htmlFor='file'>
            {newMemory.photo ? "File uploaded": "Upload an image"}
          </label>
          <input  type='file' accept='image/jpg, image/jpeg, image/png' id='file' name='photo' onChange={ChangeInput}   />
          {errors.file && <p className='form__error__msg'>{errors.file}</p>}
      </div>

      <div className='memory__submit'>
          <button type='submit' disabled={isSubmiting}  className={isSubmiting ? "submit-btn btn disabled_btn": "submit-btn btn"}>
            {
              isSubmiting ? "Checking..." : "Create Memory" 
            }
          </button>
      </div>
    
    </form>
  
  </div>
  )
}

export default MemoryCreationForm;