import React, { useState } from 'react';

const MemoryCreationForm = () => {

  const InitialState = { title: '', description: '', file: null};
  const [newMemory, setNewMemory] = useState(InitialState);
  const [errors,setErrors] = useState({});

  const ChangeInput = (e) => {
  //  console.log(e.target.files);
    if(e.target.files){
      setNewMemory(prevState => {
        return {
          ...prevState,
          [e.target.name]: e.target.files[0]
        }
      })
    }
    else{

      setNewMemory(prevState => {
        return {
          ...prevState,
          [e.target.name]: e.target.value
        }
      })
    }
  }

  const SubmitNewMemory = (e) => {
    e.preventDefault();

    const error = {};

    if(!newMemory.title) error.title = "please enter a title";
    if(!newMemory.description) error.description = "please provide a description";
    if(!newMemory.file || newMemory.file.size > (5*1024*1024)) error.file = "file must be less than 5MB";

    if(Object.keys(error).length > 0){
      setErrors(error);
    }else{
      console.log(newMemory);
      setNewMemory(InitialState);
      setErrors({});
      e.target.reset();
    }
  }

  return (
    <div className="form__input">
          
    <form onSubmit={SubmitNewMemory}>
    
      <div className='memory__title input'>
          <label htmlFor='title'>Title of your memory {errors.title && <span className='error__sign'> *</span>}</label> 
   
          <input className={errors.title ? 'input-form alert':'input-form'} id='title' type='text' onChange={ChangeInput}
          name='title' placeholder='Give a title of your memory' />
      </div>

      <div className='memory__desc input'>
          <label htmlFor='description'>Description of your memory {errors.description && <span className='error__sign'> *</span>}</label>

          <textarea className={errors.description ? 'input-form alert': 'input-form'} id='description' onChange={ChangeInput}
          name='description' placeholder='write some short description' />
      </div>

      <div className='memory__image input'>
          <label className={errors.file ? 'input-form alert': 'input-form'} htmlFor='file'>Upload an image</label>
          <input  type='file' id='file' name='file' onChange={ChangeInput}  />
          {errors.file && <p className='error__msg'>{errors.file}</p>}
      </div>

      <div className='memory__submit'>
          <button type='submit' className='btn btn-save'>
            Save
          </button>
      </div>
    
    </form>
  
  </div>
  )
}

export default MemoryCreationForm;