import React, { useContext, useRef, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { IoNotifications } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import Notice from '../components/Notice'
import { AuthContext } from '../context/Context'
import useFetch from '../hooks/useFetch'
import Skeleton from '../skeleton/Skeleton'

const Notification = () => {

  const {user} = useContext(AuthContext);
  const [CurrentNotificationPage, setCurrentNotificationPage] = useState(1);

  const pageRef = useRef();
  const PageArr = [];
 
  const userid = useLocation().pathname.split('/').reverse()[1];
  const [data, isloading] = useFetch(`/api/user/${userid}/notifications`, user);

  const LastNotificationIndex = CurrentNotificationPage * 4;
  let FirstNotificationIndex = LastNotificationIndex - 4;

  if(data.length > 0){
    for (let index = 1; index <= Math.ceil(data.length / 4); index++) {
      PageArr.push(index);
    }
  }

  // console.log(CurrentNotificationPage);
  // console.log(PageArr[PageArr.length-1]);

  const handlePrevious = (e) => {
    pageRef.current.scrollLeft -= 10; 
    setCurrentNotificationPage(prev => prev - 1);
  }

  const handleNext = (e) => {
    pageRef.current.scrollLeft += 10; 
    setCurrentNotificationPage(prev => prev + 1);
  }

  return (
  
    <div className="notifications container">
    
      <div className="common__header">
      
        <span className='common__header__home'>
          <Link to={"/"} className="link">Home</Link>
        </span>

      </div>


      <div className='notifications__container'>
      

        <div className="notifications__header">
        
          <h3>Notifications</h3>
          <span><IoNotifications/></span>
        
        </div>

        <div className="single_line"><span></span></div>


       {
        isloading ? <Skeleton type={"custom"} /> : 
          data.length > 0 ?
          (<div className="notifications__message">

          {
            data.slice(FirstNotificationIndex,LastNotificationIndex).map((notice,i) => (
                <Notice key={i} notification={notice} />
            ))
          }


        </div>) : <p className='notifications__container__message'>Sorry, there are no notifications for you at the moment.</p>

       }
      
      
      </div>


      {
        data.length > 0 &&
        
        
        <div className='notification__pages'>
          
          
          <div className='notification__pages__serial'>

           

              <React.Fragment>

                <span onClick={handlePrevious}
                className={CurrentNotificationPage >= 2 ? "notification__pages__serial__icon": "notification__pages__serial__icon disabled_click"}
                ><IoIosArrowBack /></span>

                <div className="notification__pages__serial__number" ref={pageRef}>
                  {
                    PageArr.map((number) => {
                      return <span key={number} 
                      onClick={() => setCurrentNotificationPage(number)}>
                      {number}</span>
                    })
                  }
                </div>
    
                <span  
                className={CurrentNotificationPage !== PageArr[PageArr.length-1]  ? "notification__pages__serial__icon": "notification__pages__serial__icon disabled_click"}
                onClick={handleNext}><IoIosArrowForward   /></span>
                
                
              </React.Fragment>
            

          
          </div>
          
      </div>

      }

    </div>
  )
}

export default Notification