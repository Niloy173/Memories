import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowUpRight } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import Card from '../components/Card';
import MemoryCreationForm from '../components/MemoryCreationForm';
import Menu from '../components/Menu';
import { AuthContext } from '../context/Context';
import useFetch from '../hooks/useFetch';
import Skeleton from '../skeleton/Skeleton';

const Home = ({socket}) => {

  const [openForm, setOpenForm] = useState(false);
  const [openImageModal, setImageModal] = useState(false); // controlling form with custom class style
  const {search} = useLocation();
  const [data, isloading, reFetch] = useFetch("/api/memory"+search);

  const  {user} = useContext(AuthContext);


  useEffect(() => {

    const handleResize = () => setOpenForm(false);
    window.addEventListener("resize", handleResize);

    return () => {
       window.removeEventListener("resize", handleResize);
    }

  },[])
  
  return (
    
    <React.Fragment>

    <div className="memories container">
    
      <div className="memories__header">
        <Link className='link' to={"/"}><h2>Memories</h2></Link>
      </div>

      {
        user ?
        (<div className="profile">
          <Menu socket={socket}/>
        </div>):
        (<div className="login__register">
          <div>
            <Link to={"/login"} className='link'><p className='log'>Login</p></Link>
            <Link to={"/register"} className='link'><p className='login__register__reg'>Register</p></Link>
          </div>
        </div>)
      }

    </div>

      <div className="memories__body container">

        <div className="cards__">

        
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} 
          className="cards__memory">

            {
              isloading ? [...Array(8)].map((_,i) => <Skeleton key={i} type="card" />) :
              data.length > 0 ? 
              data.map((card,i) => (
               <AnimatePresence key={i}><Card  card={card} setImageModal={setImageModal} /></AnimatePresence> 
              )): 'No data available'
            }

          </motion.div> 
          
          
        
          </div>

        {/* Memory Creation Form */ }
        {/* Form access should be disabled while modal is open */ }
        
        {
          openForm ?
          (<div className="modal" >
            <AiOutlineClose className='close_form' onClick={() => setOpenForm(false)} />
            <div className={openForm === true ? "form__enabled fade-in": "form__enabled"}>
                <MemoryCreationForm reFetch={reFetch} openForm={openForm} setOpenForm={setOpenForm}  />
            </div>
          </div>)  :
          
          (<div className={openImageModal ? "form__ hidden__z-index": "form__"}>
                <MemoryCreationForm reFetch={reFetch} />
            </div>)

        }
        
           
         {/* Memory Creation Form */ }


      </div>


      {/* open modal button for tab or small screen  */}
      {/* click should be forbidden while modal is open that's why we added hidden__z-index */}
      <div onClick={() => setOpenForm(true)} className={openImageModal? "memory__creation__btn hidden__z-index":"memory__creation__btn"}>
        <BsArrowUpRight className='icon__memory'/>
        <p>
          {
            'Create your golden memory'.split('').map((c,index)=> (
              <span key={index} style={{transform: `rotate(${index*14}deg)`}} >{c}</span>
            ))
          }
        </p>
      </div>
      {/* open modal button for tab or small screen  */}

      {/*
       
        openForm &&
        <div className="small__screen">
          <AiOutlineClose className='close_form' onClick={() => setOpenForm(false)} />
          <div className="form__modal">
          {<MemoryCreationForm reFetch={reFetch}/>}
          </div>
        </div>
       
        */}

    </React.Fragment>


    
   
  )
}

export default Home;