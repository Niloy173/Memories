import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { IoNotifications } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import Notice from '../components/Notice'
import { AuthContext } from '../context/Context'
import useFetch from '../hooks/useFetch'
import Skeleton from '../skeleton/Skeleton'
import JwtDecoder from '../util/DecodeToken'
import ToastMsg from '../util/ToastMsg'

const Notification = () => {

  const {user} = useContext(AuthContext);
  const decoded = JwtDecoder(user);
  const [CurrentNotificationPage, setCurrentNotificationPage] = useState(1);

  

  const pageRef = useRef();
  const PageArr = useMemo(() => {
    return []
  },[]);
 
  const userid = useLocation().pathname.split('/').reverse()[1];
  const [data, isloading, reFetch] = useFetch(`/api/user/${userid}/notifications`, user);
  const [notifications, setNotifications] = useState([]);
  const [numberofnotice,setNumberofNotice] = useState(null);

  // console.log(notifications);

  const LastNotificationIndex = CurrentNotificationPage * 4;
  let FirstNotificationIndex = LastNotificationIndex - 4;


  useEffect(() => {

    if(data.notifications){

      for (let index = 1; index <= Math.ceil(data.notifications.length / 4); index++) {
        PageArr.push(index);
      }

      setNotifications(data.notifications);
      setNumberofNotice(data.unread)

    }

  },[data,PageArr])

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


  const ClearNotifications = async (e) => {

    try {

      const response = await fetch(`/api/notifications/${decoded.id}`,{

        method: 'PUT',
        headers: {
          'authorization': user,
          'content-type': 'application/json'
        }
      });

      if(response.status === 200){
        setNumberofNotice(0);
        reFetch({ headers: { 'authorization': user} });   
      }
      
    } catch (error) {
      
      ToastMsg(error.message, false);
    }
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
        {
          numberofnotice > 0 ? 
          (<div className='notification__count'>
          <p className='number'>{numberofnotice}</p>
          <span><IoNotifications/></span>
        </div>): <span><IoNotifications/></span>
        }

        {
          numberofnotice > 0 && 
          (<div className='notifications__header__btn'>
            <button type='button' onClick={ClearNotifications}>Mark as done</button>
          </div>)
        }
        
        </div>

        <div className="single_line"><span></span></div>


       {
        isloading ? <Skeleton type={"custom"} /> : 
          notifications.length > 0 ?
          (<div className="notifications__message">

          {
            notifications.slice(FirstNotificationIndex,LastNotificationIndex).map((notice,i) => (
                <Notice key={notice._id} notification={notice} />
            ))
          }


        </div>) : <p className='notifications__container__message'>Sorry, there are no notifications for you at the moment.</p>

       }
      
      
      </div>


      {
        notifications.length > 0 &&
        
        
        <div className='notification__pages'>
          
          
          <div className='notification__pages__serial'>

           

              <React.Fragment>

                <span onClick={CurrentNotificationPage >=2 ? handlePrevious : null}
                className={CurrentNotificationPage >= 2 ? "notification__pages__serial__icon": "notification__pages__serial__icon disabled_click"}
                ><IoIosArrowBack /></span>

                <div className="notification__pages__serial__number" ref={pageRef}>
                  {
                    PageArr.map((number,i) => {
                      return <span key={i} 
                      onClick={() => setCurrentNotificationPage(number)}>
                      {number}</span>
                    })
                  }
                </div>
    
                <span onClick={CurrentNotificationPage !== PageArr[PageArr.length-1] ? handleNext : null}
                className={CurrentNotificationPage !== PageArr[PageArr.length-1]  ? "notification__pages__serial__icon": "notification__pages__serial__icon disabled_click"}
                ><IoIosArrowForward /></span>
                
                
              </React.Fragment>
            

          
          </div>
          
      </div>

      }

    </div>
  )
}

export default Notification