import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';

import axios from 'axios';
import { AiOutlineFileText } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import { AuthContext } from '../context/Context';
import Skeleton from '../skeleton/Skeleton';
import ToastMsg from '../util/ToastMsg';

/* quotes */
import Quote from '../util/Quotes';
import SEO from '../util/SeoSetup';

const Likes = () => {

  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState([]);

  const userid = useLocation().pathname.split('/').reverse()[1];

  useEffect(() => {
    
    const FetchRequest = async () => {
      
      setLoading(true);
      try {

        const response = await axios.get(`/api/user/${userid}/likes`,{
          headers: { 'authorization': user }
        });

        setLikes(response.data);
        // console.log(response.data);


        
      } catch (error) {
        ToastMsg(error.response.data.message, false);
      }

      setLoading(false);

    }

    FetchRequest();
  },[userid,user])

  return (
    
    <div className="likes">

      <SEO image={"https://res.cloudinary.com/di8xxkudu/image/upload/v1679747300/upload/favicon_gvihzp.jpg"} 
      title="Likes Page" description={"Description of user liked content"} link={window.location.href} />
    
      <Header title={"Liked"}
      description={Quote[Math.floor(Math.random()*Quote.length)]} />
      
      <div className="liked__image__container">
      
        {
          loading ? <Skeleton type="custom" /> :
          likes.length > 0 ? <ImageSlider slider={likes} /> :
          <span className='no_data'>No Likes Found</span>
        }
      
      </div>


      <div className="side__note slide__note__one">
      
       <ul>

          <li><AiOutlineFileText className='icon'/> Memories: moments of our lives </li>

          <li>{Quote[Math.floor(Math.random() * Quote.length)]}</li>
       
       </ul>
      
      </div>


      <div className="side__note slide__note__two">
      
      <ul>

         <li><AiOutlineFileText className='icon'/> Memories: moments of our lives </li>

         <li>{Quote[Math.floor(Math.random() * Quote.length)]}</li>
      
      </ul>
     
     </div>

      
      
    </div>
  )
}

export default Likes