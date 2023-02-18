import React from 'react'
import { Link } from 'react-router-dom'
import error from "../assets/error.png"

const PageNotFound = ({status,message}) => {
  return (
    <div className='error__page'>
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