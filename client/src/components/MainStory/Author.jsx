import React from 'react';
import { MdLocalActivity } from 'react-icons/md';
import { Link } from 'react-router-dom';

/* no photo */
import noPhoto from '../../assets/7612643-nophoto.png';

const Author = ({author}) => {
  
  return (
    
    <div className="author__details">
    
      <h3>Author Details</h3>

      <div className="profile__details">
      
        <div className="profile__details__img">
        
          <img src={author.photo ? author.photo : noPhoto } 
          alt={author.username} />

          <div className="profile__details__img__info">
        
          <h4>{author.username}</h4>

          <div className="profile__details__img__info__activity">
          
            <div>
              <MdLocalActivity className='icon left' title='memories created' style={{ color
              : 'green'}} />
              <span className='number'>{author.memories.length}</span>
              
            </div>

            {/*<div>
              
              <AiFillLike className='icon right' title='likes achieved' style={{ color
              : '#e5a55d'}} />
              <span className='number'>{author.likes.length}</span>

              </div>*/}
        
          </div>

          </div>
        
        </div>
          
        
        <div className="profile__details__checkMemories">
          <Link className='link' to={`/?userid=${author._id}`}>
            {/*<MdLocalActivity className='icon'/>*/}
            <span>See my memories</span>
          </Link>
        </div>
       

      
      </div>
    
    </div>
  )
}

export default Author