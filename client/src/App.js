import React, { useContext, useEffect } from 'react';
import './custom.css'; // external
import './style/style.css'; // main

/* pages */
import { Route, Routes } from 'react-router-dom';
import Activity from './pages/Activity';
import Home from './pages/Home';
import Likes from './pages/Likes';
import Login from './pages/Login';
import Memory from './pages/Memory';
import Notification from './pages/Notification';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';

// toast css
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from './context/Context';

/* socket */
import { io } from "socket.io-client";
import SEO from './util/SeoSetup';


const App = () => {

  const {user} = useContext(AuthContext);
  const [socket,setSocket] = useState(null);
  // const decoded = JwtDecoder(user);

  useEffect(() => {

    const newSocket = io(process.env.REACT_APP_SOCKET_SERVER_URL); // 'http://localhost:5000'
   //  console.log(newSocket);
    setSocket(newSocket)
 
   },[])
 
   useEffect(() => {

    if(socket && user) { socket.emit('addNewUser',user); }
 
   },[socket,user])


  return (
    
    <div className='App'>
      <SEO image={"https://res.cloudinary.com/di8xxkudu/image/upload/v1679747300/upload/favicon_gvihzp.jpg"}
      title={"Memories"} description={"Describes each individual memory or story"} link="/" />
      <Routes>
        <Route path='/' element={<Home socket={socket} />} />
        <Route path='/login' element={user ? <Home/>: <Login/>} />
        <Route path='/register' element={user ? <Home/>: <Register />} />
        <Route path='/profile'>
          <Route path='auth/:id/me' element={ user ? <Profile/> : <Login/>} />
          <Route path='auth/:id/activity' element={user ? <Activity />: <Login/>} />
          <Route path='auth/:id/likes' element={user ? <Likes/>: <Login/>} />
          <Route path='auth/:id/notifications' element={user ? <Notification /> : <Login /> } />
          <Route path='*' element={<PageNotFound status={"404"} message={"Page Not Found"} />} />
        </Route>

        <Route path="/memory/:id" element={<Memory socket={socket} />} />

        <Route path='*' element={<PageNotFound status={"404"} message={"Page Not Found"} />} />
      </Routes>
      
      <ToastContainer/>

    </div>
      
   
    
  )
}

export default App;