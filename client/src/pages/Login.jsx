import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckAuthError from '../util/AuthErrorVerify';

const Login = () => {

  const InitialState = { Luser: "", Lpass: ""}
  const [login, setLogin] = useState(InitialState);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleState = (e) => {
    const {name, value} = e.target;
    setLogin({...login, [name]: value});

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmiting(prev => !prev);

    const error = CheckAuthError(login, "login");

    console.log(error);

    if(Object.keys(error).length > 0){
      setIsSubmiting(prev => !prev);
      setError(error);
    }else{
      setError({});
      setIsSubmiting(prev => !prev);
      navigate("/");
    }
  }

  return (
    
    <div className="login form__container">
    
      <Link to={"/"} className='link'><h2 className='fs'>Memories</h2></Link>
      <p className='form__container__subheader'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit earum delectus fugit.</p>

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

      <button type='submit' disabled={isSubmiting} className="submit-btn btn">
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