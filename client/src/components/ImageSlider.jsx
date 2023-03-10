import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const ImageSlider = ({slider}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const sliderImage = {
    backgroundImage: `url(${slider[currentIndex].photo})`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '10px',
  }

  const IncrementIndex = () => {

    const currentIndexToShow = currentIndex >= slider.length - 1  ? 0: currentIndex + 1;
    setCurrentIndex(currentIndexToShow);
  }

  const DecrementIndex = () => {

    const currentIndexToShow = currentIndex === 0 ? slider.length - 1 : currentIndex - 1;
    setCurrentIndex(currentIndexToShow);
  }
  
  return (
    
    <motion.div layout className="sliderImages">

      <div className="left__arrow common__slider__design"><IoIosArrowBack className='arrow' onClick={DecrementIndex}/></div>
      <div style={sliderImage}></div>
      <div className="right__arrow common__slider__design"><IoIosArrowForward className='arrow' onClick={IncrementIndex}/></div>

      {/* explore now */}
      <Link className='link' to={`/memory/${slider[currentIndex]._id}`}>
      <div className="explore__now common__slider__design">Explore now</div>
      </Link>

      <div className='slidenav'>

        <h4>Liked Memories</h4>
        {
          <ul>
            {slider.map((slider,slideIndex) => (
              
              <li className={currentIndex === slideIndex ? "active_title": ""} 
              onClick={() => setCurrentIndex(slideIndex)} key={slideIndex}>  
              {slider.title.length > 60 ? slider.title.substring(0,60): slider.title} </li>
              
            ))}
          </ul>
        }
      </div>

    </motion.div>
  )
}

export default ImageSlider