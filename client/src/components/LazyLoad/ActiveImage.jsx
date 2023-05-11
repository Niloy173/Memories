import React, { useState } from 'react';

const ActiveImage = ({src, alt, classname}) => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <img 
    className={classname}
    src={src} alt={alt} 
    onLoad={() => setIsLoading(true)}
    style={{ filter : isLoading ? 'none': 'blur(10px)' }}
    />
  )
}

export default ActiveImage;