import logo from './logo.svg';
import './App.css';
import {createBrowserRouter , RouterProvider} from 'react-router-dom'

import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Products from './Components/Products/Products'
import NotFound from './Components/NotFound/NotFound'
import jwtDecode from 'jwt-decode'
import { useState } from 'react';





function App() {
  const routes = createBrowserRouter ([

    {path:"",element:<Layout/>,children:[
      {index:true,element:<Home/>},
      {path:"cart",element:<Cart/>},
      {path:"login",element:< Login saveUser={saveUser}/>},
      {path:"register",element:<Register/>},
      {path:"products",element:<Products/>},
      {path:"*",element:<NotFound/>},
  
  
    ],},
  
  ]);
  const [userData,setUserData]=useState(null)
  function saveUser(){

    let endcodedToken=localStorage.getItem("userToken")
    let  decoded = jwtDecode(endcodedToken);
    console.log(decoded)
    setUserData(decoded)
  }

 return <RouterProvider router={routes}></RouterProvider>
}

export default App;
