import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({title, description,image=null,link}) => {


  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={"Memories Stories Dreams Impression Reminder Recollection"} />
      <link rel="canonical" href={link} />


      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      

      
    </Helmet>
  )
}

export default SEO;