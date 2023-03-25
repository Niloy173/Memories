import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

/* icons */
import { FaUserPlus } from 'react-icons/fa';
import { MdEmail, MdLocalActivity } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

import { AiOutlineLike } from 'react-icons/ai';
import { BsImageFill } from 'react-icons/bs';

/* no photo */

/* toast msg */
import ToastMsg from '../util/ToastMsg';

/* no photo */
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../context/Context';
import Skeleton from '../skeleton/Skeleton';
import SEO from '../util/SeoSetup';


const Profile = () => {

  const {user, authDispatch,loading} = useContext(AuthContext);
  const decoded = jwtDecode(user);

  const InitalInformation = { username: decoded.username, email: decoded.email, password: "", photo: decoded.photo};
  const [profile,setprofile] = useState({ username: "", email: "", password: "", photo: ""});
 
  const [error, setError] = useState({});
  const [isSubmiting, setIsSubmiting] = useState(false);


  const changeInputState = (e) => {
    const {name, value} = e.target;

    if(e.target.files && e.target.files.length > 0){
      setprofile({...profile, [name]: e.target.files[0]});
    }
    
    if(name === "username" || name === "password" || name === "email"){
      setprofile({...profile, [name]:value})
    }
  }

  const CancelRequest = (e) => {
    setError({});
    setprofile({...profile, username: "", password: "", photo:"", email: ""});
  }

  const handleUpdate = async (e) => {

    const error = {};
    const updatedInformation = {};
    setIsSubmiting(prev => !prev);

    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

   
    if(profile.username && profile.username.length < 4){
        error.username = "username is too short or empty"
    }
  
    if(profile.password && !(profile.password.length >= 4 && profile.password.length <=8)){
        error.password = "password must contain (4-8) characters"
      }
  
    if(profile.email && !regex.test(profile.email)){
        error.email = "Invalid email address";
      }
      
    if(profile.photo && profile.photo.size > 3*1024*1024){
        error.file = "file must be less than 3MB";
      }
  
    if(Object.keys(error).length > 0){
        setIsSubmiting(prev => !prev);
        setError(error);
  
      }else{

        if(profile.photo){

          const formData = new FormData();
          formData.append("file", profile.photo);
          formData.append("upload_preset","upload");

          try {

            const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData);
            const {secure_url} = res.data;
            updatedInformation.photo = secure_url;
            
          } catch (error) {
            // upload failed
            updatedInformation.photo = InitalInformation.photo;
            ToastMsg(error.response.data.message, false);
          }

        }else{
          updatedInformation.photo = InitalInformation.photo;
        }

        updatedInformation.email = profile.email ? profile.email : InitalInformation.email;
        updatedInformation.username = profile.username ? profile.username : InitalInformation.username;
        updatedInformation.password = profile.password && profile.password 

        authDispatch({ type: "UPDATE_START"});
        try {

          const response = await axios.put(`/api/user/update/${decoded.id}`,updatedInformation,{
            headers: {'authorization': user} });
          
          authDispatch({type: "UPDATE_SUCCESS", payload: response.data});
        
          ToastMsg("Updated successfully", true, "BOTTOM_CENTER");

          setError({});
          setIsSubmiting(prev => !prev);
          setprofile({...profile,  username: "", password: "", photo:"", email: ""});
          
          
        } catch (error) {
            
            authDispatch({type: "UPDATE_FAILURE"});
            ToastMsg(error.response.data.message, false);
        }

  
      }

  }


  return (

   
    loading ? <Skeleton type={"custom"} /> :

    <React.Fragment>

    <div className="profile__section container">

      <SEO image={"https://res.cloudinary.com/di8xxkudu/image/upload/v1679747300/upload/favicon_gvihzp.jpg"}
      title={"Profile page"} description={"Describes user profile informations"} link={window.location.href} />
    
      <div className="common__header">
      
        <span className='common__header__home'>
          <Link to={"/"} className="link">Home</Link>
        </span>

        <h3 className='fs'>My <Link className='link' to={`/profile/auth/${decoded.id}/me`}>
        <span>Profile</span></Link>
        </h3>
        
        <div className="line__border"></div>
      
      </div>


      <div className="profile__activites">
      
        <div className="profile__activites__common">
            <AiOutlineLike className='icon'/>
            <Link className='link' to={`/profile/auth/${decoded.id}/likes`}><span>Liked Memories</span></Link>
        </div>

        <div className="profile__activites__common">
            <MdLocalActivity className='icon'/>
            <Link className='link' to={`/profile/auth/${decoded.id}/activity`}><span>Activites</span></Link>
        </div>
      
      </div>


     
      <div className="about__section">

        <h2 className="about__title">About <br/> <span>{InitalInformation.username}</span> </h2> 
      
      
        <div className="about__left">

         
          <div className="profile__change">
              <BsImageFill className='profile__change__icon'/>
              <label htmlFor='image'>change image</label>
              <input id='image' name='photo'  type={"file"} onChange={changeInputState} />
          </div>
          {error.file && <p className='error__msg file__error'>{error.file}</p>}
        
          <div className="about__image">
            
            <div className="about__image-bg"></div>

            <div className="about__image-lg">
              {
                profile.photo ?
                (<img title={profile.photo.name}  src={URL.createObjectURL(profile.photo)} alt="uploaded file" />)
                :<img src={InitalInformation.photo} alt={InitalInformation.username} />
              }
            </div>

            <div className="about__image-sm">
              {
             
                profile.photo ?
              (<img title={profile.photo.name}  src={URL.createObjectURL(profile.photo)} alt="uploaded file" />)
              :<img src={InitalInformation.photo} alt={InitalInformation.username} />

              }
            </div>
            
          </div>

        
        </div>


        <div className="about__right">
        

            <div className="about__right__username input__grp">
            
            <label htmlFor='username'>Username{ error.username && <span className='error__sign'>  *</span>}</label>
            <input id='username' type="text" name="username" placeholder={InitalInformation.username}
            value={profile.username} onChange={changeInputState} />
            <span title='username' className='profile__icon'><FaUserPlus/></span>

            {error.username && <p className='error__msg'>{error.username}</p>}
          
          </div>


          <div className="about__right__email input__grp">
          
            <label htmlFor='email'>Email{ error.email && <span className='error__sign'> *</span>}</label>
            <input id='email' type="text" name="email" placeholder={InitalInformation.email}
            value={profile.email} onChange={changeInputState} />
            <span title='email' className='profile__icon'><MdEmail/></span>

            {error.email && <p className='error__msg'>{error.email}</p>}
          
          </div>


          <div className="about__right__password input__grp">
          
            <label htmlFor='password'>Password{ error.password && <span className='error__sign'>  *</span>}</label>
            <input id='password' type="password" name="password" placeholder={"password must contain (4-8) characters"}
             value={profile.password} onChange={changeInputState} />
            <span title='password' className='profile__icon'><RiLockPasswordFill/></span>

            {error.password && <p className='error__msg'>{error.password}</p>}

          </div>

            {
              (profile.photo || profile.username || profile.email || profile.password) &&
              (
                <React.Fragment>

                <button type='button' disabled={isSubmiting}   className={isSubmiting ? "submit-btn btn disabled_btn": "submit-btn btn"}
                 onClick={handleUpdate}> {isSubmiting ? 'Checking...' : 'Save'}
                </button>
                <button type='button' disabled={isSubmiting} className={isSubmiting ? "cancel-btn disabled_btn": "cancel-btn"} onClick={CancelRequest}>Cancel</button>

                </React.Fragment>
              )
              // :<button type='button'  className={"submit-btn btn disabled"} onClick={debouncedUpdate}>Save</button>
            }
          
          
       

        
        </div>
      
      
      </div>
      
      
    

    </div>

    </React.Fragment>


  )
}

export default Profile