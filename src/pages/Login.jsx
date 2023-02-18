import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    
    <div className="login form__container">
    
      <Link to={"/"} className='link'><h2 className='fs'>Memories</h2></Link>
      <p className='form__container__subheader'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit earum delectus fugit.</p>

      <div className="form">
      
        <h3 className="text-center">Login</h3>
        <form>

        <div className="input__grp">
          <label htmlFor='user'>Username or Email</label>
          <input type="text" placeholder='write your username or email' name='user' id='user' /> 
        </div>

      <div className="input__grp">
        <label htmlFor='password'>Password</label>
        <input type="password" placeholder='write your password' name='password' id='password' /> 
      </div>

      <div className="submit-btn btn">Submit</div>
        
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