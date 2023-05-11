import React from 'react';
import loadingImage from '../assets/imageLoading.png';

const Skeleton = ({type}) => {

  const CardSkeleton = () => {
    return (
      <div className="card__skeleton">
        <div className="card__skeleton__cover"></div>
        <div className="card__skeleton__details">
          <div className="card__skeleton__details_t"></div>
          <div className="card__skeleton__details_d"></div>
          <div className="card__skeleton__details_b"></div>
        </div> 
      </div>
    )
  }

  const ProfileSkeleton = () => {
    return (
      <div className="profile__skeleton">
        <div className="profile__skeleton__cover"></div>
        <div className="profile__skeleton__details">
          <div className="profile__skname"></div>
          <div className="profile__skAct"></div>
        </div>
      </div>
    )
  }

  const Custom = () => {
    return (
      <div className="custom__skeleton">
        <div className="parent__ball">
          <div className="child__ball ball_1"></div>
          <div className="child__ball ball_2"></div>
          <div className="child__ball ball_3"></div>
        </div>
        <span className="custom__txt">Loading Please wait ...</span>
      </div>
    )
  }

  const Spinner = () => {
    return (
      <div className='spinner__skeleton'>
        <div className="spinner"></div>
        <div>
          <span className="custom__txt">Please wait ...</span>
        </div>
      </div>
    )
  }

  const ImageLoader = () => {
    return (
      <div className="no__image__found">
        <img src={loadingImage} alt='not found' />
      </div>
    );
  }

  const BannerLoader = () => {
    return (
      <div className="no__banner__found">
        <img src={loadingImage} alt='not found' />
      </div>
    );
  }

  const SingleMemory = () => {
    return (
      <div className="single__skeleton">

        <div className="main__story__skeleton">
        
          <div className='main__story__skeleton__cover'>
            <div className='main__story__skeleton__cover__photo'></div>
            <div className='main__story__skeleton__cover__grid'></div>

          </div>
          
          <div className='main__story__skeleton__author'>

            <div className='main__story__skeleton__author__d1'></div>

            <div className='main__story__skeleton__author__d2'></div>

          </div>
        
        </div>

        <div className="story__details__skeleton">
        
          <div className='story__details__skeleton__paragraph'>
            <div className='story__details__skeleton__paragraph__p1'></div>
            <div className='story__details__skeleton__paragraph__p2'></div>
          </div>
          
          <div className='story__details__skeleton__sidebar'>
          
            <div className='story__details__skeleton__sidebar__box'></div>
            <div className='story__details__skeleton__sidebar__box'></div>
            <div className='story__details__skeleton__sidebar__box3'></div>
          
          </div>
      
        </div>

      </div>
    )
  }

  if(type === "card") return <CardSkeleton/>;
  if(type === "profile") return <ProfileSkeleton/>;
  if(type === "custom") return <Custom />;
  if(type === "memory") return <SingleMemory/>;
  if(type === "spinner") return <Spinner/>;
  if(type === "loadingImage") return <ImageLoader/>;
  if(type === "bannerImage") return <BannerLoader/>;
}

export default Skeleton;