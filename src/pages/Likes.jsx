import React from 'react';
import Header from '../components/Header';
import ImageSlider from '../components/ImageSlider';

import { AiOutlineFileText } from 'react-icons/ai';

const Likes = () => {

  const images = [
    'https://images.unsplash.com/photo-1647891938250-954addeb9c51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8OHx8YWR2ZW50dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1611124600582-c9ef0e977585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1480812494744-bfed1358a9b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1465310477141-6fb93167a273?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1647891938250-954addeb9c51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8OHx8YWR2ZW50dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1611124600582-c9ef0e977585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1480812494744-bfed1358a9b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1465310477141-6fb93167a273?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  ]

  return (
    
    <div className="likes">
    
      <Header title={"Liked"}
      description={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Minima excepturi perspiciatis aperiam inventore! lo excepturi perspiciatis aperiam inventore! lo`} />
      
      <div className="liked__image__container">
      
        <ImageSlider slider={images} />
      
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