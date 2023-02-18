import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { GoSignOut } from 'react-icons/go';
import { MdLocalActivity } from 'react-icons/md';
import { Link } from 'react-router-dom';

/* no photo */
import noPhoto from '../assets/7612643-nophoto.png';

const Menu = () => {
  const userid =  `108208jdjciwjap[q]`;
  const userInformation = {username: "", email: "", password: "", file: ""};
  return (
    
    <React.Fragment>

    <div className="profile__container">
      <div className="profile__picture">
      
        {
          userInformation.file ?
          (<img src={userInformation.file} alt="profile file" title={userInformation.username} />)
          :<img src={noPhoto} alt="no file" />
        }
      
      </div>

      <div className="profile__info">
        <h4>john doe</h4>
        
        <div className="results">
          
          <div className='r_activity'>
            <span className='icon left'><MdLocalActivity style={{ color
            : 'green'}} /></span>
            <span className='number'>10</span>
            
          </div>

          <div className='r_activity'>
            
            <span className='icon right'><AiFillLike style={{ color
            : '#e5a55d'}} /></span>
             <span className='number'>20</span>

          </div>
        
          </div>
        
      </div>
  
      {/* profile hover menu */}

      <div className="profile__hover__menu">
      
              <div className="profile__owner">
                <h2>John Doe</h2>
              </div>

              <div className="profile__hover__info">
              
              <Link className='link' to={`/profile/auth/${userid}`}><div>
                  <span><CgProfile/></span>
                  <span>Profile</span>
                </div></Link>
                
                <Link className='link' to={`/profile/auth/${userid}/likes`}><div>
                  <span><AiFillLike/></span>
                  <span>Memory</span>
                </div></Link>
                
                <Link className='link' to={`/profile/auth/${userid}/activity`}><div>
                  <span><MdLocalActivity/></span>
                  <span>Activity</span>
                </div></Link>
               
                <div>
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