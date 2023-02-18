import React from 'react';
import './custom.css'; // external
import './style/style.css'; // main

/* pages */
import { Route, Routes } from 'react-router-dom';
import Activity from './pages/Activity';
import Home from './pages/Home';
import Likes from './pages/Likes';
import Login from './pages/Login';
import Memory from './pages/Memory';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';

// toast css
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile'>
          <Route path='auth/:id' element={<Profile/>} />
          <Route path='auth/:id/activity' element={<Activity />} />
          <Route path='auth/:id/likes' element={<Likes/>} />
          <Route path='*' element={<PageNotFound status={"404"} message={"Page Not Found"} />} />
        </Route>

        <Route path="/memory/:id" element={<Memory/>} />

        <Route path='*' element={<PageNotFound status={"404"} message={"Page Not Found"} />} />
      </Routes>

      <ToastContainer/>
    </div>
  )
}

export default App;