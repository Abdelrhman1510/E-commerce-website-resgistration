import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Products from './Components/Products/Products'
import NotFound from './Components/NotFound/NotFound'



const routes = createBrowserRouter ([

  {path:"",element:<Layout/>,children:[
    {index:true,element:<Home/>},
    {path:"cart",element:<Cart/>},
    {path:"login",element:<Login/>},
    {path:"register",element:<Register/>},
    {path:"products",element:<Products/>},
    {path:"*",element:<NotFound/>},


  ]}

])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <RouterProvider router={routes}></RouterProvider>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
