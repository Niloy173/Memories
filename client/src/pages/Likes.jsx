import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';

import axios from 'axios';
import { AiOutlineFileText } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/Context';
import Skeleton from '../skeleton/Skeleton';
import ToastMsg from '../util/ToastMsg';

const Likes = () => {

  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState([]);

  const userid = useLocation().pathname.split('/').reverse()[1];

  useEffect(() => {
    
    const FetchRequest = async () => {
      
      setLoading(true);
      try {

        const response = await axios.get(`/api/user/memory/${userid}/likes`,{
          headers: { 'authorization': user }
        });

        setLikes(response.data);
        
      } catch (error) {
        ToastMsg(error.response.data.message, false);
      }

      setLoading(false);

    }

    FetchRequest();
  },[userid,user])

  return (
    
    <div className="likes">
    
      <Header title={"Liked"}
      description={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Minima excepturi perspiciatis aperiam inventore! lo excepturi perspiciatis aperiam inventore! lo`} />
      
      <div className="liked__image__container">
      
        {
          loading ? <Skeleton type="custom" /> :
          likes.length > 0 ? "Data Found": /*<ImageSlider slider={likes} /> */
          <span className='no_data'>No Likes Found</span>
        }
      
      </div>


      <div className="side__note slide__note__one">
      
       <ul>

          <li><AiOutlineFileText className='icon'/> Lorem ipsum dolor sit, amet c</li>

          <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Repellendus reprpsam iusto modi!</li>
       
       </ul>
      
      </div>


      <div className="side__note slide__note__two">
      
      <ul>

         <li><AiOutlineFileText className='icon'/> Lorem ipsum dolor sit, amet c</li>

         <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
         Repellendus reprpsam iusto modi!</li>
      
      </ul>
     
     </div>

      
      
    </div>
  )
}

export default Likes