import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({title, description}) => {
  return (
   
    <div className={title+"_memories common__header container"}>

        <span className='common__header__home'>
        <Link to={"/"} className="link">Home</Link>
        </span>
    
        <h3 className='fs'>{title} <Link className='link' to={"/"}><span>Memories</span></Link></h3>
        <motion.p layout className='common__description'>{description}</motion.p>
    
    </div>
  )
}

export default Header