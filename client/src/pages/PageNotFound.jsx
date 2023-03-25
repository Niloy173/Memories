import React from 'react'
import { Link } from 'react-router-dom'
import error from "../assets/error.png"
import SEO from '../util/SeoSetup'

const PageNotFound = ({status,message}) => {
  return (
    <div className='error__page'>

      <SEO image={"https://res.cloudinary.com/di8xxkudu/image/upload/v1679747300/upload/favicon_gvihzp.jpg"}
      title={"Not Found Page"} description={"No page found with the current url"} link={window.location.href} />
      <img src={error} alt="error" />
      <h2>This is error page</h2>
      <p>
        <span>{status}!</span> {message}
      </p>

      <p className="redirect__link"><Link className='link' to={"/"}>Go Back To Hompage</Link></p>
    </div>
  )
}

export default PageNotFound