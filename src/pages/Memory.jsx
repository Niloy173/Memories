import React from 'react';
import { Link } from 'react-router-dom';

import { AiOutlineFileText } from 'react-icons/ai';
import Author from '../components/MainStory/Author';
import Comment from '../components/MainStory/Comment';
import Reaction from '../components/MainStory/Reaction';
import StoryDetails from '../components/MainStory/StoryDetails';


const Memory = () => {
  return (
    
    <div className="main__memory container">
    
      <div className="common__header">
      
        <span className='common__header__home'>
          <Link to={"/"} className="link">Home</Link>
        </span>

      </div>


      <div className="main__story">
      
      
        <div className="main__story__cover">
          
          <div className="story__cover">
            <img src="https://images.unsplash.com/photo-1587502538004-e9ec84b491c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="main__story" title='Memory cover' />

            <Reaction />
            
          </div>
          
        </div>
        <div className="main__story__author">
          <Author/>
        </div>

          
      
      </div>

      <div className="main__story__details">
       
        <div className="main__story__details__section1">
          <StoryDetails />
          
        </div>

        <div className="main__story__details__section2">
          
          <div className="side__note main__story__details__section2__div">
        
            <ul>
      
              <li><AiOutlineFileText className='icon'/> Lorem ipsum dolor sit, amet c</li>
      
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Repellendus reprpsam iusto modi!</li>
            
            </ul>
        
          </div>

          <div className="side__note main__story__details__section2__div">
        
            <ul>
      
              <li><AiOutlineFileText className='icon'/> Lorem ipsum dolor sit, amet c</li>
      
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Repellendus reprpsam iusto modi!</li>
            
            </ul>
      
          </div>

          <Comment />

        </div>
      
      </div>
      



    </div>
  )
}

export default Memory