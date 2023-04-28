import React, { useState } from 'react'
import * as Yup from 'yup'
import styles from './Register.module.css'
import axios from 'axios'
import { Formik, useFormik} from 'formik';
import { useNavigate } from 'react-router-dom';





export default function Register() {

  let navigate = useNavigate()

  
  const [isLoading,setIsLoading]=useState(false)
  const [errorMessage,seterrorMessage]=useState(null)

     async function register(values){
      setIsLoading(true)
      seterrorMessage(null)
      let {data}= await axios.post('https://route-ecommerce-app.vercel.app/v1/auth/signup',values).catch(
        (err)=>{
          setIsLoading(false)
          seterrorMessage(err.response.data.errors.msg)
        } 
       
      
        )
      console.log(data)
      if(data.message=="success"){
        setIsLoading(false)
        
        navigate("/login")

      }
    }

  let mySchema = Yup.object({
    name:Yup.string().required("name is required").min(3,"min char is 3 ").max(15,"max char is 15 "),
    email:Yup.string().email("invalid email ").required(" Required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalid password").required("Required"),
    rePassword:Yup.string().required("Required").oneOf([Yup.ref('password')],"Not matched passwords"),
    phone:Yup.string().required("phone is required ").matches(/^01[0125][0-9]{8}$/,"invalid phone")
  
  
  })
  let formik = useFormik({

      initialValues:{
        name:"",
        email:"",
        password:"",
        rePassword:"",
        phone:""
      }, validationSchema:mySchema,
      onSubmit:(values)=>register( values)
  })
  
  return (
   <>

    
    <div className="container my-5">
      <h3>Register Now :</h3>

      {errorMessage? <div className='alert alert-danger'>{errorMessage}</div> :"" }
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" className='form-control mb-2 ' id='name' name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
          {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'> {formik.errors.name} </div> : `` }
       
       <label htmlFor="email">E-mail</label>
        <input type="email" className='form-control mb-2 ' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.email && formik.touched.email  ? <div className='alert alert-danger'> {formik.errors.email} </div> : `` }
        <label htmlFor="password">Password</label>
        <input type="password" className='form-control mb-2 ' id='password' name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'> {formik.errors.password} </div> : `` }
        <label htmlFor="rePassword">rePassword</label>
        <input type="password" className='form-control mb-2 ' id='rePassword' name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'> {formik.errors.rePassword} </div> : `` }
        
        <label htmlFor="phone">phone</label>
        <input type="tel" className='form-control mb-2 ' id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      
      
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'> {formik.errors.phone} </div> : `` }
     
        {isLoading ?   <button className='btn bg-main text-white'><i className='fa fa-spin fa-spinner f'></i></button> :   <button className='btn bg-main text-white'>Register</button> }
    
    




      </form>

    </div>
   </>
  )
}
