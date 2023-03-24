import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import Pages from '../components/Pages';
import { AuthContext } from '../context/Context';
import useFetch from '../hooks/useFetch';
import Skeleton from '../skeleton/Skeleton';

/* Quote */
import Quote from '../util/Quotes';

const Activity = () => {

  const {user} = useContext(AuthContext);
  // const {memory} = useContext(ActivityContext);
  const [currentPage, setCurrentPage] = useState(1);
  const userid = useLocation().pathname.split('/').reverse()[1];

  const [data, isloading, reFetch] = useFetch(`/api/user/${userid}/activity`, user);

  const LastCardIndex = currentPage * 3; // Cards per page is 3
  const FirstCardIndex = LastCardIndex - 3;



  const paginate = (number) => setCurrentPage(number);

  return (
   
    <div className='activity'>
    
      <Header title={"Your"} 
      description={Quote[Math.floor(Math.random()*Quote.length)]} />

      <div className="activity__card__container">

      {
        isloading ? <Skeleton type={"custom"} /> : 
        
        

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1}} exit={{ opacity: 0 }}
        className="all__cards">
        
        {data.length > 0 ? 
            
          data.slice(FirstCardIndex, LastCardIndex).map((d,i) => <AnimatePresence key={i}><Card  card={d} update={true} reFetch={reFetch}   /></AnimatePresence>):
            
          <span className='no_data'>No Memory Found</span> }
      
        </motion.div>

       
      }

      
        {
          data.length > 0 &&
          <Pages
          paginate={paginate}
          PostPerPage={3}
          totalPosts={data.length}
          activePage={currentPage}
        />
        }
        
        
 
      </div> 

      

      
  </div>
       
       
  
  )
}

export default Activity;