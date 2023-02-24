import React from 'react';

const StoryDetails = ({ title, description }) => {
  return (
   
    <React.Fragment>
    
    <div className="story__title main__story__space">
      <h3 className='story__title__desc'>{title}</h3>
    </div>

    <div className="full__story">

      <p style={{whiteSpace: "pre-wrap"}} className='full__story__desc main__story__space'>

       {description}

      </p>

    </div>
    
    </React.Fragment>
  )
}

export default StoryDetails;