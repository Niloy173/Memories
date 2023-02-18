import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import { MdLocalActivity } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Author = () => {
  
  return (
    
    <div className="author__details">
    
      <h3>Author Details</h3>

      <div className="profile__details">
      
        <div className="profile__details__img">
        
          <img src="https://randomuser.me/api/portraits/men/31.jpg" alt="author" />

          <div className="profile__details__img__info">
        
          <h4>John Doe</h4>

          <div className="profile__details__img__info__activity">
          
            <div>
              <MdLocalActivity className='icon left' title='activites' style={{ color
              : 'green'}} />
              <span className='number'>10</span>
              
            </div>

            <div>
              
              <AiFillLike className='icon right' title='likes' style={{ color
              : '#e5a55d'}} />
              <span className='number'>20</span>

            </div>
        
          </div>

          </div>
        
        </div>
          
        <div className="profile__details__checkMemories">

          <MdLocalActivity className='icon'/>
          <Link className='link' to={`/profile/auth/${'ffhuhuhs8ds8'}/activity`}>
          <span>See my memories</span></Link>

        </div>  
       

      
      </div>
    
    </div>
  )
}

export default Author