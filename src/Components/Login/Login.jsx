import React from 'react'
import styles from './Login.module.css'
import * as Yup from 'yup'
import axios from 'axios'
import { Formik, useFormik} from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Login(saveUser) {
  let navigate = useNavigate()

  
  const [isLoading,setIsLoading]=useState(false)
  const [errorMessage,seterrorMessage]=useState(null)

     async function login(values){
      setIsLoading(true)
      seterrorMessage(null)
      let {data}= await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',values).catch(
        (err)=>{
          setIsLoading(false)
          seterrorMessage(err.response.data.errors.msg)
        } 
       
      
        )
      console.log(data)
      if(data.message=="success"){
        setIsLoading(false)
        localStorage.setItem("userToken",data.token)
        saveUser();
        navigate("/")

      }
    }

  let mySchema = Yup.object({
   
    email:Yup.string().email("invalid email ").required(" Required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalid password").required("Required"),
   
  
  
  })
  let formik = useFormik({

      initialValues:{
       
        email:"",
        password:""
        
      }, validationSchema:mySchema,
      onSubmit:(values)=>login( values)
  })
  return (
  <>
    <div className="container my-5">
      <h3>Login :</h3>

      {errorMessage? <div className='alert alert-danger'>{errorMessage}</div> :"" }
      <form onSubmit={formik.handleSubmit}>
       
       <label htmlFor="email">E-mail</label>
        <input type="email" className='form-control mb-2 ' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email  ? <div className='alert alert-danger'> {formik.errors.email} </div> : `` }
        <label htmlFor="password">Password</label>
        <input type="password" className='form-control mb-2 ' id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'> {formik.errors.password} </div> : `` }
        
        
       
      
      
       
     
        {isLoading ?   <button className='btn bg-main text-white'><i className='fa fa-spin fa-spinner f'></i></button> :   <button className='btn bg-main text-white'>Login</button> }
    
    




      </form>

    </div>
  
  
  
  </>
  )
}
