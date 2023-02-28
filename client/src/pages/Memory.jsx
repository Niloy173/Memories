import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AiOutlineFileText } from 'react-icons/ai';
import Author from '../components/MainStory/Author';
import Comment from '../components/MainStory/Comment';
import Reaction from '../components/MainStory/Reaction';
import StoryDetails from '../components/MainStory/StoryDetails';
import Skeleton from '../skeleton/Skeleton';
import ToastMsg from '../util/ToastMsg';

/* Quote */
import Quote from '../util/Quotes';

const Memory = ({socket}) => {

  // const {user} = useContext(AuthContext);
  // const decoded = JwtDecoder(user);
  

  // const userid = decoded && decoded.id;
  const memoryId = useLocation().pathname.split('/').reverse()[0];

  

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  // console.log(data);

  const [action, setAction] = useState({ likes: 0, dislikes: 0 });
  const [comment, setComment] = useState([]);


  useEffect(() => {

    
    const FetchMemory = async () => {

      setLoading(true);
      
      try {

        const response = await axios.get(`/api/memory/${memoryId}`);
        setData(response.data.FindMemory);
        setComment(response.data.FindMemory.comments);
        setAction(response.data.FindMemory.activity);
    

      } catch (error) {
        ToastMsg(error.response.data.message, false);
      }

      setLoading(false);

    }

    FetchMemory();

  },[memoryId])



  return (
    
    <div className="main__memory container">
    
      <div className="common__header">
      
        <span className='common__header__home'>
          <Link to={"/"} className="link">Home</Link>
        </span>

      </div>


      {
        loading ? <Skeleton type={"memory"} /> :

        Object.keys(data).length > 0  &&
        
        <React.Fragment>

        <div className="main__story">
      
      
        <div className="main__story__cover">
          
          <div className="story__cover">
            <img src={data.photo} alt="main__story" title='Memory cover' />

            <Reaction action={action} setAction={setAction} author={data.author.username} socket={socket}   />
            
          </div>
          
        </div>
        <div className="main__story__author">
          <Author author={data.author} />
        </div>

          
      
      </div>

      <div className="main__story__details">
       
        <div className="main__story__details__section1">
          <StoryDetails title={data.title} description={data.description} />
        </div>

        <div className="main__story__details__section2">
          
          <div className="side__note main__story__details__section2__div">
        
            <ul>
      
              <li><AiOutlineFileText className='icon'/> Memories: moments of our lives </li>
      
              <li>{Quote[Math.floor(Math.random()*Quote.length)]}</li>
            
            </ul>
        
          </div>

          <div className="side__note main__story__details__section2__div">
        
            <ul>
      
              <li><AiOutlineFileText className='icon'/> Memories: moments of our lives </li>
      
              <li>{Quote[Math.floor(Math.random()*Quote.length)]}</li>
            
            </ul>
      
          </div>

          <Comment comment={comment} setComment={setComment} author={data.author} socket={socket} />

        </div>
      
      </div>
        
        
        </React.Fragment>
      }
      



    </div>
  )
}

export default Memory