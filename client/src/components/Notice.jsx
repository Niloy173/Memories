import React from 'react';
import { Link } from 'react-router-dom';

const Notice = ({notification}) => {


  const timeStamp = (d) => {

  const date = new Date(d);
  const now = new Date();
  const diff = now - date;

  // convert milliseconds to seconds, minutes, hours, days, or weeks as appropriate
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  // choose the appropriate unit and return the formatted time string
  if (weeks > 0) {
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  } else if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else {
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  }

}

  return (

    <div className="single__notification">
          
            <div className="single__notification__profile">
            
              <img src={notification.user.image} title={notification.user.name} alt={notification.user.name} />

            </div>


            <div className="single__notification__details">
            
              <p className='single__notification__details__user'>
                <b><Link className='link' to={`/?userid=${notification.user.id}&username=${notification.user.name}`}>{notification.user.name} </Link></b> 
                {notification.reaction} 
                {notification.reaction === 'commented' ? ' on your': ' your' } 
              <b><Link className='link' to={`/memory/${notification.memory.id}`}> post</Link></b> </p>
              
              <span className='single__notification__details__title'>{notification.memory.title}</span>
              
              <span className='single__notification__details__time'> {timeStamp(notification.createdAt)}  </span>
            
            </div>

            
            <div className="single__notification__post">
            
              <Link className='link' to={`/memory/${notification.memory.id}`}><img src={notification.memory.image} alt='memory' /></Link>

            </div>
          
          </div>
  )
}

export default Notice