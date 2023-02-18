import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const ImageSlider = ({slider}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const sliderImage = {
    backgroundImage: `url(${slider[currentIndex]})`,
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
    
    <div className="sliderImages">

      <div className="left__arrow common__slider__design"><IoIosArrowBack className='arrow' onClick={DecrementIndex}/></div>
      <div style={sliderImage}></div>
      <div className="right__arrow common__slider__design"><IoIosArrowForward className='arrow' onClick={IncrementIndex}/></div>

      {/* explore now */}
      <div className="explore__now common__slider__design">Explore now</div>

      <div className='slidenav'>

        <h4>Liked Memories</h4>
        {
          <ul>
            {slider.map((slider,slideIndex) => (
              
              <li className={currentIndex === slideIndex ? "active_title": ""} 
              onClick={() => setCurrentIndex(slideIndex)} key={slideIndex}>  
              Memory Title Lorem ipsum dolor sit amet. </li>
              
            ))}
          </ul>
        }
      </div>

    </div>
  )
}

export default ImageSlider