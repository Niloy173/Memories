import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* icons */
import { FaUserPlus } from 'react-icons/fa';
import { MdEmail, MdLocalActivity } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import { AiOutlineLike } from 'react-icons/ai';
import { BsImageFill } from 'react-icons/bs';

/* toast msg */
import ToastMsg from '../util/ToastMsg';

/* no photo */
import noPhoto from '../assets/7612643-nophoto.png';


const Profile = () => {

  const userid = `108208jdjciwjap[q]`;
  const userInformation = { username: "john Doe", email: "johndoe@gmail.com",file:""};
  const InitialState = {username: "", email: "", password: "", file: ""};
  const [data, setData] = useState(InitialState);
  const [error, setError] = useState({});
  const [isSubmiting, setIsSubmiting] = useState(false);


  const changeInputState = (e) => {
    const {name, value} = e.target;

    if(e.target.files && e.target.files.length > 0){
      setData({...data, [name]: e.target.files[0]});
    }
    
    if(name === "username" || name === "password" || name === "email"){
      setData({...data, [name]:value})
    }
  }

  const CancelRequest = (e) => {
    setError({});
    setData({...data, ...InitialState});
  }

  const handleUpdate = (e) => {

    const error = {};
    setIsSubmiting(prev => !prev);

    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

    if(Object.values(data).some(v => v !== ''))
    {
      if(data.username && data.username.length < 4){
        error.username = "username is too short or empty"
      }
  
      if(data.password && !(data.password.length >= 4 && data.password.length <=8)){
        error.password = "password must contain (4-8) characters"
      }
  
      if(data.email && !regex.test(data.email)){
        error.email = "Invalid email address";
      }
      
      if(data.file && data.file.size > 2*1024*1024){
        error.file = "file must be less than 2MB";
      }
  
      if(Object.keys(error).length > 0){
        setIsSubmiting(prev => !prev);
        setError(error);
  
      }else{

        // make your api request
        setError({});
        setIsSubmiting(prev => !prev);
        setData(InitialState);
        ToastMsg("Updated successfully", true, "BOTTOM_CENTER");
  
      }
    }else{
      setIsSubmiting(prev => !prev);
      ToastMsg("Nothing to update", true, "BOTTOM_CENTER");
    }

  
    
  }


  return (

   
    <div className="profile__section container">
    
      <div className="common__header">
      
        <span className='common__header__home'>
          <Link to={"/"} className="link">Home</Link>
        </span>

        <h3 className='fs'>My <Link className='link' to={`/profile/auth/${userid}`}>
        <span>Profile</span></Link>
        </h3>
        
        <div className="line__border"></div>
      
      </div>


      <div className="profile__activites">
      
        <div className="profile__activites__common">
            <AiOutlineLike className='icon'/>
            <Link className='link' to={`/profile/auth/${userid}/likes`}><span>Liked Memories</span></Link>
        </div>

        <div className="profile__activites__common">
            <MdLocalActivity className='icon'/>
            <Link className='link' to={`/profile/auth/${userid}/activity`}><span>Activites</span></Link>
        </div>
      
      </div>


      <div className="about__section">

        <h2 className="about__title">About <br/> <span>John Doe</span> </h2> 
      
      
        <div className="about__left">

         
          <div className="profile__change">
              <BsImageFill className='profile__change__icon'/>
              <label htmlFor='image'>change image</label>
              <input id='image' name='file'  type={"file"} onChange={changeInputState} />
          </div>
          {error.file && <p className='error__msg file__error'>{error.file}</p>}
        
          <div className="about__image">
            
            <div className="about__image-bg"></div>

            <div className="about__image-lg">
              {
                data.file ?
                (<img title={data.file.name}  src={URL.createObjectURL(data.file)} alt="uploaded file" />)
                :userInformation.file ?
                (<img src={userInformation.file} alt="profile file" title={userInformation.username} />)
                :<img src={noPhoto} alt="no file" />
              }
            </div>

            <div className="about__image-sm">
              {
             
                data.file ?
              (<img title={data.file.name}  src={URL.createObjectURL(data.file)} alt="uploaded file" />)
              :userInformation.file ?
              (<img src={userInformation.file} alt="profile file" title={userInformation.username} />)
              :<img src={noPhoto} alt="no file" />

              }
            </div>
            
          </div>

        
        </div>


        <div className="about__right">
        

            <div className="about__right__username input__grp">
            
            <label htmlFor='username'>Username{ error.username && <span className='error__sign'>  *</span>}</label>
            <input id='username' type="text" name="username" placeholder={userInformation.username}
            value={data.username} onChange={changeInputState} />
            <span title='username' className='profile__icon'><FaUserPlus/></span>

            {error.username && <p className='error__msg'>{error.username}</p>}
          
          </div>


          <div className="about__right__email input__grp">
          
            <label htmlFor='email'>Email{ error.email && <span className='error__sign'> *</span>}</label>
            <input id='email' type="text" name="email" placeholder={userInformation.email}
            value={data.email} onChange={changeInputState} />
            <span title='email' className='profile__icon'><MdEmail/></span>

            {error.email && <p className='error__msg'>{error.email}</p>}
          
          </div>


          <div className="about__right__password input__grp">
          
            <label htmlFor='password'>Password{ error.password && <span className='error__sign'>  *</span>}</label>
            <input id='password' type="password" name="password" placeholder={"password must contain (4-8) characters"}
             value={data.password} onChange={changeInputState} />
            <span title='password' className='profile__icon'><RiLockPasswordFill/></span>

            {error.password && <p className='error__msg'>{error.password}</p>}

          </div>

            {
              (data.file || data.username || data.email || data.password) &&
              (
                <React.Fragment>

                <button type='button' disabled={isSubmiting}  className={"submit-btn btn"} onClick={handleUpdate}>
                {isSubmiting ? 'Checking...' : 'Save'}
                </button>
                <button type='button' className={"cancel-btn"} onClick={CancelRequest}>Cancel</button>

                </React.Fragment>
              )
              // :<button type='button'  className={"submit-btn btn disabled"} onClick={debouncedUpdate}>Save</button>
            }
          
          
       

        
        </div>
      
      
      </div>
      
    

    </div>



  )
}

export default Profile