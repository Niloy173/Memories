import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    
    <div className="register form__container">
    
    <Link to={"/"} className='link'><h2 className='fs'>Memories</h2></Link>
      <p className='form__container__subheader'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit earum delectus fugit.</p>

      <div className="form">
      
        <h3 className="text-center">Register</h3>
        <form>

        <div className="input__grp">
          <label htmlFor='username'>Username</label>
          <input type="text" placeholder='username' name='username' id='username' /> 
        </div>

        <div className="input__grp">
          <label htmlFor='user'>Email</label>
          <input type="email" placeholder='email' name='email' id='email' /> 
        </div>

      <div className="input__grp">
        <label htmlFor='password'>Password</label>
        <input type="password" placeholder='password must be at least 8 character' name='password' id='password' /> 
      </div>

      <div className="submit-btn btn">Register</div>
        
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