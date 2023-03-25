import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ActivityContext, AuthContext } from '../context/Context';

import CheckAuthError from '../util/AuthErrorVerify';
import ToastMsg from '../util/ToastMsg';

/* quotes */
import Quote from '../util/Quotes';
import SEO from '../util/SeoSetup';

const Login = () => {

  const InitialState = { Luser: "", Lpass: ""}
  const [login, setLogin] = useState(InitialState);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const {authDispatch} = useContext(AuthContext);
  const {activityDispatch} = useContext(ActivityContext);

  const handleState = (e) => {
    const {name, value} = e.target;
    setLogin({...login, [name]: value});

  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmiting(prev => !prev);
    authDispatch({ type: 'LOGIN_START'});

    const error = CheckAuthError(login, "login");


    if(Object.keys(error).length > 0){
      setIsSubmiting(prev => !prev);
      setError(error);
    }else{
      
      try {
        
        const response = await axios.post(`/api/auth/login`,{
          user: login.Luser,
          password: login.Lpass
        });

        
        activityDispatch({ type: 'ADD_ACTIVITY', payload: { memories: response.data.activity, likes: response.data.likes, dislikes: response.data.dislikes  } })
        authDispatch({ type: 'LOGIN_SUCCESS', payload: response.data.token });
        navigate("/");
      } catch (error) {
        
        ToastMsg(error.response.data.message, false);
        setIsSubmiting(prev => !prev);
        authDispatch({ type: 'LOGIN_FAILURE' });
      }
      
    }
  }

  return (
    
    <div className="login form__container">
    
    <SEO image={"https://res.cloudinary.com/di8xxkudu/image/upload/v1679747300/upload/favicon_gvihzp.jpg"}
    title={"Login Page"} description={"user login | Memories"} link={window.location.href} />

      <Link to={"/"} className='link'><h2 className='fs'>Memories</h2></Link>
      <motion.p layout className='form__container__subheader'>{Quote[Math.floor(Math.random() * Quote.length)]}</motion.p>

      <div className="form">
      
        <h3 className="text-center">Login</h3>
        <form onSubmit={handleSubmit}>

        <div className="input__grp">
          <label htmlFor='user'>Username or Email {error.user && <span className='form__error__sign'> *</span>} </label>
          <input type="text" placeholder='write your username or email' name='Luser' id='user'
          value={login.Luser} onChange={handleState} /> 
          {error.user && <p className='form__error__msg'>{error.user}</p>}
        </div>

      <div className="input__grp">
        <label htmlFor='password'>Password {error.pass && <span className='form__error__sign'>  *</span>}</label>
        <input type="password" placeholder='write your password' name='Lpass' id='password'
         value={login.Lpass} onChange={handleState} />
        {error.pass && <p className='form__error__msg'>{error.pass}</p>} 
      </div>

      <button  type='submit' disabled={isSubmiting} className={isSubmiting ? "submit-btn btn disabled_btn": "submit-btn btn"}>
        {isSubmiting ? 'Checking...' : 'Submit' }
      </button>
        
        </form>

      <div className="msg__container">
        <p className='msg__container__msg1'>Don't have a account ?</p>
       <Link to={"/register"} className='link msg__container__msg2'><p>Register Now</p></Link> 
      </div>
      
      </div>


    
    
    
    </div>
  )
}

export default Login