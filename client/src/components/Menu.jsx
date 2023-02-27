import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AiFillLike, AiFillNotification } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { GoSignOut } from 'react-icons/go';
import { MdLocalActivity } from 'react-icons/md';
import { Link } from 'react-router-dom';

/* no photo */
import noPhoto from '../assets/7612643-nophoto.png';
import { ActivityContext, AuthContext } from '../context/Context';
import JwtDecoder from '../util/DecodeToken';
import ToastMsg from '../util/ToastMsg';

const Menu = ({socket}) => {


  const {user,authDispatch} = useContext(AuthContext);
  const [numberofnotifications, setNumberOfNotifications] = useState([]);
  const {activity, activityDispatch} = useContext(ActivityContext);
  const decoded = JwtDecoder(user);

  useEffect(() => {

    if(user){
      
      axios.get(`/api/notifications?read=false`,{
        headers: { 'authorization': user }
      })
      .then(response =>{
        setNumberOfNotifications(response.data);
      })
      .catch(err =>{
        ToastMsg(err.message, false);
      })
    }

    socket && socket.on("getNotifications",data => {
      setNumberOfNotifications(prev => [...prev, data]);
    })

  },[socket,user])

  // console.log(numberofnotifications);

  const SignOut = () =>  {
    activityDispatch({ type: 'CLOSE_ACTIVITY'});
    authDispatch({ type: 'LOG_OUT' });
  }

  return (
    
    <React.Fragment>

    <div className="profile__container">
      
       
        

        <div className="profile__picture">
      
        {
          decoded.photo ?
          (<img src={decoded.photo} alt="profile file" title={decoded.username} />)
          :<img src={noPhoto} alt="no file" />
        }
      
      </div>

      <div className="profile__info">
        <h4>{decoded.username}</h4>
        
        <div className="results">
          
          <div className='r_activity'>
            <span title='created memories' className='icon left'><MdLocalActivity style={{ color
            : 'green'}} /></span>
            <span className='number'>{activity.memories.length}</span>
            
          </div>

          {/*<div className='r_activity'>
            
            <span title='liked memories' className='icon right'><AiFillLike style={{ color
            : '#e5a55d'}} /></span>
             <span className='number'>{activity.likes.length}</span>

            </div>*/}
        
          </div>
        
      </div>

   
      
  
      {/* profile hover menu */}

      <div className="profile__hover__menu">
      
              <div className="profile__owner">
                <h2>{decoded.username}</h2>
              </div>

              <div className="profile__hover__info">
              
              <Link className='link' to={`/profile/auth/${decoded.id}/me`}><div>
                  <span><CgProfile/></span>
                  <span>Profile</span>
                </div></Link>
                
                <Link className='link' to={`/profile/auth/${decoded.id}/likes`}><div>
                  <span><AiFillLike/></span>
                  <span>Memory</span>
                </div></Link>


                
                <Link className='link'  to={{
                  pathname: `/profile/auth/${decoded.id}/notifications`,
                }}><div>
                  {
                    numberofnotifications.length > 0 ?
                    (<div className='notification__count'>
                    <p>{numberofnotifications.length}</p>
                    <span><AiFillNotification/></span>
                  </div>) :  <span><AiFillNotification/></span>
                  }
                  <span>Notices</span>
                </div></Link>
                
                <Link className='link' to={`/profile/auth/${decoded.id}/activity`}><div>
                  <span><MdLocalActivity/></span>
                  <span>Activity</span>
                </div></Link>
               
                <div onClick={SignOut}>
                  <span><GoSignOut/></span>
                  <span>SignOut</span>
                </div>
              
              </div>
      
      </div>

    </div>
      
   

    </React.Fragment>
   
  )
}

export default Menu;