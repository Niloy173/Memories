import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import Pages from '../components/Pages';
import { AuthContext } from '../context/Context';
import useFetch from '../hooks/useFetch';
import Skeleton from '../skeleton/Skeleton';

const Activity = () => {

  const {user} = useContext(AuthContext);
  // const {memory} = useContext(ActivityContext);
  const [currentPage, setCurrentPage] = useState(1);
  const userid = useLocation().pathname.split('/').reverse()[1];

  const [data, isloading] = useFetch(`/api/user/memory/${userid}/activity`, user);

  const LastCardIndex = currentPage * 3; // Cards per page is 3
  const FirstCardIndex = LastCardIndex - 3;



  const paginate = (number) => setCurrentPage(number);

  return (
   
    <div className='activity'>
    
      <Header title={"Your"} 
      description={`Lorem ipsum dolor sit amet consectetur adipisicing elit.
       Minima excepturi perspiciatis aperiam inventore! lo excepturi perspiciatis aperiam inventore! lo`} />

      <div className="activity__card__container">

      {
        isloading ? <Skeleton type={"custom"} /> : 
        
        <div className="all__cards">
        
        {data.length > 0 ? 
            
          data.slice(FirstCardIndex, LastCardIndex).map((d,i) => <Card key={i} card={d} update={true}   />):
            
          <span className='no_data'>No Activity Found</span> }
      
        </div>
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