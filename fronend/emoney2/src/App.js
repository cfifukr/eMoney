import './App.css';
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './components/Main/Main';
import Home from './components/Home/Home';
import {isJwtToken, getUserFromToken, getConfig, deleteJwtToken} from "./utils/jwtToken"
import LoginForm from './components/Forms/LoginForm';
import SignUpForm from './components/Forms/SignUpForm';
import NavbarComp from './components/NavbarComp';
import Logout from './Logout';



function App() {
  const [user, setUser] = useState({});



  useEffect(() => {
    if(isJwtToken() && !user.username){
      getUserFromToken(getConfig())
        .then((data) => setUser(data));
    
    }
  },[user]);


  const router = createBrowserRouter([
    {
      path:"/",
      element:<Main/>
    },
    {
      path:"/home",
      element:<Home user={user} setUser={setUser}/>
    },
    {
      path:"/login",
      element:<LoginForm setUser={setUser}/>
    },
    {
      path:"/signup",
      element:<SignUpForm setUser={setUser}/>
    },
    {
      path:"/logout",
      element:<Logout/>
    },

  ]);



  return (
    <>
      <NavbarComp user={user} setUser={setUser}/>
      <RouterProvider router={router}/>
  


      
    </>
  );
}

export default App;
