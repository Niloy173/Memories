import React, { useContext, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowUpRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import MemoryCreationForm from '../components/MemoryCreationForm';
import Menu from '../components/Menu';
import { AuthContext } from '../context/Context';
import useFetch from '../hooks/useFetch';
import Skeleton from '../skeleton/Skeleton';

const Home = () => {

  // const images = [
  //   'https://images.unsplash.com/photo-1647891938250-954addeb9c51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8OHx8YWR2ZW50dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //   'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  //   'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  //   'https://images.unsplash.com/photo-1611124600582-c9ef0e977585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  //   'https://images.unsplash.com/photo-1480812494744-bfed1358a9b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  //   'https://images.unsplash.com/photo-1465310477141-6fb93167a273?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGFkdmVudHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
  // ]
  const [openForm, setOpenForm] = useState(false);
  const [data, isloading, reFetch] = useFetch("/api/memory");

  const  {user} = useContext(AuthContext);


  


  return (
    
    <React.Fragment>

    <div className="memories container">
    
      <div className="memories__header">
        <h2>Memories</h2>
      </div>

      {
        user ?
        (<div className="profile">
          <Menu/>
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
        
          <div className="cards__memory">

            {
              isloading ? [...Array(8)].map((_,i) => <Skeleton key={i} type="card" />) :
              data.length > 0 ? 
              data.map((card,i) => (
                <Card key={i} card={card} />
              )): 'No data available'
            }

          </div>  
        
          </div>

        {/* Memory Creation Form */ }
        
        {
          openForm ?
          (<div className="modal" >
            <AiOutlineClose className='close_form' onClick={() => setOpenForm(false)} />
            <div className="form__enabled">
                <MemoryCreationForm reFetch={reFetch}  />
            </div>
          </div>)  :
          (<div className="form__">
                <MemoryCreationForm reFetch={reFetch} />
            </div>)

        }
        
           
         {/* Memory Creation Form */ }


      </div>


      {/* open modal button for tab or small screen  */}
      <div onClick={() => setOpenForm(true)} className="memory__creation__btn">
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