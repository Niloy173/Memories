import React from 'react';

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

  if(type === "card") return <CardSkeleton/>;
  if(type === "profile") return <ProfileSkeleton/>;
  if(type === "custom") return <Custom />;
}

export default Skeleton;