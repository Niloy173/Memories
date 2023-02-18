import React, { useState } from 'react';
import MemoryVerification from '../util/MemoryVerification';

const MemoryCreationForm = () => {

  const InitialState = { title: '', description: '', file: null};
  const [newMemory, setNewMemory] = useState(InitialState);
  const [errors,setErrors] = useState({});
  const [isSubmiting, setIsSubmiting] = useState(false);

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

  const SubmitNewMemory = (e) => {
    e.preventDefault();
    setIsSubmiting(prev => !prev);

    const error = MemoryVerification(newMemory, "create");

    if(Object.keys(error).length > 0){
      setIsSubmiting(prev => !prev);
      setErrors(error);
    }else{
      setIsSubmiting(prev => !prev);
      setNewMemory({...newMemory, ...InitialState});
      setErrors({});
      console.log(newMemory);
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
            {newMemory.file ? "File uploaded": "Upload an image"}
          </label>
          <input  type='file' id='file' name='file' onChange={ChangeInput}   />
          {errors.file && <p className='form__error__msg'>{errors.file}</p>}
      </div>

      <div className='memory__submit'>
          <button type='submit' disabled={isSubmiting} className='btn btn-save'>
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