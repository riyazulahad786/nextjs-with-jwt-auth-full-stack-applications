"use client"
import React,{useEffect, useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {toast} from 'react-hot-toast'
function Register() {
    const router = useRouter()
    const [user, setuser] = React.useState({
      email:"",
      password:"",
      username:""
    });
     const [buttonDisabled, setbuttonDisabled] = useState(false);
     const [loading, setLoading] = useState(false);
     useEffect(()=>{
       if(user.email.length>0 && user.password.length>0 && user.username.length>0){
        setbuttonDisabled(false)
       }else{
        setbuttonDisabled(true);
       }
     },[user]);

    const onRegister = async ()=>{
      // e.preventDefault()
       try {
        const response = await axios.post('/api/Users/Register',user);
        console.log(response.data,"registered")
        router.push('/Login');
       } catch (error:any) {
         console.log(error.message);
         toast.error(error.message)
       }finally{
        setLoading(false)
       }
    }
  return (
    <div>
        <div className='d-flex justify-content-center'>
            <h1>{loading ? "processing":"signup"}</h1>
        </div>
        <div className='d-flex justify-content-center'>
            <input
             type='text'
              value={user.username} 
              placeholder='username'
              id='username'
              onChange={(e)=>setuser({...user,username:e.target.value})}

               />
        </div>
        <div className='d-flex justify-content-center'>
            <input
             type='text'
              value={user.email} 
              placeholder='email'
              id='email'
              onChange={(e)=>setuser({...user,email:e.target.value})}

               />
        </div>
        <div className='d-flex justify-content-center'>
            <input
             type='password'
              value={user.password} 
              placeholder='password'
              id='password'
              onChange={(e)=>setuser({...user,password:e.target.value})}

               />
        </div>
       <div className='d-flex justify-content-center' >
       <button onClick={onRegister} className='btn btn-primary'>{buttonDisabled ?"no signup":"Register"}</button>
       
       </div>
       <div className='d-flex justify-content-center'>
       <Link href='/Login'>Login here</Link>
       </div>
    </div>
  )
}

export default Register