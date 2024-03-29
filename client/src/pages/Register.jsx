import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckAuthError from '../util/AuthErrorVerify';
import ToastMsg from '../util/ToastMsg';

/* quotes */
import Quote from '../util/Quotes';
import SEO from '../util/SeoSetup';

const Register = () => {

  const InitialState = { username: "", password: "", email: ""}
  const [register, setRegister] = useState(InitialState);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();


  const handleState = (e) => {
    const {name, value} = e.target;
    setRegister({...register, [name]: value});

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmiting(prev => !prev);

    const error = CheckAuthError(register, "registration");

    if(Object.keys(error).length > 0){
      setIsSubmiting(prev => !prev);
      setError(error);
    }else{
     
      try {

        const response = await axios.post(`/api/auth/register`, register);
        response.data && navigate("/login");

      } catch (error) {
        
        ToastMsg(error.response.data.message, false);
        setIsSubmiting(prev => !prev);
        setRegister(InitialState);
      }
    }
  }

  return (

    
    
    <div className="register form__container">

      <SEO image={"https://res.cloudinary.com/di8xxkudu/image/upload/v1679747300/upload/favicon_gvihzp.jpg"}
      title={"Register Page"} description={"user registration | Memories"} link={window.location.href} />
    
    <Link to={"/"} className='link'><h2 className='fs'>Memories</h2></Link>
      <motion.p layout className='form__container__subheader'>{Quote[Math.floor(Math.random() * Quote.length)]}</motion.p>

      <div className="form">
      
        <h3 className="text-center">Register</h3>
        
        <form onSubmit={handleSubmit}>

        <div className="input__grp">
          <label htmlFor='username'>Username {error.username && <span className='form__error__sign'>  *</span>}</label>
          <input type="text" placeholder='username' name='username' id='username'
          value={register.username} onChange={handleState} /> 
          {error.username && <p className='form__error__msg'>{error.username}</p>}
        </div>

        <div className="input__grp">
          <label htmlFor='user'>Email {error.email && <span className='form__error__sign'>  *</span>}</label>
          <input type="email" placeholder='email' name='email' id='email'
           value={register.email} onChange={handleState} /> 
           {error.email && <p className='form__error__msg'>{error.email}</p>}
        </div>

      <div className="input__grp">
        <label htmlFor='password'>Password {error.password && <span className='form__error__sign'>  *</span>}</label>
        <input type="password" placeholder='password must be at least 8 character' 
        name='password' id='password' value={register.password} onChange={handleState} /> 
        {error.password && <p className='form__error__msg'>{error.password}</p>}
      </div>

      <button type="submit" disabled={isSubmiting}  className={isSubmiting ? "submit-btn btn disabled_btn": "submit-btn btn"}>
      {isSubmiting ? 'Checking...' : 'Register'}
      </button>
        
        </form>

      <div className="msg__container">
        <p className='msg__container__r_msg1'>Already have a account ?</p>
       <Link to={"/login"} className='link msg__container__msg2'><p>Login Now</p></Link> 
      </div>
      
      
      </div>


    
    
    
    </div>

 
  )
}

export default Register;